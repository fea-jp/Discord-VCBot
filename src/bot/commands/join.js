import { SlashCommandBuilder } from "discord.js";

export default {
    data:new SlashCommandBuilder()
    .setName("join")
    .setDescription("Join the voice channel.")
    .addChannelOption(option=>
        option.setName("channel")
        .setDescription("The voice channel to join.")
        .addChannelTypes(2)
        .setRequired(true)
    ),
    run:async interaction=>{
    }
}