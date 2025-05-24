import path from 'node:path'
import { ChannelType, Colors, embedLength} from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";

const commandHadler=new Map();
const voiceChannels=new Map();

commandHadler.set("join",async interaction=>{
    const channel=await interaction.guild.channels.fetch(interaction.options.get("channel")?.value);
    if(!channel){
        await interaction.reply({
            embeds:[{
                    title:"Error",
                    description:"ボイスチャンネルが読み込めませんでした",
                    color:Colors.Red
                }]
        })
    }else if(channel.type!=ChannelType.GuildVoice){
        await interaction.reply({
            embeds:[{
                title:"Error",
                description:"ボイスチャンネルを指定してください",
                color:Colors.Red
            }]
        })
    }else if(!channel.joinable){
        await interaction.reply({
            embeds:[{
                title:"Error",
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
});

commandHadler.set("leave",async interaction=>{
    if(!voiceChannels.has(interaction.guildId)){
        await interaction.reply({
            embeds:[{
                title:"Error",
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
});

export async function handleCommands(interaction){
    if(!interaction.isChatInputCommand())return;
    if(commandHadler.has(interaction.commandName)){
        await commandHadler.get(interaction.commandName)(interaction);
    }else{
        await interaction.reply({
            embeds:[{
                title:"Error",
                description:"コマンドが見つかりませんでした",
                color:Colors.Red
            }]
        });
    }
}