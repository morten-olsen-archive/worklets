import {
  WorkletApi,
  WorkletBundle,
  WorkletRenderApi,
  WorkletSecretsApi,
  wait,
  WorkletDeviceApi,
} from '@morten-olsen/worklet-sdk';
import { WorkletRegistry } from './registry';
import RenderApi from './render';
import { Task } from './task';

type RuntimeOptions = {
  secrets?: WorkletSecretsApi;
  registry?: WorkletRegistry;
};

type RunOptions = {
  abortSignal?: AbortSignal;
  render: WorkletRenderApi;
  device: WorkletDeviceApi;
  globals?: Record<string, any>;
};

const secretHandler = (): WorkletSecretsApi => {
  const secrets: Record<string, any> = {};
  return {
    get: async (name: string) => secrets[name],
    set: async (name: string, value: any) => {
      secrets[name] = value;
    },
  };
};

class Runtime {
  #internalRegistry: Record<string, WorkletBundle> = {};
  #registry?: WorkletRegistry;
  #secrets: WorkletSecretsApi;

  constructor(options: RuntimeOptions) {
    this.#secrets = options.secrets || secretHandler();
    this.#registry = options.registry;
  }

  #createApi = ({ abortSignal, render, device, globals = {} }: RunOptions) => {
    const api: WorkletApi = {
      ...globals,
      abortSignal,
      render,
      device,
      secrets: this.#secrets,
      wait,
      get: async <T>(name: string) => ({
        name,
        run: async (subname: string): Promise<T> => {
          const output = await this.#run(subname, {
            abortSignal,
            render,
            device,
          });
          return output as T;
        },
      }),
    };
    return api;
  };

  public register = (bundle: WorkletBundle) => {
    this.#internalRegistry[bundle.name] = bundle;
  };

  #run = async <TOutput>(name: string, options: RunOptions): Promise<TOutput> => {
    let bundle = this.#internalRegistry[name];
    if (!bundle && this.#registry) {
      bundle = await this.#registry.get(name);
    }
    if (!bundle) {
      throw new Error(`Could not find worklet with name ${name}`);
    }

    const { code } = bundle;

    const exports = {};
    const module = { exports };
    const api = this.#createApi(options);
    const args = {
      ...(options.globals || {}),
      worklet: api,
      module,
      exports,
    };
    // eslint-disable-next-line no-new-func
    const fnFactory = Function(
      ...Object.keys(args),
      `
        return async () => {
          ${code}
        };
      `,
    );
    const fn = fnFactory(...Object.values(args));
    const promise = Promise.resolve<TOutput>(fn(...Object.values(args)));
    return promise.then(async () => {
      const output = module.exports as TOutput;
      return await output;
    });
  };

  public run = <TOutput>(name: string, device: WorkletDeviceApi, globals?: Record<string, any>) => {
    const abortController = new AbortController();
    const render = new RenderApi();
    const promise = this.#run(name, {
      abortSignal: abortController.signal,
      device,
      render,
      globals,
    }) as Promise<TOutput>;
    const task = new Task<TOutput>({
      promise,
      abortController,
      render,
    });
    return task;
  };
}

export { Runtime };
