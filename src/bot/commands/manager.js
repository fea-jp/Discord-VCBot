import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";

export class CommandManager{
    constructor(){
        if(CommandManager._instance)return CommandManager.instance;

        this.loadCommands();
        CommandManager._instance=this;
    }

    static _instance=null;

    static get instance(){
        if(!CommandManager._instance)new CommandManager();
        return CommandManager._instance;
    }

    loadCommands(){
        const __filename=fileURLToPath(import.meta.url);
        const __dirname=path.dirname(__filename);
        console.log(__filename,__dirname)
    }
}