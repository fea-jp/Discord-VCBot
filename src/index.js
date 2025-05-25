import { VCBot } from "./bot/index.js";

import { config } from "dotenv";
config();

const bot=new VCBot(process.env.DISCORD_BOT_TOKEN);

bot.run();