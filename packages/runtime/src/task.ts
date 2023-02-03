import EventEmitter from 'eventemitter3';
import RenderApi, { RenderType } from './render';

type TaskEvents = {
  succeeded: (task: Task) => void;
  failed: (task: Task, error: unknown) => void;
  finalized: (task: Task) => void;
  render: (task: Task, type: RenderType) => void;
};

type TaskOptions<T> = {
  abortController: AbortController;
  promise: Promise<T>;
  render: RenderApi;
};

type TaskStatus = 'pending' | 'succeeded' | 'failed';

let taskId = 0;

class Task<T = any> extends EventEmitter<TaskEvents> {
  #id: string;
  #promise: Promise<T>;
  #render: RenderApi;
  #abortController: AbortController;
  #status: TaskStatus = 'pending';
  #result: T | undefined = undefined;
  #error: unknown | undefined = undefined;

  constructor({ abortController, promise, render }: TaskOptions<T>) {
    super();
    this.#id = `task-${taskId++}`;
    this.#abortController = abortController;
    this.#promise = promise;
    this.#render = render;
    this.#render.on('render', (type) => {
      this.emit('render', this, type);
    });
    this.#promise
      .then((result) => {
        this.#result = result;
        this.#status = 'succeeded';
        this.emit('succeeded', this);
      })
      .catch((error) => {
        this.#status = 'failed';
        this.#error = error;
        this.emit('failed', this, error);
      })
      .finally(() => {
        this.emit('finalized', this);
      });
  }

  public get id() {
    return this.#id;
  }

  public get renders() {
    return this.#render.renders;
  }

  public get result() {
    return this.#result;
  }

  public get error() {
    return this.#error;
  }

  public get promise() {
    return this.#promise;
  }

  public get abortController() {
    return this.#abortController;
  }

  public get status() {
    return this.#status;
  }
}

export { Task };
