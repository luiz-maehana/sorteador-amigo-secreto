import React from 'react'
import { render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import { useListaDeParticipantes } from '../../state/hooks/useListaDeParticipantes'
import Sorteio from '.'

jest.mock('../../state/hooks/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
})  

describe('A Página de Sorteio', () => {

  const participantes = ['Ana', 'Catarina', 'João']
  
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
  })

  test('Todos os Participantes Podem Exibir O Seu Amigo Secreto', () => {

    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    )

    const opcoes = screen.queryAllByRole('option')
  
    expect(opcoes).toHaveLength(participantes.length)
  
  })
  
})