import { selector } from 'recoil';
import { filtroDeEventos, listaDeEventosState } from '../atom';

const eventosFiltradosState = selector({
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

export default eventosFiltradosState;
