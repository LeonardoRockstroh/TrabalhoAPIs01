const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Usuario = require('../model/usuario');

exports.validarUser = (req, res) => {
    if(req.body && req.body.email && req.body.senha) {
        const emailUsuario = req.body.email;
        const senhaUsuario = req.body.senha;

        Usuario.findOne({email: emailUsuario}, (err, usuarioEncontrado) => {
            if(err) {
                return res.status(500).json({Erro: err}); 
            }
            else if(usuarioEncontrado && bcrypt.compareSync(senhaUsuario, usuarioEncontrado.senha)) {
                const token = jwt.sign( {
                    id: usuarioEncontrado.id                    
                }, 'Sen@crs', { expiresIn: "1h"});
                res.status(201).json({token: token});
            }
            else {
                res.status(401).json({Erro: "Usuario ou senha invalidos"});
            }    
        })
    }
    else {
        res.status(400).json({Erro: "Parametros invalidos"});
    }   
}

