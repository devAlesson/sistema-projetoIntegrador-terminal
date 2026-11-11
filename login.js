import { entradaTexto, perguntarSenha } from "./entrada.js";
import { usuarios } from "./dados.js";


export function fazerLogin() {
    console.log("\n==================================")
    console.log("=      GESTAO DE CONDOMINIO      =")
    console.log("==================================\n")
    console.log("============== LOGIN ==============\n")
   
    while (true) {

        let usuario = entradaTexto(
            "\nDigite seu nome de usuario: "
        )
        let senha = perguntarSenha(
            "Digite sua senha: "
        )
    
        try {
            if (usuario.trim() === "" || senha.trim() === "") {
                throw new Error("O nome de usuario e senha nao podem ficar vazio!")
            }
            
            let autenticacao = validarUsuario(usuario, senha)
            if (autenticacao) {
                return autenticacao
            } else {
                throw new Error("Nome de usuario ou senha incorretos! Tente novamente!")
            }
            
        } catch (erro) {
            console.log(`\nErro: ${erro.message}`)
        }
    }



}

export function validarUsuario(nomeUsuario, senha) {
    let verificacao = usuarios.find(usuario => {
        if (usuario.usuario === nomeUsuario && usuario.senha === senha) {
            return usuario
        }            
        
    })
    return verificacao
}

