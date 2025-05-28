import dotenv from "dotenv";
import path from "path";
import { cwd } from "process";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: path.resolve(cwd(), `.env.${env}`) });
