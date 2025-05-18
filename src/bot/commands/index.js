import { ChannelType } from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";

export async function handleCommands(interaction){
    if(!interaction.isChatInputCommand())return;
    if(interaction.commandName==="join"){
        const channel=await interaction.guild.channels.fetch(interaction.options.get("channel")?.value);
        if(!channel){
            interaction.reply({content:"ボイスチャンネルが読み込めませんでした"})
        }else if(channel.type!=ChannelType.GuildVoice){
            interaction.reply({content:"ボイスチャンネルを指定してください"})
        }else if(!channel.joinable){
            interaction.reply({content:"ボイスチャンネルに参加できませんでした"})
        }else{
            joinVoiceChannel({
                channelId:channel.id,
                guildId:channel.guild.id,
                adapterCreator:channel.guild.voiceAdapterCreator,
                selfDeaf:false,
                selfMute:false
            });
            interaction.reply({content:"ボイスチャンネルに参加しました"});
        }

    }
}