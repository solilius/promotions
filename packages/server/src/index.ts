import express from 'express';

import { router as promotionsRouter } from './routes/promotions';
import envs from "./utils/envs";
import { startServer } from './utils/start-server';

const app = express();

app.use("/promotions", promotionsRouter);

app.listen(envs.port, startServer);