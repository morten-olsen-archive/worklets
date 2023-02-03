import 'dotenv/config';
import { program } from 'commander';
import ip from 'ip';
import qr from 'qrcode-terminal';
import { resolve } from 'path';
import { Bundler } from '../bundler';
import { createDownloadServer } from '../server';

const bundleCmd = program.command('bundle');
bundleCmd.argument('<entry>', 'Entry file');
bundleCmd.action(async (entry: string) => {
  const location = resolve(process.cwd(), entry);
  const bundler = new Bundler(location);
  const code = await bundler.bundle();
  console.log('foo', code);
});

const shipCmd = program.command('ship');
shipCmd.argument('<entry>', 'Entry file');
shipCmd.action(async (entry: string) => {
  const location = resolve(process.cwd(), entry);
  const bundler = new Bundler(location);
  const localIp = ip.address();
  const bundle = await bundler.bundle();
  const server = createDownloadServer(bundle);
  server.listen(3000);

  qr.generate(
    `http://${localIp}:3000/download`,
    {
      small: true,
    },
    (code) => {
      console.log(code);
    },
  );
});

program.parse(process.argv);
