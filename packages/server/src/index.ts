import express from 'express';

import envs from "./utils/envs";
import { startServer } from './utils/start-server';

const app = express();


app.listen(envs.port, startServer);