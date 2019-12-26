import { Router } from 'express';
import ContainerBuilder from "depenject";

import Endpoint from './middlewares/endpoint';
import IndexEndpoint from './endpoints/IndexEndpoint';

export const registerServices = (services: ContainerBuilder) => {
  // Use this function to register services to the container.
}

export const registerRoutes = (router: Router) => {
  // Use this function to register routes to the app.
  router.get('/*', Endpoint(IndexEndpoint));
}