# Web Development and API Design
### Exam Score: Grade A (Top 5% of the cohort)

## Overview

This repository showcases a web application developed during the Web Development and API Design course at Kristiania University College, demonstrating my skills in full-stack development. The project features a chat application with user profiles and incorporates a suite of modern technologies including React, Express, MongoDB, Heroku, Jest, and WebSockets, highlighting my capability in both Single-Page Application (SPA) architecture and RESTful API design. Exam-length: 48 hours

## Features

- User authentication via OpenID Connect with Google and Microsoft Entra ID
- Real-time chat functionality using WebSockets
- Persistence of chat messages in MongoDB
- User profile creation and viewing with the ability to edit personal details
- SPA built with React, utilizing React Router for navigation
- RESTful API with Express for data operations with robust error handling
- Full deployment on Heroku with continuous integration and delivery pipelines
<hr>
<p align="left">
 <img  width="500" height="400" src="https://github.com/MaiHenry/Web-development-and-Api-Design/blob/main/chatroom.gif">
</p>

## Technical Requirements

- Responsive web design
- Server-side and client-side error handling with user feedback
- Automated test suite with coverage of 50-70%
- Code formatting with Prettier and Husky for linting
- Consistent use of the HTTP methods GET, POST, and PUT for RESTful services

## Setup Instructions

To run this application locally:

1. Clone the repository and navigate into the project directory.
2. Create a .env file in the server directory and add a desired port `PORT=3000`
3. Setup/create a MongoDB collection, copy the URI and add it to the .env as `MONGODB_URI`
4. Install dependencies for both the client and server with `npm install`.
5. Start both the client and server concurrently using `npm run dev`.
6. Run tests with `npm test` to ensure everything is set up correctly.

To activate the full functionality of the application, add all necessary .env variables.

## Testing

- Comprehensive tests are written using Jest.
- To run the test suite, use the command `npm test` in both the client and server directories.

## Reflection

Throughout the course and development of this application, I've deepened my understanding of web development practices, especially in the context of SPA and API design. The challenges I faced, particularly in ensuring real-time communication and secure authentication, have strengthened my skills in the technologies used.

## Additional Notes

- The project follows the functional requirements as outlined in the exam paper.

## Contact

Feel free to reach out if you have any questions.
<hr>
Course: <a href="https://www.kristiania.no/studieportal/school-of-economics-innovation-and-technology/bachelorniva/pg6300/webutvikling-og-api-design/">PG6301</a>(NO) / <a href="https://www.kristiania.no/en/syllabus/school-of-economics-innovation-and-technology/first-cycle-degree/pg6301/web-development-and-api-design/">PG6301</a>(EN)
