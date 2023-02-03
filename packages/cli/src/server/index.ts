import { WorkletBundle } from '@morten-olsen/worklet-sdk';
import express from 'express';

const createDownloadServer = (bundle: WorkletBundle) => {
  const app = express();
  app.get('/download', (req, res) => {
    res.send(bundle);
  });
  return app;
};

export { createDownloadServer };
