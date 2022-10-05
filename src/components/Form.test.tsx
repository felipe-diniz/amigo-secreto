import { act, fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Form from './Form';

describe('O comportamento do Form.tsx', () => {

  test('quando o imput está vazio, novos participantes não podem ser adicionados', () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );
  
    //encontrar no dom o input
    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes'
    );
  
    //encotrar o botao
    const botao = screen.getByRole('button');
  
    // garantir que o input esteja no documento
    expect(input).toBeInTheDocument();
  
    //garantir que o botão esteja desabilitado
    expect(botao).toBeDisabled();
  });
  
  test('adicionar um participante caso exista um nome preenchido', () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );
  
    //encontrar no dom o input
    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes'
    );
    //encotrar o botao
    const botao = screen.getByRole('button');
  
    //inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: 'Felipe',
      },
    });
    //clicar no botao de submeter
    fireEvent.click(botao);
  
    //garantir que o input esteja com o foco ativo
    expect(input).toHaveFocus();
  
    //garantir que o input não tenha um valor
    expect(input).toHaveValue('');
  });
  
  test('nomes duplicados não podem ser adicionados na lista', () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );
  
    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes'
    );
    const botao = screen.getByRole('button');
  
    fireEvent.change(input, {
      target: {
        value: 'Felipe',
      },
    });
    fireEvent.click(botao);
  
    fireEvent.change(input, {
      target: {
        value: 'Felipe',
      },
    });
    fireEvent.click(botao);
  
    const mensagemDeErro = screen.getByRole('alert');
  
    expect(mensagemDeErro.textContent).toBe(
      'Nomes duplicados não são permitidos!'
    );
  });
  
  test('a mensagem de erro deve sumir após os timers', () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    );
  
    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes'
    );
    const botao = screen.getByRole('button');
  
    fireEvent.change(input, {
      target: {
        value: 'Felipe',
      },
    });
    fireEvent.click(botao);
  
    fireEvent.change(input, {
      target: {
        value: 'Felipe',
      },
    });
    fireEvent.click(botao);
    let mensagemDeErro = screen.queryByRole('alert');
    expect(mensagemDeErro).toBeInTheDocument();
  
    act(() => {
      jest.runAllTimers();
    });
  
    mensagemDeErro = screen.queryByRole('alert');
    expect(mensagemDeErro).toBeNull();
  });

})


