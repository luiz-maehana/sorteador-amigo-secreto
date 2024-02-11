import React from 'react'
import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import Configuracao from './Configuracao'

const mockNavegacao = jest.fn()

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavegacao
  }
})

describe('A Página de Configuração', () => {

  test('Deve Ser Renderizada Corretamente', () => {

    const { container } = render(
      <RecoilRoot>
        <Configuracao />
      </RecoilRoot>
    )
  
    expect(container).toMatchSnapshot()
  
  })
  
})