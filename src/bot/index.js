import { Client, GatewayIntentBits } from "discord.js"
import { CommandManager } from "./commands/manager.js";
import { deployCOmmands } from "./commandDeploy.js";

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
        console.log("VCBot initialized.");
    }
    async run(token){
        if(!token&&!this.token)throw new Error("Error: Discord token is required.");
        await this.client.login(token||this.token);
        await deployCOmmands({client:this.client, token:this.token});
        console.log("VCBot is running.")
    }
}