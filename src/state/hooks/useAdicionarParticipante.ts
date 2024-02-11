import { useRecoilValue, useSetRecoilState } from "recoil"
import { erroState, listaDeParticipantesState } from "../atom"

export const useAdicionarParticipante = () => {

  const setLista = useSetRecoilState(listaDeParticipantesState)
  const lista = useRecoilValue(listaDeParticipantesState)
  const setErro = useSetRecoilState(erroState)

  return (nomeDoParticipante: string) => {
    if (lista.includes(nomeDoParticipante)) {
      setErro('Nomes Duplicados Não São Permitidos!')
      setTimeout(() => {
        setErro('')
      }, 5000)
      return
    }
    return setLista(listaAtual => [...listaAtual, nomeDoParticipante])
  }
}