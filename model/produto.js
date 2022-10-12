const mongoose = require ('mongoose')
const Schema = mongoose.Schema;
// const {Schema}  = mongoose;

const ProdutoSchema = new Schema({
    nome: String,
    preco: Number,
    quantidade: Number
},
{
    versionKey: false
});

module.exports = mongoose.model("Produto", ProdutoSchema);