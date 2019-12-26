// Copyright (c) Rodrigo Speller. All rights reserved.
// Licensed under the Apache License, Version 2.0.
// See License.txt in the project root for license information.

import { resolver, ContainerBuilder, Container } from 'depenject';
import { RequestHandler, Request, Response } from 'express';

export interface RegisterServicesFunction {
  (container: ContainerBuilder): void;
}

export interface SetupFunction {
  (configure?: RegisterServicesFunction): RequestHandler;
}

export interface RequestContext {
  readonly request: Request;
  readonly response: Response;
}

export class RequestContextAccessor {
  readonly context: RequestContext;

  constructor(context: RequestContext) {
    this.context = context;
  }

  static [resolver](container: Container): RequestContextAccessor {
    const holder = container.resolve(HttpContextHolder);
    return new RequestContextAccessor(holder.context);
  }
}

class HttpContextHolder {
  context!: RequestContext;

  static [resolver]() {
    return new HttpContextHolder();
  }
}

function configureScope(scope: Container, request: Request, response: Response) {
  const contextHolder = scope.resolve(HttpContextHolder);

  contextHolder.context = Object.freeze({ request, response });
}

export const depenject: SetupFunction = (configure) => {
  const builder = new ContainerBuilder()
    .registerScoped(RequestContextAccessor)
    .registerScoped(HttpContextHolder);

  if (configure != null)
    configure(builder);

  const rootContainer = builder.build();
  
  return (req, res, next) => {
    let container: Container;

    function getter() {
      if (container == null)
      {
        container = rootContainer.createScope();

        configureScope(container, req, res);
      }
      return container;
    }

    Object.defineProperty(req, '$services', { get: getter });

    next();
  }
}

export default depenject;

declare global {
  namespace Express {
    interface Request {
      readonly $services: Container;
    }
  }
}