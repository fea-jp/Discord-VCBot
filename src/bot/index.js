import {Client,GatewayIntentBits,Events} from "discord.js";

export function createClient(){
    const client=new Client({
        intents:[
            GatewayIntentBits.Guilds,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessages
        ]
    });

    client.once(Events.ClientReady,async c=>{
        console.log(`準備完了！ ${c.user.tag}がログインしています`)
    })
    client.login(process.env.DISCORD_TOKEN);
    return client;
}