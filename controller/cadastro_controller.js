const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Usuario = require('../model/usuario');

//Listar cadastros
exports.listar = (req, res) => {
    Usuario.find({}, (err, usuarios) =>{ 
        if(err) {
            res.status(500).json({Erro: err})
        }
        else {
            res.status(200).json(usuarios);
        }
    })
}

//Inserir novo usuário
exports.inserir = (req, res) => {
    const usuarioRequest = req.body;

    if(usuarioRequest && usuarioRequest.nome && usuarioRequest.email && usuarioRequest.senha) {

        const usuarioNovo = new Usuario(usuarioRequest);
        console.log("Senha 1", usuarioNovo.senha);
        usuarioNovo.senha = bcrypt.hashSync(usuarioRequest.senha, 10);
        console.log("Senha 2", usuarioNovo.senha);

        usuarioNovo.save((err, usuarioSalvo) => {
            if(err) {
                res.status(500).json({Erro: err})
            }
            else {
                return res.status(201).json(usuarioSalvo);
            }
        })
        
    }
    else {
        return res.status(400).json({
            Erro:"Nome, email e/ou senha sao obrigatorios"
        })
    }
}