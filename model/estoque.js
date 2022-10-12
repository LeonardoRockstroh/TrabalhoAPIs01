const mongoose = require ('mongoose')
const Schema = mongoose.Schema;
// const {Schema}  = mongoose;

const EstoqueSchema = new Schema({
    idprod: String,
    qtd: Number
},
{
    versionKey: false
});

module.exports = mongoose.model("Estoque", EstoqueSchema);