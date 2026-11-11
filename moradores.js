import { entradaNumero, entradaTexto } from "./entrada.js";
import { moradores } from "./dados.js";

export function cadastrarMorador() {
    console.log("\n========== CADASTRO DE MORADOR ==========\n")
    while (true) {

        let nome = entradaTexto(
            "\nDigite o nome do novo morador: "
        )
        let bloco = entradaTexto(
            "Qual bloco: "
        )
        let apartamento = entradaNumero(
            "Qual apartamento: "
        )
        let telefone = entradaTexto(
            "Informe o telefone nesse formato (91 99999-0002): "
        )
        console.log(telefone.length)
        let tipo = entradaTexto(
            "Tipo (Proprietario/Inquilino): "
        )
    
        try {
            if (nome.trim() === "" || bloco.trim() === "" || telefone.trim() === "" || tipo.trim() === "") {
                throw new Error("Todas as informacoes devem ser preenchidas!")
            }
            if (!Number.isInteger(apartamento)) {
                throw new Error("Numero de apartamento invalido!")
            }
            if (telefone.trim().length < 13 || telefone.trim(). length > 13) {
    
                throw new Error("O formato do telefone esta invalido!")
    
            }
            if (tipo.trim().toLowerCase() === "proprietario") {
                tipo = "Proprietario"
    
            } else if (tipo.trim().toLowerCase() === "inquilino") {
                tipo = "Inquilino"
            } else {
                throw new Error("Tipo de morador invalido!")
            }
            moradores.push({
                id: moradores.length + 1,
                nome: nome,
                bloco: bloco,
                apartamento: apartamento,
                telefone: telefone,
                tipo: tipo
            })
            console.log("\nMorador cadastrado com sucesso!")
            break;
    
        } catch (erro) {
            console.log(`\nErro Ao Cadastrar: ${erro.message}`)
        }
    }
}


export function listarMoradores() {

    console.log("\n========== LISTA DE MORADORES ==========\n")

    try {
        if (moradores.length === 0) {
            throw new Error("Nao temos moradores cadastrados!")

        }

        moradores.forEach(morador => {
            console.log(`ID: ${morador.id}`)
            console.log(`NOME: ${morador.nome}`)
            console.log(`BLOCO: ${morador.bloco}`)
            console.log(`APARTAMENTO: ${morador.apartamento}`)
            console.log(`TELEFONE: ${morador.telefone}`)
            console.log(`TIPO: ${morador.tipo}`)
            console.log("------------------------\n")
        })
    } catch (erro) {
        console.log(`\nErro ao listar: ${erro.message}`)
    }

}

cadastrarMorador()
listarMoradores()