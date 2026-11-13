import { entradaNumero, entradaTexto } from "./entrada.js";
import { moradores } from "./dados.js";

export function cadastrarMorador() {
    console.log("\n========== CADASTRO DE MORADOR ==========\n")

    //Nome correto?
    let nome
    while (true) {
        try {
            nome = entradaTexto(
                "\nDigite o nome do novo morador: "
            )
            if (nome.trim() === "") {
                 throw new Error("O nome deve ser preenchido!")
            }
              break
        } catch (erro) {
            console.log(`\nErro Ao Cadastrar: ${erro.message}`)
        }
    }

   // Você só pode adicionar A ou B
    let bloco
    while (true) {
        try {
            // Voce pode adicionar só a ou b
            bloco = entradaTexto(
                "Qual bloco: "
            )
            bloco = bloco.trim().toUpperCase()
            if (bloco !== "A" && bloco !== "B") {
                 throw new Error("Bloco inválido! Digite apenas A ou B.")
            }
            break
        } catch (erro) {
            console.log(`\nErro Ao Cadastrar: ${erro.message}`)
        }
    }

   //---------------------------------------------------------------------- Até 3 digitos
    let apartamento
    while (true) {
        try {
            // Até 3 digitos
            apartamento = entradaNumero(
                "Qual apartamento: "
            )
            if (!Number.isInteger(apartamento) || apartamento <= 0 || apartamento > 999) {
                throw new Error("Numero de apartamento invalido!")
            }

            let existeMorador = moradorExiste(bloco, apartamento)

            if (existeMorador) {
                throw new Error("Ja existe um morador nesse bloco e apartamento!")
            }
            break
        } catch (erro) {
            console.log(`\nErro Ao Cadastrar: ${erro.message}`)
        }
    }
         //----------------------------------------------------------------------
    let telefone
    while (true) {
        try {
            telefone = entradaTexto(
                "Informe o telefone nesse formato (91 99999-0000): "
            )
            if (telefone.trim().length < 13 || telefone.trim().length > 13) {
                throw new Error("O formato do telefone esta invalido!")
            }
            break
        } catch (erro) {
            console.log(`\nErro Ao Cadastrar: ${erro.message}`)
        }
    }

    //----------------------------------------------------------------------
    let tipo
    while (true) {
        try {
            tipo = entradaTexto(
                "Tipo (Proprietario/Inquilino): "
            )
            if (tipo.trim().toLowerCase() === "proprietario") {
                tipo = "Proprietario"
            } else if (tipo.trim().toLowerCase() === "inquilino") {
                tipo = "Inquilino"
            } else {
                throw new Error("Tipo de morador invalido!")
            }
            break
        } catch (erro) {
            console.log(`\nErro Ao Cadastrar: ${erro.message}`)
        }
    }

    //----------------------------------------------------------------------
    moradores.push({
        id: moradores.length + 1,
        nome: nome,
        bloco: bloco,
        apartamento: apartamento,
        telefone: telefone,
        tipo: tipo
    })
    console.log("\nMorador cadastrado com sucesso!")
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

export function buscarMoradorPorId(){
    console.log("\n========== BUSCAR MORADOR POR ID ==========\n")
    try {
        if (moradores.length === 0) {
            throw new Error("Nao temos moradores cadastrados!")
        }

        let idPesquisa = entradaNumero(
            "Digite o id do morador que deseja pesquisar: "
        )

        if (!Number.isInteger(idPesquisa) || idPesquisa <= 0) {
            throw new Error("Id invalido!")
        }
        let resultadoPesquisa = moradores.find(morador => {
            return morador.id === idPesquisa
        })
        if (resultadoPesquisa) {
            console.log("\n========== MORADOR ENCONTRADO ===========\n")
            console.log(`ID: ${resultadoPesquisa.id}`)
            console.log(`NOME: ${resultadoPesquisa.nome}`)
            console.log(`BLOCO: ${resultadoPesquisa.bloco}`)
            console.log(`APARTAMENTO: ${resultadoPesquisa.apartamento}`)
            console.log(`TELEFONE: ${resultadoPesquisa.telefone}`)
            console.log(`TIPO: ${resultadoPesquisa.tipo}`)
            console.log("------------------------\n")
            
        } else {
            throw new Error("Morador nao encontrado pelo ID informado!")
        }

    } catch (erro) {
        console.log(`\nErro: ${erro.message}`)
    }
}

export function moradorExiste (bloco, apartamento) {
    let existeOuNao = moradores.some(morador => {
        return morador.bloco === bloco && morador.apartamento === apartamento
    })
    return existeOuNao
}