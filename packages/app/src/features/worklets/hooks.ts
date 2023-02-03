import { useContext } from 'react';
import { WorkletsContext } from './context';

const useWorklets = () => {
  const { worklets } = useContext(WorkletsContext);
  return worklets;
};

const useAddWorklet = () => {
  const { addWorklet } = useContext(WorkletsContext);
  return addWorklet;
};

const useRemoveWorklet = () => {
  const { removeWorklet } = useContext(WorkletsContext);
  return removeWorklet;
};

export { useWorklets, useAddWorklet, useRemoveWorklet };
