import { fazerLogin } from "./login.js";
import { entradaTexto } from "./entrada.js";
import { 
    registarEncomenda, entregarEncomenda, listarEncomendasPorStatus} from "./encomendas.js";
import {
    cadastrarMorador, listarMoradores, buscarMoradorPorId,
} from "./moradores.js"

import {
    relatorioGeral, relatorioReservasPorArea, relatorioEncomendasPendentes
} from "./relatorios.js"
import { reservarAreaComum, listarReservas, cancelarReserva } from "./reservas.js";


let usuarioQueEntrou = fazerLogin()

let escolha = ""
let controleWhile = true
while (controleWhile) {

    if (usuarioQueEntrou.perfil === "Sindico") {
        console.log("\n==================================")
        console.log("=      GESTAO DE CONDOMINIO      =")
        console.log("\n==================================")
        console.log("============== MENU ==============\n")
        console.log(`============ OlÁ ${usuarioQueEntrou.nome.toUpperCase()} ============\n`)
    
        console.log("1 - Cadastrar morador")
        console.log("2 - Listar moradores")
        console.log("3 - Buscar morador por ID")
        console.log("4 - Reservar area comum")
        console.log("5 - Listar reservas")
        console.log("6 - Cancelar reserva")
        console.log("7 - Registrar encomenda")
        console.log("8 - Entregar encomenda")
        console.log("9 - Listar encomendas por status")
        console.log("10 - Relatorio geral")
        console.log("11 - Relatorio de reservas por area")
        console.log("12 - Relatorio de encomendas pendentes")
        console.log("0 - Sair")
    
        escolha = entradaTexto("\nEscolha uma opcao: ")
    
    } else {
         console.log("\n==================================")
        console.log("============== MENU ==============\n")
        console.log(`============ OLÁ ${usuarioQueEntrou.nome.toUpperCase()} ============\n`)
    
        console.log("2 - Listar moradores")
        console.log("3 - Buscar morador por ID")
        console.log("7 - Registrar encomenda")
        console.log("8 - Entregar encomenda")
        console.log("9 - Listar encomendas por status")
        console.log("12 - Relatorio de encomendas pendentes")
        console.log("0 - Sair")
    
        escolha = entradaTexto("\nEscolha uma opcao: ")
    
    }

    switch (escolha) {
        case "1":
            if (usuarioQueEntrou.perfil === "Porteiro") {
                console.log("\nAcesso nao permitido para o seu perfil!")
                break;
            } else {
                cadastrarMorador()
                break;
            }

        case "2":
            listarMoradores()
            break;

        case "3":
            buscarMoradorPorId()
            break;

        case "4":
            if (usuarioQueEntrou.perfil === "Porteiro") {
                console.log("\nAcesso nao permitido para o seu perfil!")
                break;
            } else {
                reservarAreaComum()
                break;
            }
        
        case "5":
            if (usuarioQueEntrou.perfil === "Porteiro") {
                console.log("\nAcesso nao permitido para o seu perfil!")
                break;
            } else {
                listarReservas()
                break;
            }

        case "6":
            if (usuarioQueEntrou.perfil === "Porteiro") {
                console.log("\nAcesso nao permitido para o seu perfil!")
                break;
            } else {
                cancelarReserva()
                break;
            }
        case "7":
            registarEncomenda(usuarioQueEntrou.nome)
            break;

        case "8":
            entregarEncomenda()
            break;

        case "9":
            listarEncomendasPorStatus()
            break;

        case "10":
            if (usuarioQueEntrou.perfil === "Porteiro") {
                console.log("\nAcesso nao permitido para o seu perfil!")
                break;
            } else {
                relatorioGeral()
                break;
            }

        case "11":
            if (usuarioQueEntrou.perfil === "Porteiro") {
                console.log("\nAcesso nao permitido para o seu perfil!")
                break;
            } else {
                relatorioReservasPorArea()
                break;
            }

        case "12":
            relatorioEncomendasPendentes()
            break;

        case "0":
            console.log("Finalizando o sistema...")

            controleWhile = false
            break;

        default:
            console.log("opcao invalida")
            break;
            

        
    }
}
