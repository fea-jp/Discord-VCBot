import { Colors } from "discord.js";
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";

export class CommandManager{
    constructor(){
        if(CommandManager._instance)return CommandManager.instance;

        this.ready=false;
        this.commands=new Map();
        this.callbacks=new Map();
        this.loadCommands();
        CommandManager._instance=this;
    }

    static _instance=null;

    static get instance(){
        if(!CommandManager._instance)new CommandManager();
        return CommandManager._instance;
    }

    on(event, callback){
        this.callbacks.set(event, callback);
    }

    emit(event, ...args){
        if(this.callbacks.has(event)){
            const callback=this.callbacks.get(event);
            if(typeof callback==="function")callback(...args);
        }
    }

    loadCommands(){
        const __filename=fileURLToPath(import.meta.url);
        const __dirname=path.dirname(__filename);
        
        const commandsPath=path.join(__dirname,"../commands");
        const commandFiles=fs.readdirSync(commandsPath).filter(filePath=>filePath.endsWith(".js")).filter(filePath=>filePath!=="manager.js");
        commandFiles.forEach(async filePath=>{
            const {default:command}=await import(path.join(__dirname,filePath));
            console.log("Loading command:", command.data.name)
            if(!command.data||!command.run)throw new Error("Error: Command must have 'data' and 'run' properties.");
            this.commands.set(command.data.name, command);
            if(Array.from(this.commands).length==commandFiles.length){
                this.ready=true;
                console.log("Commands loaded successfully.");
                this.emit("ready");
            }
        });
    }

    async handleCommand(interaction){
        if(!this.ready)throw new Error("Error: Commands are not ready yet.");
        const commandName=interaction.commandName;
        if(!this.hasCommand(commandName)){
            await interaction.reply({
                embeds:[{
                    title:"Error",
                    description:"Command not found.",
                    color:Colors.Red
                }]
            })
        }
        const command=this.commands.get(commandName);
        if(!command)throw new Error("Error: Command not found in the manager.");
        try{
            await command.run(interaction)
        }catch(e){
            console.error("Error executing command: ", commandName, e);
            await interaction.reply({
                embeds:[{
                    title:"Error",
                    description:"An error occurred while executing the command.",
                    color:Colors.Red
                }]
            });
        }
    }

    getCommandsData(){
        return Array.from(this.commands.values()).map(command=>command.data);
    }

    hasCommand(name){
        return this.commands.has(name)
    }
}