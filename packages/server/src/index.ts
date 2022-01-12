import express from 'express';
import cors from 'cors';

import { router as promotionsRouter } from './routes/promotions';
import envs from "./utils/envs";
import { startServer } from './utils/start-server';

const app = express();

app.use(cors({ origin: envs.allowedDomains }));

app.use("/promotions", promotionsRouter);

app.listen(envs.port, startServer);