import { RequestContext, RequestContextAccessor } from 'depenject-express';
import { Container } from "depenject";

export default abstract class Endpoint {
  readonly services: Container;
  
  constructor(services: Container) {
    this.services = services;
  }
  
  abstract Invoke(): Promise<void>;
  
  private _requestContext?: RequestContext;
  get requestContext() {
    let context = this._requestContext;
    if (context == null)
    {
      context = this.services.resolve(RequestContextAccessor).context;
      if (context == null)
        throw Error();
      this._requestContext = context;
    }
    return context;
  }

  get request() { return this.requestContext.request; }
  get response() { return this.requestContext.response; }
}