import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";
import dbConnection from "./config/db.config";

const app = express();
const port = process.env.PORT || 4001;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

app.use(routes);

app.use((req: Request, res: Response) => {
  return res.status(404).json({
    message: "Route not found",
  });
});

app.listen(port, () => {
  dbConnection();
  console.log(`Server listening at http://localhost:${port}`);
});
