import { WorkletBundle } from '@morten-olsen/worklet-sdk';
import { createContext, ReactNode, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type WorkletsContextValue = {
  worklets: WorkletBundle[];
  addWorklet: (worklet: WorkletBundle) => Promise<void>;
  removeWorklet: (worklet: WorkletBundle) => Promise<void>;
};

type WorkletProviderProps = {
  children: ReactNode;
};

const WorkletsContext = createContext<WorkletsContextValue>(null as any);

const WorkletsProvider = ({ children }: WorkletProviderProps) => {
  const [worklets, setWorklets] = useState<WorkletBundle[]>([]);

  useEffect(() => {
    const run = async () => {
      const loaded = await AsyncStorage.getItem('worklets');
      if (loaded) {
        setWorklets(JSON.parse(loaded));
      }
    };
    run();
  }, []);

  const addWorklet = async (worklet: WorkletBundle) => {
    const next = [...worklets.filter((w) => w.name !== worklet.name), worklet];
    setWorklets(next);
    await AsyncStorage.setItem('worklets', JSON.stringify(next));
  };

  const removeWorklet = (worklet: WorkletBundle) => {
    const next = worklets.filter((w) => w.name !== worklet.name);
    setWorklets(next);
    return AsyncStorage.setItem('worklets', JSON.stringify(next));
  };

  return (
    <WorkletsContext.Provider value={{ worklets, addWorklet, removeWorklet }}>
      {children}
    </WorkletsContext.Provider>
  );
};

export { WorkletsProvider, WorkletsContext };
