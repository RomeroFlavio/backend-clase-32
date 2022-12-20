const normalizr = require('normalizr');
const { schema, normalize, denormalize } = normalizr;

const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });
const messageSchema = new schema.Entity('post', { author: authorSchema }, { idAttribute: 'id' });
const posts = new schema.Entity('posts', { messages: [messageSchema] }, { idAttribute: 'id' });

const normalizar = (data) => {
    const lengthFullData = JSON.stringify(data).length;
    console.log(data, lengthFullData);

    normalizePosts = normalize(data, posts);

    const lengthNormalizeData = JSON.stringify(normalizePosts).length;
    console.log(normalizePosts, lengthNormalizeData);

    return normalizePosts;
}

const desnormalize = (data) => {
    const desnormalizePosts = denormalize(data.result, posts, data.entities);
    return desnormalizePosts;
}

module.exports = { normalizar, desnormalize };