import { REST, Routes } from "discord.js";
import { CommandManager } from "./commands/manager.js";

export async function deployCOmmands({client,token}){
    const rest=new REST({version:"10"}).setToken(token);
    await rest.put(Routes.applicationCommands(client.application.id),{body:CommandManager.instance.getCommandsData()})
    .catch(console.error)
    console.log("Successfully reloaded application commands.");
}