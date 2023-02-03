import { Runtime, Task } from '@morten-olsen/worklet-runtime';
import { WorkletBundle } from '@morten-olsen/worklet-sdk';
import EventEmitter from 'eventemitter3';
import * as ReactNative from 'react-native';
import * as RNUILib from 'react-native-ui-lib';
import React from 'react';
import { Linking } from 'react-native';

type RuntimeEvents = {
  taskAdded: (task: TrackedTask) => void;
  taskFinalized: (task: TrackedTask) => void;
};

type TrackedTask = {
  task: Task;
  bundle: WorkletBundle;
};

class RuntimeHandler extends EventEmitter<RuntimeEvents> {
  #runtime: Runtime;
  #tasks: TrackedTask[] = [];

  constructor() {
    super();
    this.#runtime = new Runtime({
      secrets: undefined as any,
    });
  }

  public clean = () => {
    this.#tasks = this.#tasks.filter(({ task }) => task.status !== 'pending');
  };

  public run = (bundle: WorkletBundle) => {
    this.#runtime.register(bundle);
    const task = this.#runtime.run(
      bundle.name,
      {
        openUrl: (url) => Linking.openURL(url),
      },
      {
        ReactNative,
        React,
        RNUILib,
      },
    );
    const trackedTask = { task, bundle };
    this.#tasks.push(trackedTask);
    this.emit('taskAdded', trackedTask);
    task.on('finalized', () => {
      this.emit('taskFinalized', trackedTask);
    });
    return task;
  };
}

export { RuntimeHandler };
