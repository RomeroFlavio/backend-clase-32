const fs = require('fs');

class Chat{
    constructor(url){
        this.url = url;
    }

    async #readFile(){
        try{
            const content = await fs.promises.readFile(this.url, 'utf-8');
            return JSON.parse(content);
        }catch(err){
            console.log(err);
        }
    }

    async save(message){
        const messages = await this.#readFile();
        if(messages !== undefined){
            await fs.promises.writeFile(this.url, JSON.stringify([  ...messages, {...message}], null, 2), 'utf-8');
        }
    }
    
    async getAll(){
        try {
            const messages = await this.#readFile();
            return messages;
        } catch (err) {
            console.log(err);
        }
    }
};

const chat = new Chat('./messages.json');

module.exports = chat;