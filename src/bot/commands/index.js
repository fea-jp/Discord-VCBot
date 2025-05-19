import { ChannelType, Colors, embedLength} from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";

const voiceChannels=new Map();

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
            const connection=joinVoiceChannel({
                channelId:channel.id,
                guildId:channel.guild.id,
                adapterCreator:channel.guild.voiceAdapterCreator,
                selfDeaf:false,
                selfMute:false
            });
            voiceChannels.set(interaction.guildId,{connection});
            await interaction.reply({
                embeds:[{
                    title:"ボイスチャンネルに参加しました",
                    description:`${channel.name}に参加しました`,
                    color:Colors.Green
                }]
            });
        }
    }else if(interaction.commandName==="leave"){
        if(!voiceChannels.has(interaction.guildId)){
            await interaction.reply({
                embeds:[{
                    title:"エラーが発生しました。",
                    description:"ボイスチャンネルに参加していません。",
                    color:Colors.Red
                }]
            })
        }else{
            voiceChannels.get(interaction.guildId).connection.destroy();
            voiceChannels.delete(interaction.guildId);
            await interaction.reply({
                embeds:[{
                    title:"ボイスチャンネルとの接続を切断しました。",
                    color:Colors.Green
                }]
            })
        }
    }
}