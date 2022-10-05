import realizarSorteio from "./realizarSorteio";

describe('dado um sorteio de amigo secreto', () => {
  test('cada participante não sorteio o próprio nome', () => {

    const participantes = [
      'Felipe',
      'Júlia',
      'Ana',
      'Catarina',
      'Juliana',
      'João',
      'Vinicios',
      'Nathália',
    ];

    const sorteio = realizarSorteio(participantes)
    participantes.forEach(participante => {
      const amigoSecreto = sorteio.get(participante)
      expect(amigoSecreto).not.toEqual(participante)
    })

  });
});
