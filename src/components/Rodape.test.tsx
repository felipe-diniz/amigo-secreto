import { fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes"
import Rodape from "./Rodape"

jest.mock('../state/hooks/useListaDeParticipantes',() => {
  return {
    useListaDeParticipantes: jest.fn()
  }
}) 

const MockNavegacao = jest.fn()
const MockSorteio = jest.fn()

jest.mock('../state/hooks/useSorteador.tsx', () => {
  return {
    useSorteador: () => MockSorteio
  }
})
jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => MockNavegacao
  }
})

describe('onde não existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([])
  })
  test('a brincadeira não pode ser iniciada', () => {
    render(<RecoilRoot>
      <Rodape />
    </RecoilRoot>)

    const botao = screen.getByRole('button')

    expect(botao).toBeDisabled()
  })
})

describe('quando existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(['Ana', 'Catarina', 'Josefina'])
  })
  test('a brincadeira pode ser iniciada', () => {
    render(<RecoilRoot>
      <Rodape />
    </RecoilRoot>)

    const botao = screen.getByRole('button')

    expect(botao).not.toBeDisabled()
  })
  test('a brincadeira foi iniciada', () => {
    render(<RecoilRoot>
      <Rodape />
    </RecoilRoot>)

    const botao = screen.getByRole('button')
    fireEvent.click(botao)

    expect(botao).not.toBeDisabled()

    expect(MockNavegacao).toHaveBeenCalledTimes(1)
    expect(MockNavegacao).toHaveBeenCalledWith('/sorteio')
    expect(MockSorteio).toHaveBeenCalledTimes(1)
  })
})