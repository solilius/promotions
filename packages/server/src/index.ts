import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { router as promotionsRouter } from './routes/promotions';
import envs from "./utils/envs";
import { startServer } from './utils/start-server';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/promotions", promotionsRouter);

app.listen(envs.port, startServer);