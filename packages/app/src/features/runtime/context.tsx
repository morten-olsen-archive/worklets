import { Task } from '@morten-olsen/worklet-runtime';
import { WorkletBundle } from '@morten-olsen/worklet-sdk';
import { createContext, FC, ReactNode, useCallback, useMemo } from 'react';
import { RuntimeHandler } from './handler';

type RuntimeContextValue = {
  runtime: RuntimeHandler;
  run: (bundle: WorkletBundle) => Task;
};

type RuntimeProviderProps = {
  children: ReactNode;
};

const RuntimeContext = createContext<RuntimeContextValue>(null as any);

const RuntimeProvider: FC<RuntimeProviderProps> = ({ children }) => {
  const runtime = useMemo(() => new RuntimeHandler(), []);
  const run = useCallback((bundle: WorkletBundle) => runtime.run(bundle), [runtime]);

  return <RuntimeContext.Provider value={{ runtime, run }}>{children}</RuntimeContext.Provider>;
};

export type { RuntimeContextValue };
export { RuntimeContext, RuntimeProvider };
