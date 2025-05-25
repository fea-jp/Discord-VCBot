import { Client, GatewayIntentBits } from "discord.js"
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
    }
    run(token){
        if(!token&&!this.token)throw new Error("Error: Discord token is required.");
        this.client.login(token||this.token);
    }
}