# Posterr 

A twitter-based application built with clean, solid and testable code.

## Features
💬 Post  
  *   Create
  *   Share
  *   Quote
  
🏠 Home Page 
  *   All Posts
  *   Following Posts

🧔 User Profile 
  *  Posts Count
  *  Followers
  *  Following
  *  Follow/Unfollow
  *  Create Post

## Built with
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
* ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)  
🐻 Zustand 
  * A revolutionary react state management lib
* Json-Server
  * To stub api requests

# Getting Started
## Prerequisites
* Node (16.14)
* Yarn

# Usage
## With ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
1. In the root folder, run
  ```
  docker-compose up
  ```
2. Open your browser in http://localhost:3000
3. That's it, have fun

## Without Docker
You'll need two terminal screens to do it

1. On the first one, run
  ```
  yarn start-server
  ```
2. On the second one, run
  ```
  yarn start-client
  ```
3. Open your browser at http://localhost:3000
4. That's it, have fun


### Tests
The project was built using Jest and React TestingLibrary.  
My goal was to use TDD on the entire project but due the time restrictions it was not possible, so I wrote a few ones, in a real life project, I would have asked for more time to use TDD all the way.

To run the tests, execute:
  ```
  yarn test
  ```
  

# Planning
## Questions
1. What's the maximum size (in characters) a reply can have?
2. Can a User reply to repost and quotes or only original posts?
3. Can a User reply to his own post?

## How to do it
1. I would create a new property inside the Post object called reply and store it there the text, author and timestamp, this way, I would be able to track down the reply history by accessing the parent post object. 
If it was a relational database, I would create a new table called reply with a Owner or Parent Post Id (a recursive table)
2. Then I would need to create a new UI component that would be able to display the reply's of a post
3. Last I would make the state management logic, using the existing stores

# Critique
1. I would add more unit and integration tests to ensure everything keeps working with future changes
2. The project is not integrated with no tools for analytics or error observability, I would add Segment and Google Analytics to it so we can track user behavior inside the application
3. I would refactor the PostList component to load 10 posts only, and have some sort of pagination or load more as it scrolls down
4. To make it like Twitter and enable the full power of real-time, a queue and websocket would be needed to know when a new post (or a post reaction) was made
5. As the project grows, I would need to start making more small requests instead of a few big requests, this is gradual and could be done as the problems appear
6. In the backend, it would be insteresting to have a load balancer combined with multiple instances (cluster) of our api so we can assure no request would fail when multiple users are accessing it, Kubernetes is a good way to go.
7. CI/CD is a must for successfull projects, having the unit, integration and e2e tests running before opening a Pull Request helps with code quality that's pushed to the repo, I like gitlab pipelines, but it could be other tool, like Jenkins.
8. I would ask for more time to deliver features, as Uncle Bob says, "The only way to go fast is **to go well**"
