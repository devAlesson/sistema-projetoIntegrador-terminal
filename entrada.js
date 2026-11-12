import entrada from "readline-sync"

export function entradaTexto(mensagem) {
    return entrada.question(mensagem)
}

export function entradaNumero(mensagem) {
    return Number(entrada.question(mensagem))
}

export function perguntarSenha(mensagem) {
    return entrada.question(mensagem, {hideEchoBack: true})
}

