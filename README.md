Memories App MERN
=================

This is a full-stack web application developed using the MERN stack (MongoDB, Express, React, Node.js) to enable users to upload and share their memories in the form of posts, along with the title, message, image and creator of the post.

Features
--------

-   User authentication (sign up, log in, log out) using JWT (JSON Web Tokens) & Google Auth.
-   Ability to create, update, delete and like posts.
-   Pagination and filtering of posts.
-   Display of posts in a grid or list view.
-   Ability to view user profiles and their posts.
-   Mobile-responsive design.

Technologies used
-----------------

-   React (Frontend JavaScript library)
-   Redux (State management library)
-   Axios (Promise-based HTTP client for the browser and Node.js)
-   Material-UI (React UI framework)
-   Node.js (Backend JavaScript runtime environment)
-   Express (Backend web application framework for Node.js)
-   MongoDB (NoSQL document-oriented database)
-   Mongoose (Object Data Modeling (ODM) library for MongoDB)
-   JWT (JSON Web Tokens)

Getting started
---------------

### Prerequisites

-   Node.js
-   MongoDB Atlas account (to create a cloud database instance)

### Installation

1.  Clone the repository:

bashCopy code

`git clone https://github.com/akki251/memories-App-MERN.git`

1.  Install the dependencies for both the client and server:

bashCopy code

`cd client
npm install
cd ../server
npm install`

1.  Create a `.env` file in the server folder with the following variables:

makefileCopy code

`PORT=5000
CONNECTION_URL=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>`

1.  Start the server and client:

bashCopy code

`cd server
npm start
cd ../client
npm start`

1.  Open `http://localhost:3000` in your browser to view the app.
