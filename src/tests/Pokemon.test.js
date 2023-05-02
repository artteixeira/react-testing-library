import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Testes Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<Pokemon
      isFavorite={ false }
      showDetailsLink
      pokemon={ pokemonList[0] }
    />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonName.innerHTML).toBe('Pikachu');
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(pokemonImage).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<Pokemon
      isFavorite={ false }
      showDetailsLink
      pokemon={ pokemonList[0] }
    />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });

    expect(linkDetails.href).toContain(`pokemon/${pokemonList[0].id}`);
  });

  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<Pokemon
      isFavorite={ false }
      showDetailsLink
      pokemon={ pokemonList[0] }
    />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails.href).toContain(`pokemon/${pokemonList[0].id}`);
    userEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<Pokemon
      isFavorite
      showDetailsLink
      pokemon={ pokemonList[0] }
    />);

    const favIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favIcon).toBeInTheDocument();
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
