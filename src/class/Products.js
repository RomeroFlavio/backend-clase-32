const fs = require('fs');

class Products {
    constructor(url){
        this.url = url;
        this.user = [];
    }

    async #readFile(){
        try{
            const content = await fs.promises.readFile(this.url, 'utf-8');
            return JSON.parse(content);
        }catch(err){
            console.log(err);
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
}

const products = new Products('./products.json');

module.exports = products;