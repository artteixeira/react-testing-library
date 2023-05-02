import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const favById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Testes Pokedex', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon;', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ favById }
    />);

    const title = screen.getByRole('heading', { name: /encountered pokémon/i });

    expect(title).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ favById }
    />);

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    const PokemonName = screen.getByTestId('pokemon-name');
    expect(PokemonName.innerHTML).toBe(pokemonList[0].name);
    userEvent.click(nextButton);
    expect(PokemonName.innerHTML).toBe(pokemonList[1].name);
    for (let i = 0; i < pokemonList.length - 1; i += 1) {
      (userEvent.click(nextButton));
    }
    expect(PokemonName.innerHTML).toBe(pokemonList[0].name);
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ favById }
    />);

    const PokemonName = screen.getAllByTestId('pokemon-name');

    expect(PokemonName.length).toBe(1);
  });
  it('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ favById }
    />);

    const filteredPokemonType = pokemonList
      .reduce((acc, pokemon) => {
        if (!acc.some((item) => item.type === pokemon.type)) {
          acc.push(pokemon);
        }
        return acc;
      }, []).map((element) => element.type);

    const typeButtons = screen.getAllByTestId('pokemon-type-button');

    expect(filteredPokemonType.length).toBe(typeButtons.length);
  });

  it('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ favById }
    />);

    const resetButton = screen.getByRole('button', { name: /all/i });

    expect(resetButton).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(typeButtons[1]);
    expect(pokemonType.innerHTML).toBe(typeButtons[1].innerHTML);
    userEvent.click(typeButtons[3]);
    expect(pokemonType.innerHTML).toBe(typeButtons[3].innerHTML);
    userEvent.click(resetButton);
    expect(pokemonType.innerHTML).toBe(typeButtons[0].innerHTML);
  });
});
