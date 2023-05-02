import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testes About', () => {
  it('Teste se a página contém as informações sobre a Pokédex;', () => {
    renderWithRouter(<About />);

    const firstP = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    const secondP = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);

    expect(firstP).toBeInTheDocument();
    expect(secondP).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', { name: /about pokédex/i });

    expect(title).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragraphs = screen.getAllByText(/Pokémon/i);
    expect(paragraphs).toHaveLength(2);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img', { name: /pokédex/i });
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
