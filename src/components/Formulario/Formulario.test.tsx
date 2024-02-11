import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import Formulario from '.'
import { RecoilRoot } from 'recoil'

describe('O Comportamento do Formulario.tsx', () => {

  test('Quando o Input está Vazio, Novos participantes não podem ser adicionados', () => {

    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )
  
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')
  
    expect(input).toBeInTheDocument()
    expect(botao).toBeDisabled()
  
  })
  
  test('Adicionar um participante caso exista um nome preenchido', () => {
  
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )
  
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')
  
    fireEvent.change(input, {
      target: {
        value: 'Ana'
      }
    })
  
    fireEvent.click(botao)
  
    expect(input).toHaveFocus()
    expect(input).toHaveValue('')
  
  })
  
  test('Nomes Duplicados Não Podem Ser Adicionados Na Lista', () => {
  
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )
  
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')
  
    fireEvent.change(input, {
      target: {
        value: 'Ana'
      }
    })
    fireEvent.click(botao)
    fireEvent.change(input, {
      target: {
        value: 'Ana'
      }
    })
    fireEvent.click(botao)
  
    const mensagemDeErro = screen.getByRole('alert')
    expect(mensagemDeErro.textContent).toBe('Nomes Duplicados Não São Permitidos!')
  
  })
  
  test('A Mensagem de Erro Deve Sumir Após os Timers', () => {
  
    jest.useFakeTimers()
  
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )
  
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')
  
    fireEvent.change(input, {
      target: {
        value: 'Ana'
      }
    })
    fireEvent.click(botao)
    fireEvent.change(input, {
      target: {
        value: 'Ana'
      }
    })
    fireEvent.click(botao)
    let mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).toBeInTheDocument()
  
    act(() => {
      jest.runAllTimers()
    })
  
    mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).toBeNull()
  
  })
})