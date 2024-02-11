import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes"

const Sorteio = () => {

  const participantes = useListaDeParticipantes()

  return (
    <section>
      <form>
        <select name='participanteDaVez' id='participanteDaVez'>
          {participantes.map(participante => (
            <option key={participante} value={participante}>{participante}</option>
          ))}
        </select>
      </form>
    </section>
  )
}

export default Sorteio