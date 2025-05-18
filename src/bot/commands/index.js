import { ChannelType } from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";

export async function handleCommands(interaction){
    if(!interaction.isChatInputCommand())return;
    if(interaction.commandName==="join"){
        const channel=await interaction.guild.channels.fetch(interaction.options.get("channel")?.value);
        if(!channel){
        }else if(channel.type!=ChannelType.GuildVoice){

        }else if(!channel.joinable){
            joinVoiceChannel({
                channelId:channel.id,
                guildId:channel.guild.id,
                adapterCreator:channel.guild.voiceAdapterCreator,
                selfDeaf:false,
                selfMute:false
            });
            interaction.replay({content:"ボイスチャンネルに参加しました"});
        }

    }
}