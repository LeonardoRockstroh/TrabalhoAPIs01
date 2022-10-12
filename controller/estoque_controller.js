const Estoque = require("../model/estoque");
const Produto = require("../model/produto");

// Listar histórico de baixar
exports.historico = (req, res) => {
    Estoque.find({}, (err, historico) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(historico);
    })
}

// Realizar baixa de produto
exports.baixa = (req, res) => {
    const baixaRequest = req.body;

    // Valida se todas informações foram preenchidas
    if(baixaRequest && baixaRequest.idprod && baixaRequest.qtd) {
        
        // Valida se produto existe
        Produto.findById(baixaRequest.idprod, (err, produtoEncontrado) => {
            if(produtoEncontrado) {
                
                // Calcula quantidade nova do produto
                produtoEncontrado.quantidade = produtoEncontrado.quantidade - baixaRequest.qtd;
                
                // Valida se bate com o estoque existente
                if(produtoEncontrado.quantidade == 0 || produtoEncontrado.quantidade > 0) {
                    // Insere baixa
                    const baixaNova = new Estoque(baixaRequest);
                    baixaNova.save((err, baixaSalvo) => {
                        if(err) {
                            res.status(500).send(err);
                        }
                        else {
                            // Atualiza quantidade do produto
                            Produto.findByIdAndUpdate(baixaRequest.idprod, produtoEncontrado, {new: true}, 
                                (err, produtoAtualizado) => {
                                    if(err) {
                                        res.status(500).send(err)
                                    }
                            })

                            return res.status(201).json(baixaSalvo);
                        }
                    })
                } else {
                    return res.status(404).json(
                        { Erro: "Estoque já consumido, ou qtd maior do que existe em estoque" }
                    )
                }
            }
            else {
                return res.status(404).json(
                    { Erro: "Produto nao encontrado" }
                )
            }
        
        })
    }
    else {
        return res.status(400).json({
            Erro:"Id do produto ou/e quantidade obrigatórios"
        })
    }
}