import dotenv from "dotenv";
dotenv.config();

import { startServer } from "./web/index.js";
startServer();
import { createClient } from "./bot/index.js";
const client=createClient();