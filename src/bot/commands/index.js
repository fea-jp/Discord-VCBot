import { ChannelType, Colors} from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";

export async function handleCommands(interaction){
    if(!interaction.isChatInputCommand())return;
    if(interaction.commandName==="join"){
        const channel=await interaction.guild.channels.fetch(interaction.options.get("channel")?.value);
        if(!channel){
            await interaction.reply({
                embeds:[{
                    title:"エラーが発生しました",
                    description:"ボイスチャンネルが読み込めませんでした",
                    color:Colors.Red
                }]
            })
        }else if(channel.type!=ChannelType.GuildVoice){
            await interaction.reply({
                embeds:[{
                    title:"エラーが発生しました",
                    description:"ボイスチャンネルを指定してください",
                    color:Colors.Red
                }]
            })
        }else if(!channel.joinable){
            await interaction.reply({
                embeds:[{
                    title:"エラーが発生しました",
                    description:"ボイスチャンネルに参加できません。権限などを見直してください。",
                    color:Colors.Red
                }]
            })
        }else{
            joinVoiceChannel({
                channelId:channel.id,
                guildId:channel.guild.id,
                adapterCreator:channel.guild.voiceAdapterCreator,
                selfDeaf:false,
                selfMute:false
            });
            await interaction.reply({
                embeds:[{
                    title:"ボイスチャンネルに参加しました",
                    description:`${channel.name}に参加しました`,
                    color:Colors.Green
                }]
            });
        }

    }
}