import express from 'express';

import envs from "./utils/envs";

const app = express();


app.listen(envs.port, () => {
  console.log('server is up on port ' + envs.port);
});