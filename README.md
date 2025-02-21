# chat-api

CHAT APP

TO DO:
 - Research microservice architecture, DDD, MVC, and Hexagonal Architecture
 - Research data normalization
 - Research Dependency Injection

 - Design database
     - STACK
       - MongoDB
       - Mongoose
     - what data is needed?
       - Accounts
         - _id
         - email (username)
         - name {first, last}
         - password hash (may be unnecessary, email OTP's?)
       - Messages
         - _id
         - sender
         - receiver
         - text
         - timestamp
          
 -  Design backend
    - STACK
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
    - CRUD operations
       - create user (sign up)
       - find user by email (authorization, user search)
       - create message
       - find messages from a sender to recipient and vice versa
    - Indexes? Aggregations? Transactions?
     
 -  Design frontend
     -  STACK
       - NextJS
       - TypeScript
       - Tailwind 
     - what interactions will clients need?
       - sign up
       - log in
       - log out
       - view all message summaries from all senders
       - view all (paginated) messages from a sender and to that sender
       - send a message to a sender
       - search for a user by username(email)
       - status of users? (logged in? active?)
     - DESIGN
       - Mobile-first design
       - Pages/UI's
       - Input Validation
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
 - Hexagonal Architecture
 - Domain Driven Design
 - Dependency Injection
 - Microservices?


Plan of Execution:
 - Database:
   - ~~set up mongo cluster
   - ~~set up mongo database
   - ~~set up mongo collections
 - Backend:
   - set up backend repo
   - install dependencies
   - implement CORS
   - implement authentication
     - implement sign up
     - implement log in
     - implement JWT for authorization/authentication
     - implement log out
   - implement websocket
   - implement messaging
     - find user
     - send (create) message (send message, save new chat if not already saved)
     - get chat message threads (x most recent, paginate on scroll)
     - get all messages for single chat thread
   - Add Tests
     - define what should be tested
     - implement tests
   - Frontend:
     - set up frontend Repo
     - create pages
       - sign up
         - input validation
       - log in
         - input validation
       - messages page
         - user search
           - input validation
         - chat thread panel
         - active chat panel
           - send message form
            - input validation
         - log out button
     - Add Tests
       - define what should be tested
       - implement tests
   - Hosting:
     - host DB and backend on railway
     - host frontend on vercel 
