import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import Rodape from '.'
import { useListaDeParticipantes } from '../../state/hooks/useListaDeParticipantes'

jest.mock('../../state/hooks/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
})

const mockNavegacao = jest.fn()
const mockSorteio = jest.fn()

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavegacao
  }
})

jest.mock('../../state/hooks/useSorteador', () => {
  return {
    useSorteador: () => mockSorteio
  }
})

describe('Quando Não Existem Participantes Suficientes', () => {

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([])
  })

  test('A Brincandeira Não Pode Ser Iniciada', () => {

    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    )
  
    const botao = screen.getByRole('button')
    expect(botao).toBeDisabled()
  
  })
  
})

describe('Quando Existem Participantes Suficientes', () => {

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(['Ana', 'Catarina', 'João'])
  })

  test('A Brincandeira Pode Ser Iniciada', () => {

    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    )
  
    const botao = screen.getByRole('button')
    expect(botao).not.toBeDisabled()
  
  })

  test('A Brincandeira Foi Iniciada', () => {

    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    )
  
    const botao = screen.getByRole('button')
    fireEvent.click(botao)

    expect(mockNavegacao).toHaveBeenCalledTimes(1)
    expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
    expect(mockSorteio).toHaveBeenCalledTimes(1)
  
  })
  
})