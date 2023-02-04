import type OrgReact from 'react';
import type * as OrgRNUILib from 'react-native-ui-lib';
import type * as OrgReactNative from 'react-native';

interface WorkletDeviceApi {
  openUrl?: (url: string) => Promise<void>;
}

interface WorkletRenderApi {
  html: (content: string) => Promise<void>;
  url: (url: string) => Promise<void>;
  element: (element: React.ReactNode) => Promise<void>;
}

interface WorkletDefinition<TOutput = any> {
  name: string;
  run: (input?: any) => Promise<TOutput>;
}

interface WorkletSecretsApi {
  get: (key: string) => Promise<string>;
  set: (key: string, value: string) => Promise<void>;
}

interface WorkletApi {
  device: WorkletDeviceApi;
  secrets: WorkletSecretsApi;
  render: WorkletRenderApi;
  abortSignal?: AbortSignal;
  get: <TOutput>(name: string) => Promise<WorkletDefinition<TOutput>>;
  wait: typeof wait;
}

interface WorkletBundle {
  name: string;
  title?: string;
  description?: string;
  version?: string;
  author?: string;
  code: string;
  preview?: string;
}

const wait = () => {
  let resolve: () => void = () => { };
  const promise = new Promise<void>((r) => {
    resolve = r;
  });
  return { promise, resolve };
};

declare global {
  var worklet: WorkletApi;
  var React: typeof OrgReact;
  var ReactNative: typeof OrgReactNative;
  var RNUILib: typeof OrgRNUILib;
}

export type {
  WorkletBundle,
  WorkletApi,
  WorkletDeviceApi,
  WorkletRenderApi,
  WorkletSecretsApi,
  WorkletDefinition,
};
export { wait };
