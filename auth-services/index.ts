import express, { Application, Response, Request } from "express";
import cors from "cors";
import crypto from "crypto";
import { iUser } from "./utils/interfaces";

const port: number = 3000;
const app: Application = express();


let data: iUser[] = [];
app

  .use(cors())
  .use(express.json())
  .get("/", (req: Request, res: Response) => {
    try {
      res.status(200).json({
        message: "You just hit the Auth endpoint ",
      });
    } catch (error) {
      res.status(404).json({
        message: "Not Found",
        data: error,
      });
    }
  });

  //creating new user
app.post("/api/register", (req: Request, res: Response) => {
  try {
    const ID: string = crypto.randomUUID();
    const { name, email, password } = req.body;

    const newUser = { name, email, password };
    data.push(newUser);

    return res.status(200).json({
      message: "Created sucessfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Not Found",
      data: error,
    });
  }
});


// view all users
app.get("/api/users", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "View users",
        data,
      });
    } catch (error) {
      return res.status(404).json({
        message: "Not Found",
        data: error,
      });
    }
  });
//getting single user
app.get("/api/user/:id", (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const singleUser = data.filter((el:iUser) => {
        return el.id === id;
    })
    return res.status(200).json({
      message: "View Users",
      data: singleUser,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Not Found",
      data: error,
    });
  }
});

//login user
app.post("/api/user/login", (req: Request, res: Response)  => {
    try {
        const {email, password} = req.body;
         data.filter((el) =>  {
if (el.email === email ) {
  return res.status(201).json({
        message: "login  User",
        data :el,
      });
    } else {
        return res.status(404).json({
            message: "user not found"
        });
    }
      });
        
      return res.status(200).json({
            message: "LOGIN",   
        });
     } catch (error) {
      return res.status(404).json({
        message: "Not Found",
        data: error,
      });
    }
  });

app.listen(port, () => {
  console.log("Server is now live on port", port);
});

process.on("uncaughtException", (err: any) => {
  console.log("Server is shutting down because of uncaught exception", err);

  console.log("Uncaught:", err);

  process.exit(1);
});

process.on("unhandeledRejection", (reason: any) => {
  console.log("Server is shutting down because of unhandled rejection", reason);

  console.log("Uncaught:", reason);
});
function post(arg0: string, arg1: (req: Request, res: Response) => void) {
  throw new Error("Function not implemented.");
}
