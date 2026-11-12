
import { existeMorador } from './moradores.js';

import { perguntar, perguntarOpcao } from './utils.js'; 

export const reservas = [];
let proximoId = 1;



function validarData(data) {
    if (!data || data.length !== 10) return false;
    if (data[2] !== '/' || data[5] !== '/') return false;

    const partes = data.split('/');
    const dia = Number(partes[0]);
    const mes = Number(partes[1]);
    const ano = Number(partes[2]);

    if (isNaN(dia) || isNaN(mes) || isNaN(ano)) return false;
    if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 2000) return false;

    return true;
}

export function reservarArea() {
    const opcoesAreas = ['Salão de Festas', 'Churrasqueira', 'Quadra Poliesportiva', 'Piscina'];
    const area = perguntarOpcao('Escolha a área comum:', opcoesAreas);
    
    const data = perguntar('Data da reserva (DD/MM/AAAA): ').trim();
    if (!validarData(data)) {
        console.log('Erro: Data inválida. Utilize o formato DD/MM/AAAA.');
        return;
    }

    const bloco = perguntar('Bloco: ').trim();
    const apartamento = perguntar('Apartamento: ').trim();

  
    if (!existeMorador(bloco, apartamento)) {
        console.log('Erro: Não há morador cadastrado neste bloco e apartamento.');
        return;
    }

    const conflito = reservas.some(
        (r) => r.area === area && r.data === data && r.status === 'Ativa'
    );

    if (conflito) {
        console.log(`Erro: Já existe uma reserva ativa para "${area}" na data ${data}.`);
        return;
    }

    const novaReserva = {
        id: proximoId++,
        area,
        data,
        bloco,
        apartamento,
        status: 'Ativa'
    };

    reservas.push(novaReserva);
    console.log(`Reserva realizada com sucesso! ID da reserva: ${novaReserva.id}`);
}

export function listarReservas() {
    if (reservas.length === 0) {
        console.log('Nenhuma reserva cadastrada.');
        return;
    }

    console.log('\n--- Lista de Reservas ---');
    reservas.forEach((reserva) => {
        console.log(
            `ID: ${reserva.id} | Área: ${reserva.area} | Data: ${reserva.data} | Bloco: ${reserva.bloco} - Apto: ${reserva.apartamento} | Status: ${reserva.status}`
        );
    });
    console.log('-------------------------\n');
}

export function cancelarReserva(id) {
    const reserva = reservas.find((r) => r.id === Number(id));

    if (!reserva) {
        console.log('Reserva nao encontrada');
        return;
    }

    if (reserva.status === 'Cancelada') {
        console.log('Essa reserva ja esta cancelada');
        return;
    }

    reserva.status = 'Cancelada';
    console.log(`Reserva ID ${reserva.id} cancelada com sucesso.`);
}