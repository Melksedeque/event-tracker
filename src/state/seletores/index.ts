import { selector } from 'recoil';
import { filtroDeEventos, listaDeEventosState } from '../atom';
import { IEvento } from '../../interfaces/IEvento';

export const eventosFiltradosState = selector({
  key: 'eventosFiltradosState',
  get: ({ get }) => {
    const filtro = get(filtroDeEventos);
    const todosOsEventos = get(listaDeEventosState);

    const eventos = todosOsEventos.filter((evento) => {
      if (!filtro.data) {
        return true;
      }
      const mesmoDia =
        filtro.data.toISOString().slice(0, 10) ===
        evento.inicio.toISOString().slice(0, 10);
      return mesmoDia;
    });

    return eventos;
  },
});

export const eventosAsync = selector({
  key: 'eventosAsync',
  get: async () => {
    const resposta = await fetch('http://localhost:8080/eventos');
    const eventos: IEvento[] = await resposta.json();
    return eventos.map(evento => ({
      ...evento,
      inicio: new Date(evento.inicio),
      fim: new Date(evento.fim),
    }));
  },
});
