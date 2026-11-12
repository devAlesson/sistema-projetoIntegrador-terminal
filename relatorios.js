import { moradores, encomendas, reservas,  } from "./dados.js";

export function relatorioGeral() {
    let totalDeMoradores = moradores.length
    let totalProprietarios = 0
    let totalInquilinos = 0

    let totalReservasAtivas = 0
    let totalReservasCanceladas = 0

    let totalEncomendasPendentes = 0
    let totalEncomendasEntregues = 0

    moradores.forEach(morador => {
        if (morador.tipo === "Proprietario") {
            totalProprietarios += 1;
        }
        if (morador.tipo === "Inquilino") {
            totalInquilinos += 1;
        }
    })

    reservas.forEach(reserva => {
        if (reserva.status === "Ativa") {
            totalReservasAtivas += 1;

        }
        if (reserva.status === "Cancelada") {
            totalReservasCanceladas += 1;
        }
    })

    encomendas.forEach(encomenda => {
        if (encomenda.status === "Pendente") {
            totalEncomendasPendentes += 1;
        }

        if (encomenda.status === "Entregue") {
            totalEncomendasEntregues += 1;
        }
    })

    console.log("\n========== RELATORIO GERAL ==========\n")
    console.log(`TOTAL DE MORADORES: ${totalDeMoradores}`)
    console.log(`PROPRIETARIOS: ${totalProprietarios}`)
    console.log(`INQUILINOS: ${totalInquilinos}`)
    console.log("---------------------------\n")
    
    console.log(`TOTAL DE RESERVAS EM AREAS COMUNS: ${reservas.length}`)
    console.log(`RESERVAS ATIVAS: ${totalReservasAtivas}`)
    console.log(`RESERVAS CANCELADAS: ${totalReservasCanceladas}`)
    console.log("---------------------------\n")
    
    console.log(`TOTAL DE ENCOMENDAS: ${encomendas.length}`)
    console.log(`ENCOMENDAS PENDENTES: ${totalEncomendasPendentes}`)
    console.log(`ENCOMENDAS ENTREGUES: ${totalEncomendasEntregues}`)
    console.log("---------------------------\n")

}

export function relatorioReservasPorArea() {
    let reservasAtivasSalaoFestas = 0
    let reservasAtivaChurrasqueira = 0

    reservas.forEach(reserva => {
        if (reserva.area === "Salao de festas" && reserva.status === "Ativa") {
            reservasAtivasSalaoFestas += 1;
        }
        if (reserva.area === "Churrasqueira" && reserva.status === "Ativa") {
            reservasAtivaChurrasqueira += 1;
        }
    })
    try {

        if (reservas.length === 0) {
            throw new Error("Nao temos reservas cadastradas!")
        }
        console.log("\n========== RELATORIO DE RESERVAS ==========\n")
    
        console.log(`TOTAL DE RESERVAS ATIVAS NO SALAO DE FESTA: ${reservasAtivasSalaoFestas}`)
        console.log(`TOTAL DE RESERVAS ATIVAS NA CHURRASQUEIRA: ${reservasAtivaChurrasqueira}`)
    
        console.log("\n------ LISTA DE DATAS POR AREA ------\n")
        reservas.forEach(reserva => {
            if (reserva.area === "Salao de festas" && reserva.status === "Ativa") {
                console.log(`AREA: ${reserva.area}`)
                console.log(`DATA: ${reserva.data}`)
                console.log("-----------------------\n")
            }
        })
    
        reservas.forEach(reserva => {
            if (reserva.area === "Churrasqueira" && reserva.status === "Ativa") {
                console.log(`AREA: ${reserva.area}`)
                console.log(`DATA: ${reserva.data}`)
                console.log("-----------------------\n")
            }
        })
    } catch (erro) {
        console.log(`\nErro: ${erro.message}`)
    }
}

export function relatorioEncomendasPendentes() {
    let totalEncomendasPendentes = 0
    console.log("\n========== RELATORIO DE ENCOMENDAS PENDENTES ==========\n")
    encomendas.forEach(encomenda => {
        if (encomenda.status === "Pendente") {
            console.log(`BLOCO: ${encomenda.bloco}`)
            console.log(`APARTAMENTO: ${encomenda.apartamento}`)
            console.log(`DESCRICAO: ${encomenda.descricao}`)
            console.log(`QUEM RECEBEU: ${encomenda.recebidaPor}`)
            console.log("---------------------------\n")
            totalEncomendasPendentes += 1;
        }
    })
    console.log(`TOTAL DE ENCOMENDAS PENDENTES: ${totalEncomendasPendentes}`)
}
