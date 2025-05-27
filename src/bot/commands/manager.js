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

    getCommand(name){
        return this.commands.get(name);
    }

    getCommandsData(){
        return Array.from(this.commands.values()).map(command=>command.data);
    }
}