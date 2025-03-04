import {Router, Request, Response } from "express";

const router = Router();

router.get('/', (req: Request, res: Response) => {
  console.log("Root has been getted")
  res.send('Hello from the root')
})

export default router;