import { RequestHandler } from 'express';
import EndpointClass from '../Endpoint';
import { DependencyType } from 'depenject';

export default function Endpoint<T extends EndpointClass>(controllerType: DependencyType<T>): RequestHandler {
  return (request, response, next) => {

    async function invoke(): Promise<void> {
      const service = request.$services.resolve(controllerType);
      await service.Invoke();
    }

    invoke()
      .catch(next);

  };
}