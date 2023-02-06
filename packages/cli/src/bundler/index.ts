import { rollup, RollupOptions } from 'rollup';
import { WorkletBundle } from '@morten-olsen/worklet-sdk';
import { defaultConfig } from './code-config';
import { createReadConfig } from './read-config';
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
    const codeBundler = await rollup({
      ...config,
      cache: false,
      input: entryFile,
      onwarn: () => {},
    });
    const readBundler = await rollup({
      ...createReadConfig(this.#options),
      input: entryFile,
      onwarn: () => {},
    });
    const { output: codeOutput } = await codeBundler.generate({
      format: 'es',
    });
    const { output: readOutput } = await readBundler.generate({
      format: 'es',
    });
    const [codeResult] = codeOutput;
    const [readResult] = readOutput;

    const { code } = codeResult;
    const { code: preview } = readResult;
    const bundle: WorkletBundle = {
      name,
      description,
      version,
      code,
      preview,
    };
    return bundle;
  };
}

export type { BundleConfig };
export { Bundler };
