
class DataBase {
    constructor(table, knex){
        this.table = table;
        this.knex = knex;
    }

    async createTableProducts(){
        await this.knex.schema.createTable(this.table, table => {
            table.increments('id');
            table.string('title');
            table.string('thumbnail');
            table.integer('price');
        })
            .then(() => console.log('Tabla creada'))
            .catch(err => console.log(err))
    }

    async createTableChat(){
        await this.knex.schema.createTable(this.table, table => {
            table.increments('id');
            table.string('author');
            table.string('message');
            table.date('date');
        })
            .then(() => console.log('Chat creado'))
            .catch(err => console.log(err))
    }

    async insert(date){
        await this.knex(this.table).insert(date)
            .then(() => console.log('Saved successfully.'))
            .catch(err => console.log(err))
    }

    async getAllDates(){
        const date = [];
        await this.knex(this.table).select("*")
            .then(data => date.push(data))
            .catch(err => console.log(err))
        return date;
    }
}

module.exports = DataBase;