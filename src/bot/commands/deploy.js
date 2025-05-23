import { REST,Routes,SlashCommandBuilder,ChannelType } from "discord.js";

const commands=[
    new SlashCommandBuilder()
    .setName("join")
    .setDescription("ボイスチャンネルに参加します")
    .addChannelOption(option=>
        option
        .setName("channel")
        .setDescription("参加するチャンネルを指定")
        .addChannelTypes(ChannelType.GuildVoice)
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName("leave")
    .setDescription("ボイスチャンネルとの接続を切断します"),
    new SlashCommandBuilder()
    .setName("music")
    .setDescription("音楽を再生します")
    .addStringOption(option=>
        option
        .setName("input")
        .setDescription("URLまたは曲名を入力")
        .setRequired(true)
    )
];

export async function deployCommands(c){
    try{
        const rest=new REST({version:"10"}).setToken(process.env.DISCORD_TOKEN);
        await rest.put(Routes.applicationCommands(c.application.id),{body:commands})
    }catch(e){
        throw new Error(e);
    }
}