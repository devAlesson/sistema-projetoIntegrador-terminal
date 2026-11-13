import { entradaNumero, entradaTexto } from "./entrada.js";
import { moradorExiste } from "./moradores.js";
import { encomendas } from "./dados.js";


export function registarEncomenda (usuarioLogado) {
    console.log("\n========== REGISTRO DE ENCOMENDAS ==========\n")
    let bloco
    let apartamento
    let descricao

    while (true) {

        while (true) {

            bloco = entradaTexto(
                "\nDigite o bloco referente a entrega (A/B): "
            )
            if (bloco.trim() === "") {
                console.log("\nO bloco nao pode ficar vazio!")
                continue
            }
            if (bloco.trim().toLowerCase() === "a") {
                bloco = "A"
            } else if (bloco.trim().toLowerCase() === "b") {
                bloco = "B"
            } else {
                console.log("\nBloco informado invalido!")
                continue
            }
            apartamento = entradaNumero(
                "Digite o numero do apartamento referente a entrega: "
            )
           
            if (!Number.isInteger(apartamento) || apartamento <= 0 || String(apartamento).length > 3) {
                console.log("\nNumero de apartamento invalido!")
                continue
            }

            let existeMorador = moradorExiste(bloco.trim(), apartamento)
            if (!existeMorador) {
                console.log("\nMorador nao encontrado no bloco ou apartamento informado!")
                continue
            }
            break
        }

        while (true) {

            descricao = entradaTexto(
                "Descricao da entrega: "
            )
    
            if (descricao.trim() === "") {
                console.log("\nDescricao nao pode ficar vazia!")
                continue
            }
            break
        }

            
        encomendas.push({
            id: encomendas.length + 1,
            bloco: bloco,
            apartamento: apartamento,
            descricao: descricao,
            recebidaPor: usuarioLogado,
            status: "Pendente"
        })
        console.log(encomendas)

        console.log("\nEncomenda registrada com sucesso!")
        break;
    }
}

export function buscarEncomendaPorId() {
    console.log("\n=========== BUSCAR ENCOMENDA POR ID ==========\n")
    
    try {
            while (true) {
                if (encomendas.length === 0) {
                    throw new Error("Nao temos encomendas  registradas!")
                    break
                }
                let idDesejado = entradaNumero(
                    "\nDigite o id da encomenda que deseja pesquisar: "
                )
        
                if (!Number.isInteger(idDesejado) || idDesejado <= 0) {
                    throw new Error("O id informado nao e valido!")
                }
        
                let buscaEncomenda = encomendas.find(encomenda => {
                    return encomenda.id === idDesejado
                })
                
                if (buscaEncomenda) {
                    console.log("\n========= Encomenda encontrada ==========\n")
                    console.log(`ID: ${buscaEncomenda.id}`)
                    console.log(`BLOCO: ${buscaEncomenda.bloco}`)
                    console.log(`APARTAMENTO: ${buscaEncomenda.apartamento}`)
                    console.log(`DESCRICAO: ${buscaEncomenda.descricao}`)
                    console.log(`RECEBIDA POR: ${buscaEncomenda.recebidaPor}`)
                    console.log(`STATUS: ${buscaEncomenda.status}`)
                    console.log("-------------------------------\n")
                    break
                } else {
                    throw new Error("Encomenda com o id informado nao encontrada!")
                    break
                }
            
    
        }
        } catch (erro) {
            console.log(`\nErro: ${erro.message}`)
        }
}



export function entregarEncomenda(){
    console.log("\n========== ENTREGA DE ENCOMENDA ==========\n")

        try {
            if (encomendas.length === 0) {
                throw new Error("Nao temos encomendas  registradas!")
            }
            let idEncomenda
            while (true) {

                idEncomenda = entradaNumero(
                    "\nDigite o id da encomenda que deseja entregar: "
                )
    
                if (!Number.isInteger(idEncomenda) || idEncomenda <= 0) {
                    console.log("\nO id informado nao e valido!")
                    continue
                }
                break
            }
    
            let encomendaExiste = encomendas.find(encomenda => {
                return encomenda.id === idEncomenda
            })
    
            if (encomendaExiste) {
                console.log("\n========= ENCOMENDA ENCONTRADA ===========")
                if(encomendaExiste.status === "Entregue") {
                    throw new Error("Essa encomenda ja foi entregue!")
                } else {
                    encomendaExiste.status = "Entregue"
                    console.log(`\nEncomenda com o id: ${encomendaExiste.id}, entregue com sucesso!`)
                }
                
            } else {
                throw new Error("Encomenda nao encontrada!")
    
            }
        } catch (erro) {
            console.log(`\nErro: ${erro.message}`)
        }
    
}

export function listarEncomendasPorStatus() {
    console.log("\n========== LISTAR ENCOMENDAS POR STATUS ==========\n")
    
    try {
        if (encomendas.length === 0) {
            throw new Error("Nao temos encomendas registradas!")
        }

        let statusPesquisado = entradaTexto(
        "Digite o status que deseja filtrar (Entregue/Pendente): "
        )

        if (statusPesquisado.trim() === "") {
            throw new Error("A informacao nao pode ficar vazia!")
        }
        
        if (statusPesquisado.trim().toLowerCase() === "entregue") {
            let entregues = encomendas.filter(encomenda => {
                return encomenda.status === "Entregue"
            })

            if (entregues.length === 0) {
                throw new Error("Nao temos encomendas com o status 'Entregue'!")

            } else {
                console.log("\n========== ENCOMENDAS ENTREGUES ==========\n")
                entregues.forEach(encomenda => {
                    console.log(`ID: ${encomenda.id}`)
                    console.log(`BLOCO: ${encomenda.bloco}`)
                    console.log(`APARTAMENTO: ${encomenda.apartamento}`)
                    console.log(`DESCRICAO: ${encomenda.descricao}`)
                    console.log(`RECEBIDA POR: ${encomenda.recebidaPor}`)
                    console.log(`STATUS: ${encomenda.status}`)
                    console.log("-------------------------------\n")

                })
            }

        } else if (statusPesquisado.trim().toLowerCase() === "pendente") {
            let entregues = encomendas.filter(encomenda => {
                return encomenda.status === "Pendente"
            })

            if (entregues.length === 0) {
                throw new Error("Nao temos encomendas com o status 'Pendentes'!")

            } else {
                console.log("\n========== ENCOMENDAS PENDENTES ==========\n")
                entregues.forEach(encomenda => {
                    console.log(`ID: ${encomenda.id}`)
                    console.log(`BLOCO: ${encomenda.bloco}`)
                    console.log(`APARTAMENTO: ${encomenda.apartamento}`)
                    console.log(`DESCRICAO: ${encomenda.descricao}`)
                    console.log(`RECEBIDA POR: ${encomenda.recebidaPor}`)
                    console.log(`STATUS: ${encomenda.status}`)
                    console.log("-------------------------------\n")

                })

            }
        } else {
            throw new Error("Status invalido!")
        }
    } catch (erro) {
    console.log(`\nErro: ${erro.message}`)
    }
}

  