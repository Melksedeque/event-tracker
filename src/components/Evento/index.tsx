import React from 'react';
import { IEvento } from '../../interfaces/IEvento';
import style from './Evento.module.scss';
import EventoCheckbox from './EventoCheckbox';
import { listaDeEventosState } from '../../state/atom';
import { useSetRecoilState } from 'recoil';

const Evento: React.FC<{ evento: IEvento }> = ({ evento }) => {
  const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);
  const excluirEvento = () => {
    setListaDeEventos((listaAntiga) =>
      listaAntiga.filter((evt) => evt.id !== evento.id)
    );
  };

  const estilos = [style.Evento];

  if (evento.completo) {
    estilos.push(style.completo);
  }

  return (
    <div className={estilos.join(' ')}>
      <EventoCheckbox evento={evento} />
      <div className="cards-info">
        <h3 className={style.descricao}>
          {evento.descricao} - {evento.inicio.toLocaleDateString()}
        </h3>
      </div>
      <i className="far fa-times-circle fa-2x" onClick={excluirEvento}></i>
    </div>
  );
};

export default Evento;
