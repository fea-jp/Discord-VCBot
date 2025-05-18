import {Client,GatewayIntentBits,Events} from "discord.js";
import { deployCommands } from "./commands/deploy.js";
import { handleCommands } from "./commands/index.js";

export function createClient(){
    const client=new Client({
        intents:[
            GatewayIntentBits.Guilds,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessages
        ]
    });

    client.once(Events.ClientReady,async c=>{
        try{
            await deployCommands(client,process.env.DISCORD_TOKEN);
            console.log(`準備完了！ ${c.user.tag}がログインしています`);
        }catch(e){
            console.error(e)
        }
    });

    client.on(Events.InteractionCreate,async interaction=>{
        await handleCommands(interaction);
    })
    
    client.login(process.env.DISCORD_TOKEN);
    return client;
}