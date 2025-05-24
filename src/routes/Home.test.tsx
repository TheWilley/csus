import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Home from './Home';

describe('Home Component', () => {
  test('renders the title and subtitle', async () => {
    await act(async () => {
      render(<Home />);
    });
    expect(screen.queryByText('csus')).toBeTruthy();
    expect(screen.queryByText('Client-Side-Url-Shortener')).toBeTruthy();
  });

  test('renders the Shortener component by default', async () => {
    await act(async () => {
      render(<Home />);
    });
    expect(screen.queryByText('Manage your URLs')).toBeTruthy();
  });

  test('renders the Result component when entering a link and clicking "Shorten"', async () => {
    await act(async () => {
      render(<Home />);
    });

    // Enter text into the input field
    const input = screen.getAllByPlaceholderText('Enter long link here')[0];
    await act(async () => {
      fireEvent.change(input, { target: { value: 'https://example.com' } });
    });

    // Click the shorten button
    const button = screen.getByText('Shorten');
    await act(async () => {
      fireEvent.click(button);
    });

    const result = await screen.findByText('Shorten Another');
    expect(result).toBeDefined();
  });

  test('toggles the dashboard view when the button is clicked', async () => {
    await act(async () => {
      render(<Home />);
    });
    const button = screen.getByText('Manage your URLs');
    await act(async () => {
      fireEvent.click(button);
    });

    // Check if the dashboard is shown
    expect(screen.queryByText('Delete All')).toBeTruthy();
  });

  test('renders the Footer component when VITE_SHOW_FOOTER is true', async () => {
    import.meta.env.VITE_SHOW_FOOTER = 'true';
    await act(async () => {
      render(<Home />);
    });
    expect(screen.queryByText('You can also self-host the app! (GitHub)')).toBeTruthy();
  });

  test('does not render the Footer component when VITE_SHOW_FOOTER is false', async () => {
    import.meta.env.VITE_SHOW_FOOTER = 'false';
    await act(async () => {
      render(<Home />);
    });
    expect(screen.queryByText('You can also self-host the app! (GitHub)')).toBeFalsy();
  });
});
