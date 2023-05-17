# MiddReddit
![workflow status](https://github.com/csci312a-s23/MiddReddit/actions/workflows/node.js.yml/badge.svg)

[Link to Deployed Application](https://camelshump.csci312.dev/)

sprint3

### Why MiddReddit

MiddReddit addresses the need for a online community to discuss Middlebury-centric topics, such as:

1. Courses
2. Social Scene
3. Athletics
4. Extracurriculars

Users can post, comment, and upvote to contribute to discussion. Viewing posts and comments is open to the public, but any actions require a middlebury.edu email.  

## Local Installation
This application can be installed on a local environment by running the following commands:

`git clone https://github.com/csci312a-s23/MiddReddit.git`

`npm install`

`npm run dev` starts a locally hosted version

The testing suite can by examined by using

`npm run test`

`npm run lint`


## Stack

This project skeleton has been setup similar to our assignments and practicals. It is a Next.JS application, created with create-next-app `💻 npx create-next-app@latest`, which uses Jest and Testing Library for testing, ESLint for static analysis, Prettier for styling, and is configured to use GitHub actions for testing pull requests.

Development dependencies installed with:

```
💻 npm install -D jest jest-environment-jsdom husky lint-staged prettier eslint-config-prettier @testing-library/react @testing-library/jest-dom
```


