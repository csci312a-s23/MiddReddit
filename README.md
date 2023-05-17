![workflow status](https://github.com/csci312a-s23/practical06-devops-mlinderm/actions/workflows/node.js.yml/badge.svg)

# MiddReddit

_TODO: populate readme_
[Link](https://middreddit.fly.dev/)
sprint1

### Why MiddReddit

MiddReddit addresses the need for a online community to discuss Middlebury-centric topics, such as:

1. Courses
2. Social Scene
3. Athletics
4. Extracurriculars
   
Currently, few online communities exist to fill this role. This will allow students to stay up to date on what is happening on campus, provide support during stressful times, and be a good platform to fall back on to stay in touch with the Middlebury community when on breaks.
   

# Project Skeleton

TODO: Implement CI badges, provide a link to the deployed version of your application, and provide a brief description of the application functionality.
![workflow status](https://github.com/csci312a-s23/MiddReddit/actions/workflows/node.js.yml/badge.svg)

## Creation

This project skeleton has been setup similar to our assignments and practicals. It is a Next.JS application, created with create-next-app `💻 npx create-next-app@latest`, which uses Jest and Testing Library for testing, ESLint for static analysis, Prettier for styling, and is configured to use GitHub actions for testing pull requests.

Development dependencies installed with:

```
💻 npm install -D jest jest-environment-jsdom husky lint-staged prettier eslint-config-prettier @testing-library/react @testing-library/jest-dom
```

### Additional tools you might need
All that is needed is a Middlebury Username and password to create a MiddReddit account.

#### Mocking fetch

Tools for mocking fetch can be installed with

```
💻 npm install -D fetch-mock-jest node-fetch@2.6.7
```

Note we need to pin the `node-fetch` version due to breaking changes when used with Jest in newer versions.

### Features
- Browse posts in the main page and filter them by picking the categories you are looking for in the left sidebar. Sports, classes, dorms, and many more categories are available to browse to get a fuller sense of what people are talking about on campus!
- Filter posts through the search bar. Posts with a similar words as the search query in the content or title will show up for your browsing convenience.
- See what people are most excited about through the Top Posts section in our right sidebar.
- Use Google Authentication to sign in using your Middlebury account and create a post that can go in any category only if you are signed in! This is a Middlebury-student exclusive application.
- Comment on posts and other comments to interact with your community.
- Check your profile page to see what posts you've created, liked, etc., by clicking on your profile icon.

MiddReddit is an application that highlights issues, advertises events, and acts as a campus-wide resource for the Middlebury College community.

The link to our deployed application is: https://fly.io/apps/icy-paper-5700/monitoring
