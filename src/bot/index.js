import { Client, GatewayIntentBits } from "discord.js"
import { CommandManager } from "./commands/manager.js";

export class VCBot{
    constructor(token){
        this.client=new Client({
            intents:[
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        });
        if(token)this.token=token;
        this.commandManager=CommandManager.instance;
    }
    run(token){
        if(!token&&!this.token)throw new Error("Error: Discord token is required.");
        this.client.login(token||this.token);
    }
}