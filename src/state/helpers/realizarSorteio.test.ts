import React from 'react'
import { realizarSorteio } from './realizarSorteio'

describe('Dado Um Sorteio De Amigo Secreto', () => {

  test('Cada Participante Não Sorteie O Próprio Nome', () => {

    const participantes = [
      'Ana',
      'Catarina',
      'Juliana',
      'Daniel',
      'Mariana',
      'Pedro',
      'Luiz',
      'Carlos',
      'Yuri Alberto',
      'William',
    ]

    const sorteio = realizarSorteio(participantes)
    participantes.forEach(participante => {
      const amigoSecreto = sorteio.get(participante)
      expect(amigoSecreto).not.toEqual(participante)
    })

  
  })
  
})