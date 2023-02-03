import { WorkletBundle } from '@morten-olsen/worklet-sdk';

interface WorkletRegistry {
  get: (name: string) => Promise<WorkletBundle>;
}

export type { WorkletRegistry };
