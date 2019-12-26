import * as express from 'express';
import depenject from 'depenject-express'

import { registerServices, registerRoutes } from './src/startup';

const server = express();

// configure dependency injection
server.use(depenject(registerServices));

// configure routes
const router = express.Router();
registerRoutes(router);
server.use('/', router);

// start server
server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
