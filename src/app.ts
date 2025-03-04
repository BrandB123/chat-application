import express, { Request, Response, ErrorRequestHandler} from "express";
import indexRouter from "./routes/indexRouter";
import authRouter from "./routes/authRouter"

import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", indexRouter)
app.use("/auth", authRouter)


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})


// export default app;

/* 
APPLICATION STRUCTURE
 - src
    - app.ts (sets up the app with dependencies and routes and starts server)
    - routes (very little logic, just call a funciton that applies to a given use case. This should be in the applications file)
    - domain (modules related to business logic)
    - application (modules related to coordinating business modules and infrastructure modules)
    - infrastructure (modules related to interactions with external depenedencies 
        - auth/
            - jwt
            - passport
        - db/
            - mongo
        - websocket/
            - socket
        - email/
            - sendgrid
    - ports?
        - generic rules for plugins to follow to interact with domain
        - a contract that outlines what is required to be able to interact with the domain
            - "if you give me a method that takes in x as an argument and is of type a and returns 
               a result of type b then you can interact with the domain"
        - normally a typescript interface or class object
        EXAMPLE
        export interface UserRepository {
            findByEmail(email: string): Promise<User | null>;
            createUser(user: User): Promise<void>;
        }
    - adapters?
        - specific implementations of plugins to interact with domain
        - fulfills the contract requirements of the ports
        - use the 'implements' keyword to require that a class fulfill the requirements of the ts interface
        EXAMPLE
        import { UserRepository } from "../../ports/UserRepository";
        import { UserModel } from "./mongoClient"; // MongoDB model

        export class MongoUserRepository implements UserRepository {
            async findByEmail(email: string): Promise<User | null> {
                return await UserModel.findOne({ email }).lean();
            }

            async createUser(user: User): Promise<void> {
                await new UserModel(user).save();
            }
        }

    
    NOTE:
        - our adapters would be used in our use cases.
        - use cases would call the adapter through a port. At runtime, a specific adapter is provided
        EXAMPLE

        1.) Create a Service That Uses the UserRepository Port
        // /application/services/AuthService.ts
        import { UserRepository } from "../../ports/UserRepository";
        import { User } from "../../domain/User";

        export class AuthService {
            constructor(private userRepository: UserRepository) {}

            async login(email: string): Promise<User | null> {
                return await this.userRepository.findByEmail(email);
            }
        }

        2.) Use the Adapter Inside Your Express Route
        // /adapters/http/AuthController.ts
        import { Request, Response } from "express";
        import { AuthService } from "../../application/services/AuthService";
        import { MongoUserRepository } from "../../infrastructure/database/MongoUserRepository";

        const userRepository = new MongoUserRepository(); // Adapter instance
        const authService = new AuthService(userRepository); // Inject into service

        export async function login(req: Request, res: Response) {
            const { email } = req.body;
            const user = await authService.login(email);
  
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }
  
            res.json({ user });
        }


*/
