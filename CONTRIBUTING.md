# Instructions for Logging Issues

> ### This repository keeps only changes and issues to **depenject-express** component. For changes and issues of **depenject**, please submit to [depenject repository](https://github.com/rodrigo-speller/depenject).

## Do you have a suggestion?

We accept suggestions in the issue tracker.

In general, things we find useful when reviewing suggestions are:
* A description of the problem you're trying to solve.
* An overview of the suggested solution.
* Examples of how the suggestion would work in various places:
  * Code examples showing e.g. "this would be an error, this wouldn't".
  * Code examples showing the generated JavaScript (if applicable).
* If relevant, precedent in other libraries can be useful for establishing context and expected behavior.

# Instructions for Contributing Code

## Tips

### Faster clones

To save some time, you might want to clone it without the repo's full history using `git clone --depth=1`.

### Using local builds

Run `npm run build` to build a version of depenject-express that reflects changes you've made. After you build the local files, you can find them in the `<repo-root>/dist` directory.

## Contributing bug fixes

depenject-express is currently accepting contributions in the form of bug fixes. A bug must have an issue tracking it in the issue tracker that has been approved (labelled ["help wanted"](https://github.com/rodrigo-speller/depenject-express/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) or in the "Backlog milestone"). Your pull request should include a link to the bug that you are fixing. If you've submitted a PR for a bug, please post a comment in the bug to avoid duplication of effort.

## Contributing features

Features (things that add new or improved functionality to depenject-express) may be accepted, but will need to first be approved (labelled ["help wanted"](https://github.com/rodrigo-speller/depenject-express/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) or in the "Backlog milestone") in the suggestion issue.

## Housekeeping

Your pull request should:

* Include a description of what your change intends to do.
* Be a child commit of a reasonably recent commit in the **develop** branch:
    * Requests need not be a single commit, but should be a linear sequence of commits (i.e. no merge commits in your PR).
* It is desirable, but not necessary, for the tests to pass at each commit.
* Have clear commit messages:
    * e.g. "Minor refactor in SetupFunction", "Fix resolution in RequestContextAccessor", "Add a new handler to filter dependencies".
* To avoid line ending issues, set `autocrlf = input` and `whitespace = cr-at-eol` in your git configuration.

# Legal

```
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
```

Briefly, this agreement testifies that you are granting us permission to use the submitted change according to the terms of the project's license, and that the work being submitted is under appropriate copyright.