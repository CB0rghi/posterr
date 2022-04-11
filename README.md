# Posterr 

A twitter-based application built with React, Typescript, TailwindCSS & ESLint!

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
TDD was used on a few files as an example, due time restrictions I did not add tests to other files. 

To run the tests, execute:
  ```
  yarn test
  ```
  
