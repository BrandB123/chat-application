/*
TO DO
 - separate into separate files
 - update to mongoose
 - input validation review
 - review data that is being returned in response
 - implement errors and error handling
 - outline other auth routes
*/


import Router, {Request, Response} from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import 'dotenv/config'


const dbClient = new MongoClient(process.env.CONNECTION_URI as string,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

const router = Router();

router.get("/", (req: Request, res: Response) => {
    console.log("auth has been getted");
    res.send("Hello from the auth router");
})

// user submits email for magic link to be sent to
router.post("/login", async (req: Request, res: Response) => {
    // GET EMAIL FROM REQUEST
    const email: string = req.body.email;

    // CHECK THAT SUBMISSION IS NOT BLANK AND IS AN EMAIL
    if (!email){
        res.send("invalid email submission: Missing Field");
        return
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
        res.send("Invalid email submission: Invalid Email Format");
        return
    }

    // LOOK FOR EMAIL IN DB
    let user;
    try {
        // Connect the client to the server
        await dbClient.connect();
        // Query Database
        user = await dbClient.db("chat").collection("accounts").findOne({ email: email });
    } finally {
        // close when you finish/error
        await dbClient.close();
    }
    // IF NOT FOUND, THROW ERROR AND RETURN ERROR IN RESPONSE
    if (!user){
        res.send("User not found");
        return
    }
    // SEND MAGIC LINK
    // send status to confirm link was sent successfully
    res.json(JSON.stringify(user));
    // res.send("work in progress");
})



export default router;

/* 

PLAN FOR AUTH
 - TAKE EMAIL FOR LOGIN
    - POST req to /auth/login with email
    - check that the submission is an email
    - check if the submission is in the db 
        {if no, warn user/recommend signing up}
        {else, next()}
 - SEND MAGIC LINK
    - REVIEW PASSPORT STRATEGY FOR WHAT IS NEEDED, THE FOLLOWING IS A GUESS
    - take email into strategy, send with sendgrid
    - next()
 - REDIRECT TO NEW PAGE FOR ENTERING THE CODE TO LOG IN
    - res.redirect("/auth/confirmation");
 - IF CORRECT, AUTHENTICATE USER AND SEND JWT FOR CONTINUED AUTHENTICATION/AUTHORIZATION
    - POST request to /auth/confirmation
    - res.json(stringify(message: success, JWT-INFO))
 - IF INCORRECT, PROMPT FOR CODE AGAIN
    - res.json(message: failed)
 - PROTECT ROUTES BY CHECKING JWT FOR USER LOGGED IN AND USER PERMISSIONS ON PAGES


 BUSINESS LOGIC - RULES AND CONSTRAINTS. FOCUS ON WHAT THE APP DOES, NOT HOW IT DOES IT
 - check that the email submitted is in the db

 APPLICATION LOGIC - COORDINATE BUSINESS LOGIC AND INFRASTRUCTURE. LOGIC FOR HOW THE APP DOES WHAT IS REQUESTED
 - check that the email field submits a valid email

 INFRASTRUCTURE LOGIC - HANDLE EXTERNAL DEPENDENCIES. READ AND/OR WRITE TO / INTERACT WITH DEPENDENCIES


*/
