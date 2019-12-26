# depenject-express

[![npm version](https://badge.fury.io/js/depenject-express.svg)](https://www.npmjs.com/package/depenject-express)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/rodrigo-speller/depenject-express) 

**depenject** is a lightweight and fast IoC container to resolve dependencies, achieving Inversion of Control (IoC) between their dependencies.

**depenject-express** is a middleware for [express](https://expressjs.com/) that provides dependency injection to your requests.

## Installing

For the latest stable version:

```Shell
npm install depenject-express
```

## Contribute

There are many ways to [contribute](https://github.com/rodrigo-speller/depenject-express/blob/master/CONTRIBUTING.md) to depenject-express:

* [Submit bugs](https://github.com/rodrigo-speller/depenject-express/issues) and help us verify fixes as they are checked in.
* Review the [source code changes](https://github.com/rodrigo-speller/depenject-express/pulls).
* [Contribute bug fixes](https://github.com/rodrigo-speller/depenject-express/blob/master/CONTRIBUTING.md).

## Documentation

*  [Overview of dependency injection with depenject](https://github.com/rodrigo-speller/depenject/blob/master/docs/OVERVIEW.md)

## Building

In order to build the depenject-express, ensure that you have [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/) installed.

Clone a copy of the repo:

```Shell
git clone https://github.com/rodrigo-speller/depenject-express.git
```

Change to the depenject-express directory:

```Shell
cd depenject-express
```

Install tools and dev dependencies:

```Shell
npm install
```

Use one of the following to build and test:

```
npm run build       # Build the library into "dist" directory.
```

## A simple sample to copy-and-paste

```typescript
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

```

# License
Copyright 2019 Rodrigo Speller

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
