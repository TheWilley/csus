import { fireEvent, render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Dashboard from './Dashboard';

describe('Dashboard tests', () => {
    // Globals variables for testing
    const indexedUrls = [
        { uid: 'RGLExlWx', url: 'https://example.com' },
        { uid: 'wP0v75zf', url: 'https://example2.com' },
        { uid: 'sOHV11gm', url: 'https://example3.com' },
    ];

    describe('Dashboard table', () => {
        test('Should show "No URL\'s shortened yet"', () => {
            const fn = vi.fn();
            const { getByText } = render(
                <Dashboard
                    deleteAllUrls={fn}
                    deleteUrl={fn}
                    exportUrls={fn}
                    importUrls={fn}
                    indexedUrls={[]}
                />
            );
            expect(getByText(/No URL's shortened yet/i)).toBeDefined();
        });

        test('Should show table with headers + 3 rows with correct data rendered"', () => {
            const fn = vi.fn();
            const { getByText, getByTestId } = render(
                <Dashboard
                    deleteAllUrls={fn}
                    deleteUrl={fn}
                    exportUrls={fn}
                    importUrls={fn}
                    indexedUrls={indexedUrls}
                />
            );

            // Table should be rendered and have 3 rows
            const table = getByTestId('dashboard-table');
            expect(table).toBeDefined(); // Check if table is rendered
            expect(table.querySelectorAll('tr').length).toBe(4); // Check if table has 4 rows (header + 3 data rows)

            // Check if the correct data is rendered
            expect(getByText(indexedUrls[0].uid)).toBeDefined();
            expect(getByText(indexedUrls[1].uid)).toBeDefined();
            expect(getByText(indexedUrls[2].uid)).toBeDefined();
        });
    });

    describe('Dashboard actions', () => {
        // Create test for exporting URLs
        test('Should call exportUrls function when export button is clicked', () => {
            const exportUrls = vi.fn();
            const { getByText } = render(
                <Dashboard
                    deleteAllUrls={vi.fn()}
                    deleteUrl={vi.fn()}
                    exportUrls={exportUrls}
                    importUrls={vi.fn()}
                    indexedUrls={indexedUrls}
                />
            );

            // Click on export button
            getByText(/Export/i).click();

            // Check if exportUrls function is called
            expect(exportUrls).toHaveBeenCalled();
        });

        test('Should call deleteAllUrls function when delete button is clicked', () => {
            const deleteAllUrls = vi.fn();
            const { getByText } = render(
                <Dashboard
                    deleteAllUrls={deleteAllUrls}
                    deleteUrl={vi.fn()}
                    exportUrls={vi.fn()}
                    importUrls={vi.fn()}
                    indexedUrls={indexedUrls}
                />
            );

            // Click on delete button
            getByText(/Delete All/i).click();

            // Check if deleteUrl function is called
            expect(deleteAllUrls).toHaveBeenCalled();
        });

        test('should call importUrls function when import button is clicked', () => {
            const importUrls = vi.fn();
            const { getByText } = render(
                <Dashboard
                    deleteAllUrls={vi.fn()}
                    deleteUrl={vi.fn()}
                    exportUrls={vi.fn()}
                    importUrls={importUrls}
                    indexedUrls={indexedUrls}
                />
            );

            // Simulate file upload
            fireEvent.change(
                getByText(/Import/i).querySelector('input') as HTMLInputElement,
                {
                    target: {
                        files: [
                            new File([''], 'urls.json', {
                                type: 'application/json',
                            }),
                        ],
                    },
                }
            );

            // Check if importUrls function is called
            expect(importUrls).toHaveBeenCalled();
        });

        test('Should call deleteUrl function when delete button is clicked', () => {
            const deleteUrl = vi.fn();
            const { getByTestId } = render(
                <Dashboard
                    deleteAllUrls={vi.fn()}
                    deleteUrl={deleteUrl}
                    exportUrls={vi.fn()}
                    importUrls={vi.fn()}
                    indexedUrls={indexedUrls}
                />
            );

            // Click on first delete button on the first row
            const table = getByTestId('dashboard-table');
            table.querySelectorAll('button')[0].click();

            // Check if deleteUrl function is called
            expect(deleteUrl).toHaveBeenCalled();
        });
    });
});
