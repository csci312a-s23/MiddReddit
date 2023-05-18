# MiddReddit
![workflow status](https://github.com/csci312a-s23/MiddReddit/actions/workflows/node.js.yml/badge.svg)

[Link to Deployed Application](https://camelshump.csci312.dev/)

sprint3

### Why MiddReddit

MiddReddit is an application that highlights issues, advertises events, and acts as a campus-wide resource for the Middlebury College community.


MiddReddit addresses the need for a online community to discuss Middlebury-centric topics, such as:

1. Courses
2. Social Scene
3. Athletics
4. Extracurriculars

Users can post, comment, and upvote to contribute to discussion. Viewing posts and comments is open to the public, but any actions require a middlebury.edu email.  

This will allow students to stay up to date on what is happening on campus, provide support during stressful times, and be a good platform to fall back on to stay in touch with the Middlebury community when on breaks.

### Features
- Browse posts in the main page and filter them by picking the categories you are looking for in the left sidebar. Sports, classes, dorms, and many more categories are available to browse to get a fuller sense of what people are talking about on campus!
- Filter posts through the search bar. Posts with a similar words as the search query in the content or title will show up for your browsing convenience.
- See what people are most excited about through the Top Posts section in our right sidebar.
- Use Google Authentication to sign in using your Middlebury account and create a post that can go in any category only if you are signed in! This is a Middlebury-student exclusive application.
- Comment on posts and other comments to interact with your community.
- Check your profile page to see what posts you've created, liked, etc., by clicking on your profile icon.


## Local Installation
This application can be installed on a local environment by running the following commands:

`git clone https://github.com/csci312a-s23/MiddReddit.git`

`npm install`

`npx knex migrate:latest`

`npx knex --esm seed:run --env development`

For authentication, a `.env.local` file is required in the project's root directory.  This is populated with three things a Google Client ID, Google Client Secret, and a NextAuth Secret. Example:
```javascript
GOOGLE_CLIENT_ID= <Your Google Client ID goes here>
GOOGLE_CLIENT_SECRET= <Your Google Client Secret goes here>
NEXTAUTH_SECRET= <Your NextAuth Secret goes here>
```

`npm run dev` starts a locally hosted version

All that is needed is a Middlebury Username and password to create a MiddReddit account.

The testing suite can by examined by using

`npm run test`

`npm run lint`


## Stack

This project skeleton has been setup similar to our assignments and practicals. It is a Next.JS application, created with create-next-app `💻 npx create-next-app@latest`, which uses Jest and Testing Library for testing, ESLint for static analysis, Prettier for styling, and is configured to use GitHub actions for testing pull requests.

Development dependencies installed with:

```
💻 npm install -D jest jest-environment-jsdom husky lint-staged prettier eslint-config-prettier @testing-library/react @testing-library/jest-dom
```

Note we need to pin the `node-fetch` version due to breaking changes when used with Jest in newer versions.




