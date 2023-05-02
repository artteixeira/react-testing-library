import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testes FavoritePokemon', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const notFoundMsg = screen.getByRole('heading', { name: /page requested not found/i });

    expect(notFoundMsg).toBeInTheDocument();
  });

  it('', () => {
    renderWithRouter(<NotFound />);

    const notFoundImg = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });

    expect(notFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
