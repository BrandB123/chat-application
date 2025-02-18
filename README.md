# chat-api

CHAT APP

TO DO:
 - Research microservice architecture
 - Research domain driven design and Model-View Controller and Hexagonal Architecture
 - Research data normalization
 - Research Dependency Injection
 - Design database
     - what data is needed?
     - CRUD operations
     - Indexes? Aggregations? Transactions?
     - what is the shape of the data?
 -  Design backend
     -  
 -  Design frontend
     - 

DB
 STACK
 - MongoDB
 - Mongoose
 DESIGN

Backend
 STACK
 - NodeJS
 - Express
 - TypeScript
 - Passport (strategies TBD)
 - bcrypt (TBD: password hashing, if passwords are to be used)
 - dotenv
 - jsonwebtoken (user authenitication & authorization)
 - socket.io
 - mongodb
 - mongoose
 - supertest (dev dependency)
 DESIGN

Frontend
 STACK
 - NextJS
 - TypeScript
 - Tailwind
 DESIGN
 - Mobile-first design
 - Pages/UI's
 - Input Validation
 FEATURES
 - sign up
 - log in
 - home page with all chats listed
 - open up tile on right 2/3's of page after a chat is clicked or a new chat is started
 - close current chat with x in chat window
 - search bar for finding users to chat with


Testing
 - Unit Testing
   - Frontend
     - Jest?
     - Vitest?
   - Backend
     - Supertest
 - Integration Testing
 - End-to-End Testing

Architectural/Design Principals to Keep in Mind:
 - SOLID principles
 - Microservices
 - Dependency Injection
 - Domain Driven Design
