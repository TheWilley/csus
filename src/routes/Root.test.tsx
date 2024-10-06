import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Root from './Root';

describe('Root Component', () => {
    test('renders the title and subtitle', async () => {
        await act(async () => {
            render(<Root />);
        }); expect(screen.queryByText('csus')).toBeTruthy();
        expect(screen.queryByText('Client-Side-Url-Shortener')).toBeTruthy();
    });

    test('renders the Shortener component by default', async () => {
        await act(async () => {
            render(<Root />);
        });
        expect(screen.queryByText('Manage your URLs')).toBeTruthy();
    });

    test('renders the Result component when entering a link and clicking "Shorten"', async () => {
        await act(async () => {
            render(<Root />);
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
            render(<Root />);
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
            render(<Root />);
        });
        expect(screen.queryByText('You can also self-host the app! (GitHub)')).toBeTruthy();
    });

    test('does not render the Footer component when VITE_SHOW_FOOTER is false', async () => {
        import.meta.env.VITE_SHOW_FOOTER = 'false';
        await act(async () => {
            render(<Root />);
        });
        expect(screen.queryByText('You can also self-host the app! (GitHub)')).toBeFalsy();
    });

    test('shows the error message when the input is empty', async () => {
        await act(async () => {
            render(<Root />);
        });

        // Click the shorten button
        const button = screen.getByText('Shorten');
        await act(async () => {
            fireEvent.click(button);
        });

        const result = screen.queryByText('Invalid URL. Please enter a valid URL.');
        expect(result).toBeTruthy();
    });

    test('display the custom UID input when adjusting select', async () => {
        await act(async () => {
            render(<Root />);
        });

        // Select the custom UID option
        const select = screen.getByTestId('custom-uid-select');
        await act(async () => {
            fireEvent.change(select, { target: { value: 'Yes' } });
        });

        // Check if the custom UID input is shown
        expect(screen.queryByPlaceholderText('Enter custom UID here')).toBeTruthy();
    });
});