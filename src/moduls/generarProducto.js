const { faker } = require('@faker-js/faker');
const { writeFile } = require('fs');
faker.locale = 'es';

const { commerce, image, datatype } = faker;

const generarProducto = () => {
    try {
        let str = [];
        for(let i = 1; i <= 5; i++){
            str.push({
                id: datatype.uuid(),
                title: commerce.product(),
                price: commerce.price(),
                thumbnail: image.avatar()
            })
        }
        writeFile('./products.json', JSON.stringify(str), (err) =>{
            if(err) console.log(err);
            console.log('Archivo guardado');
        })
        return str;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { generarProducto };




