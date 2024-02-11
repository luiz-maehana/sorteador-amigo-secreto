import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import { useListaDeParticipantes } from '../../state/hooks/useListaDeParticipantes'
import Sorteio from '.'
import { useResultadoDoSorteio } from '../../state/hooks/useResultadoDoSorteio'

jest.mock('../../state/hooks/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
})

jest.mock('../../state/hooks/useResultadoDoSorteio', () => {
  return {
    useResultadoDoSorteio: jest.fn()
  }
})

describe('A Página de Sorteio', () => {

  const participantes = ['Ana', 'Catarina', 'João']

  const resultado = new Map([
    ['Ana', 'Catarina'],
    ['Catarina', 'João'],
    ['João', 'Ana'],
  ])

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoDoSorteio as jest.Mock).mockReturnValue(resultado);
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

  test('O Amigo Secreto É Exibido Quando Solicitado', () => {

    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    )

    const select = screen.getByPlaceholderText('Selecione O Seu Nome')

    fireEvent.change(select, {
      target: {
        value: participantes[0]
      }
    })

    const botao = screen.getByRole('button')
    fireEvent.click(botao)

    const amigoSecreto = screen.getByRole('alert')
    expect(amigoSecreto).toBeInTheDocument()

  })

})