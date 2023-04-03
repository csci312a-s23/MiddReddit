![workflow status](https://github.com/csci312a-s23/practical06-devops-mlinderm/actions/workflows/node.js.yml/badge.svg)

# MiddReddit

_TODO: populate readme_
[Link](https://middreddit.fly.dev/)

### Why MiddReddit

MiddReddit addresses the need for a online community to discuss Middlebury-centric topics, such as:

1. Courses
2. Social Scene
3. Athletics
4. Extracurriculars
   Currently few online communities exist to fill this role.

# Project Skeleton

TODO: Implement CI badges, provide a link to the deployed version of your application, and provide a brief description of the application functionality.

## Creation

This project skeleton has been setup similar to our assignments and practicals. It is a Next.JS application, created with create-next-app `💻 npx create-next-app@latest`, which uses Jest and Testing Library for testing, ESLint for static analysis, Prettier for styling, and is configured to use GitHub actions for testing pull requests.

Development dependencies installed with:

```
💻 npm install -D jest jest-environment-jsdom husky lint-staged prettier eslint-config-prettier @testing-library/react @testing-library/jest-dom
```

### Additional tools you might need

#### Mocking fetch

Tools for mocking fetch can be installed with

```
💻 npm install -D fetch-mock-jest node-fetch@2.6.7
```

Note we need to pin the `node-fetch` version due to breaking changes when used with Jest in newer versions.
