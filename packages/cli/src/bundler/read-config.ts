import { RollupOptions } from 'rollup';
import json from '@rollup/plugin-json';
import sucrase from '@rollup/plugin-sucrase';
import replace from '@rollup/plugin-replace';
import { BundleConfig } from '.';

const createReadConfig = (_def: BundleConfig): RollupOptions => {
  return {
    plugins: [
      json(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      sucrase({
        transforms: ['typescript', 'jsx'],
      }),
    ],
  };
};

export { createReadConfig };
