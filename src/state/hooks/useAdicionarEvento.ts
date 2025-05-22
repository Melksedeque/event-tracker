import { useSetRecoilState } from "recoil"
import { IEvento } from "../../interfaces/IEvento"
import { listaDeEventosState } from "../atom"
import { generateId } from "../../util"

const useAdicionarEvento = () => {
    const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState)

    return (evento: IEvento) => {
        const hoje = new Date()
        const eventoEstaNoPassado = evento.inicio < hoje

        if (eventoEstaNoPassado) {
            throw new Error('Não é possível adicionar eventos no passado')
        }

        evento.id = generateId()
        setListaDeEventos(listaAntiga => [...listaAntiga, evento])
    }
}

export default useAdicionarEvento