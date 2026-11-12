import { reservas, moradores } from "./dados.js";
import { entradaTexto } from "./entrada.js";

export function reservarAreaComum() {
    try {
        console.log("\n========== RESERVAR AREA COMUM ==========\n");

        const idMorador = Number(entradaTexto("Digite o ID do morador: "));
        const morador = moradores.find(m => m.id === idMorador);

        if (!morador) {
            throw new Error("Morador nao encontrado!");
        }

        console.log("\nAreas disponiveis:");
        console.log("1 - Salao de festas");
        console.log("2 - Churrasqueira");
        const opcaoArea = entradaTexto("Escolha a area (1 ou 2): ");

        let areaEscolhida = "";
        if (opcaoArea === "1") {
            areaEscolhida = "Salao de festas";
        } else if (opcaoArea === "2") {
            areaEscolhida = "Churrasqueira";
        } else {
            throw new Error("Area invalida!");
        }

        const data = entradaTexto("Digite a data da reserva (DD/MM/AAAA): ").trim();
        if (!data) {
            throw new Error("A data da reserva e obrigatoria!");
        }

        // Verifica se ja existe reserva ativa na mesma area e data
        const reservaConflitante = reservas.find(
            r => r.area === areaEscolhida && r.data === data && r.status === "Ativa"
        );

        if (reservaConflitante) {
            throw new Error(`Ja existe uma reserva ativa para ${areaEscolhida} na data ${data}!`);
        }

        const novoId = reservas.length > 0 ? Math.max(...reservas.map(r => r.id)) + 1 : 1;

        const novaReserva = {
            id: novoId,
            idMorador: morador.id,
            moradorNome: morador.nome,
            area: areaEscolhida,
            data: data,
            status: "Ativa"
        };

        reservas.push(novaReserva);
        console.log(`\nReserva #${novoId} confirmada para ${morador.nome} (${areaEscolhida} - ${data})!`);

    } catch (erro) {
        console.log(`\nErro: ${erro.message}`);
    }
}

export function listarReservas() {
    try {
        if (reservas.length === 0) {
            throw new Error("Nao ha reservas cadastradas!");
        }

        console.log("\n========== LISTA DE RESERVAS ==========\n");

        reservas.forEach(reserva => {
            const morador = moradores.find(m => m.id === reserva.idMorador);
            const nomeMorador = morador ? morador.nome : (reserva.moradorNome || "Nao identificado");

            console.log(`ID RESERVA: ${reserva.id}`);
            console.log(`MORADOR: ${nomeMorador}`);
            console.log(`AREA: ${reserva.area}`);
            console.log(`DATA: ${reserva.data}`);
            console.log(`STATUS: ${reserva.status}`);
            console.log("-----------------------\n");
        });

    } catch (erro) {
        console.log(`\nErro: ${erro.message}`);
    }
}

export function cancelarReserva() {
    try {
        const ativas = reservas.filter(r => r.status === "Ativa");

        if (ativas.length === 0) {
            throw new Error("Nao ha reservas ativas para cancelar!");
        }

        console.log("\n========== CANCELAR RESERVA ==========\n");
        ativas.forEach(r => {
            console.log(`ID: ${r.id} | Area: ${r.area} | Data: ${r.data}`);
        });

        const idReserva = Number(entradaTexto("\nDigite o ID da reserva que deseja cancelar: "));
        const reserva = reservas.find(r => r.id === idReserva);

        if (!reserva) {
            throw new Error("Reserva nao encontrada!");
        }

        if (reserva.status === "Cancelada") {
            throw new Error("Esta reserva ja esta cancelada!");
        }

        reserva.status = "Cancelada";
        console.log(`\nReserva #${reserva.id} (${reserva.area} - ${reserva.data}) cancelada com sucesso!`);

    } catch (erro) {
        console.log(`\nErro: ${erro.message}`);
    }
}