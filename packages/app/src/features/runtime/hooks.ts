import { useContext } from 'react';
import { RuntimeContext } from './context';

const useRuntime = () => {
  const { runtime } = useContext(RuntimeContext);
  return runtime;
};

const useRun = () => {
  const { run } = useContext(RuntimeContext);
  return run;
};

export { useRuntime, useRun };
