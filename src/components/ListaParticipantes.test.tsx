import React from 'react'
import { render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import ListaDeParticipantes from './ListaDeParticipantes'
import { useListaDeParticipantes } from '../state/hooks/useListaDeParticipantes'

jest.mock('../state/hooks/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
})

describe('O Comportamento da Lista Vazia de Participante', () => {

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([])
  })

  test('Uma lista vazia de Participantes', () => {

    render(
      <RecoilRoot>
        <ListaDeParticipantes />
      </RecoilRoot>
    )
  
    const itens = screen.queryAllByRole('listitem')
    expect(itens).toHaveLength(0)
  
  })
})

describe('O Comportamento da Lista Preenchida de Participante', () => {

  const participantes = ['Ana', 'Catarina']

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
  })

  test('Uma lista preenchida de Participantes', () => {

    render(
      <RecoilRoot>
        <ListaDeParticipantes />
      </RecoilRoot>
    )
  
    const itens = screen.queryAllByRole('listitem')
    expect(itens).toHaveLength(participantes.length)
  
  })
})