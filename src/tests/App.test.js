import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes App', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const firstNav = screen.getByRole('link', { name: 'Home' });
    const secondNav = screen.getByRole('link', { name: 'About' });
    const thirdNav = screen.getByRole('link', { name: /favorite pokémon/i });

    expect(firstNav.innerHTML).toBe('Home');
    expect(secondNav.innerHTML).toBe('About');
    expect(thirdNav.innerHTML).toBe('Favorite Pokémon');
  });

  it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavPokemon = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(linkFavPokemon);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/dasdsadad');
    });

    const notFoundTitle = screen.getByRole('heading', {
      name: /page requested not found/i,
    });

    expect(notFoundTitle).toBeInTheDocument();
  });
});
