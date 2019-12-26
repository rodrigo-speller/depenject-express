import * as express from 'express';
import * as depenject from 'depenject';
import * as di from 'depenject-express'

const app = express();

// DEPENDENCY INJECTION

// a single dependency are create once
class SingletonDependency {
  creation = Date();
}

// a scoped dependency are created once per request
class ScopedDependency {
  creation = Date();
}

app.use(di.depenject(services => {
  services
    .registerSingleton(SingletonDependency)
    .registerScoped(ScopedDependency)
}));

// REQUEST HANDLER

class SayHelloEndpoint {
  requestContext: di.RequestContext;

  constructor(container: depenject.Container) {
    let contextAccessor = container.resolve(di.RequestContextAccessor);

    this.requestContext = contextAccessor.context;
  }

  get message() {
    let { request } = this.requestContext;

    let name = request.query.name;
    if (!name)
      name = 'World';

    return `Hello ${name}!`;
  }

  execute() {
    const { request, response } = this.requestContext;

    const singletonSample = request.$services.resolve(SingletonDependency);
    const scopedSample = request.$services.resolve(ScopedDependency);
    
    response.send(`
      <h1>${this.message}</h1>
      <form>
          <label for=name>Name:</label>
          <input name=name />
          <button>Say hello</button>
      </form>
      <p>The singleton dependency was created at: ${singletonSample.creation}.</p>
      <p>The scoped dependency was created at: ${scopedSample.creation}.</p>
    `);
  }
}

app.use('/', (req) => {

  // the dependency container can be accessed using $services property
  const messageProvider = req.$services.resolve(SayHelloEndpoint);

  messageProvider.execute();

});

// START SERVER

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
