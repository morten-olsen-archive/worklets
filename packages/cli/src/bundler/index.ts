import { rollup, RollupOptions } from 'rollup';
import { WorkletBundle } from '@morten-olsen/worklet-sdk';
import { defaultConfig } from './config';
import { dirname, resolve } from 'path';

type BundleConfig = {
  name: string;
  entry: string;
  version?: string;
  description?: string;
  config?: RollupOptions;
  env?: string[];
};

class Bundler {
  #options: BundleConfig;
  #location: string;

  constructor(location: string) {
    this.#location = location;
    this.#options = require(location);
  }

  public bundle = async () => {
    const {
      name,
      description,
      version,
      entry,
      config = defaultConfig(this.#options),
    } = this.#options;
    const entryFile = resolve(dirname(this.#location), entry);
    const bundler = await rollup({
      ...config,
      input: entryFile,
    });
    const { output } = await bundler.generate({
      format: 'es',
      globals: {
        global: 'window',
      },
    });
    if (output.length > 1) {
      throw new Error('Multiple outputs are not supported');
    }
    const [result] = output;

    const { code } = result;
    const bundle: WorkletBundle = {
      name,
      description,
      version,
      code,
    };
    return bundle;
  };
}

export type { BundleConfig };
export { Bundler };
