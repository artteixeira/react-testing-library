import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';

describe('Testes FavoritePokemon', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    renderWithRouter(<FavoritePokemon />);

    const notFoundMsg = screen.getByText(/no favorite pokémon found/i);

    expect(notFoundMsg).toBeInTheDocument();
  });

  it('Teste se apenas são exibidos os Pokémon favoritados.', () => {
    const pokemonList = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Kanto Viridian Forest',
            map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
          },
          {
            location: 'Kanto Power Plant',
            map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
          },
        ],
        summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
      },
      {
        id: 78,
        name: 'Rapidash',
        type: 'Fire',
        averageWeight: {
          value: '95.0',
          measurementUnit: 'kg',
        },
        image: 'https://archives.bulbagarden.net/media/upload/5/58/Spr_5b_078.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Kanto Route 28',
            map: 'https://archives.bulbagarden.net/media/upload/5/5b/Kanto_Route_28_Map.png',
          },
          {
            location: 'Johto Mount Silver',
            map: 'https://archives.bulbagarden.net/media/upload/9/95/Johto_Mt_Silver_Map.png',
          },
        ],
        summary: 'At full gallop, its four hooves barely touch the ground because it moves so incredibly fast.',
      },
    ];

    const { container } = renderWithRouter(
      <FavoritePokemon pokemonList={ pokemonList } />,
    );

    const favPokemon = container.querySelectorAll('.favorite-icon');

    expect(favPokemon).toHaveLength(2);
  });
});
