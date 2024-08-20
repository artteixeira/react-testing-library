import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PokemonDetails from '../pages/PokemonDetails';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const match = { params: { id: '25' } };

describe('Testes PokemonDetails', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<PokemonDetails
      match={ match }
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ false }
    />);

    const titleDetails = screen.getByRole('heading', { name: /pikachu details/i });

    const button = screen.queryByRole('link', { name: /more details/i });

    const title = screen.getByRole('heading', { name: /summary/i });

    const summaryText = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);

    expect(titleDetails).toBeInTheDocument();
    expect(button).toBeNull();
    expect(title).toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
    expect(summaryText.innerHTML).toBe(pokemonList[0].summary);
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<PokemonDetails
      match={ match }
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ false }
    />);

    const title = screen.getByRole('heading', { name: /game locations of pikachu/i });

    const locations = screen.getAllByAltText(/location/);
    const locationNameFirst = screen.getByText(/kanto viridian forest/i);
    const locationNameSecond = screen.getByText(/kanto power plant/i);

    expect(title).toBeInTheDocument();
    expect(locations[0]).toBeInTheDocument();
    expect(locations[1]).toBeInTheDocument();
    expect(locationNameFirst).toBeInTheDocument();
    expect(locationNameSecond).toBeInTheDocument();

    expect(pokemonList[0].foundAt.length).toBe(locations.length);
    expect(locationNameFirst.innerHTML).toBe(pokemonList[0].foundAt[0].location);
    expect(locationNameSecond.innerHTML).toBe(pokemonList[0].foundAt[1].location);

    expect(locations[0]).toHaveAttribute('src', pokemonList[0].foundAt[0].map);
    expect(locations[1]).toHaveAttribute('src', pokemonList[0].foundAt[1].map);
  });

  it('Teste se o usuário pode favoritar um Pokémon através da página de detalhes:', () => {
    renderWithRouter(<PokemonDetails
      match={ match }
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ false }
    />);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });

    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
  });
});
