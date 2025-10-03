import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import WeaponSkins from '../../src/components/Weapons/WeaponSkins/index'; // Adjust the path as necessary
import useServicesFetch from '../../src/components/services/index'; // The hook you are using

// --- Mock the custom hook to control its return values ---
jest.mock('../../src/components/services', () => jest.fn());

// --- Mock Data ---
const mockSkinsData = [
    // 0. Invalid: Two words, but doesn't match the weapon (AK-47)
    { id: 'skin0', name: 'M4A4 | Asiimov', image: 'img0.png' },
    // 1. Invalid: Matches weapon (AK-47), but only one word (fails weaponFiltered check)
    { id: 'skin1', name: 'AK-47', image: 'img1.png' },
    // 2. Valid: Matches AK-47, and has more than one word.
    { id: 'skin2', name: 'AK-47 | Redline', image: 'img2.png' },
    // 3. Valid: Matches AK-47 (case insensitive), and has more than one word.
    { id: 'skin3', name: 'AK-47 | Case Hardened', image: 'img3.png' },
    // 4. Invalid: Two words, but doesn't match the weapon (AK-47)
    { id: 'skin4', name: 'Glock-18 | Fade', image: 'img4.png' },
];

// Define the weapon prop expected to filter the data
const mockWeaponProp = 'AK-47';

describe('WeaponSkins Component', () => {

    beforeEach(() => {
        useServicesFetch.mockClear();
    });

    // ----------------------------------------------------------------
    // Test Case 1: Loading State
    // ----------------------------------------------------------------
    test('renders CircularProgress when data is loading', () => {
        useServicesFetch.mockReturnValue({
            data: [],
            serviceLoading: true,
            serviceError: null
        });

        render(<WeaponSkins weapon={mockWeaponProp} />);

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    // ----------------------------------------------------------------
    // Test Case 2: Error State
    // ----------------------------------------------------------------
    test('renders error message when data fetching fails', () => {
        const errorMessage = 'Failed to fetch skins';

        useServicesFetch.mockReturnValue({
            data: [],
            serviceLoading: false,
            serviceError: errorMessage
        });

        render(<WeaponSkins weapon={mockWeaponProp} />);

        expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });

    // ----------------------------------------------------------------
    // Test Case 3: No Products/Empty Data State
    // ----------------------------------------------------------------
    test('renders "No hay productos para mostrar" if fetched data is an empty array', async () => {
        useServicesFetch.mockReturnValue({
            data: [],
            serviceLoading: false,
            serviceError: null
        });

        // CHANGE: Replace the undefined mockSetWeapon with a simple string value
        render(<WeaponSkins weapon={'AK-47'} />);

        await waitFor(() => {
            expect(screen.getByText(/No hay items para mostrar/i)).toBeInTheDocument();
        });
    });

    // ----------------------------------------------------------------
    // Test Case 4: Successful Filtering and Rendering
    // ----------------------------------------------------------------
    test('renders only skins matching the weapon name and filtration logic', async () => {
        // mockSkinsData contains 2 valid skins for 'AK-47' and several invalid ones.
        useServicesFetch.mockReturnValue({
            data: mockSkinsData,
            serviceLoading: false,
            serviceError: null
        });

        // Assume mockWeaponProp is 'AK-47'
        render(<WeaponSkins weapon={mockWeaponProp} />);

        await waitFor(() => {            
            expect(screen.getByText(`Skins para ${mockWeaponProp}`)).toBeInTheDocument();
            const renderedSkins = screen.getAllByRole('img');
            expect(renderedSkins).toHaveLength(2);
        });
    });

    // ----------------------------------------------------------------
    // Test Case 5: Filtering is Case-Insensitive
    // ----------------------------------------------------------------
    test('filters correctly when weapon prop is lowercase', async () => {
        useServicesFetch.mockReturnValue({
            data: mockSkinsData,
            serviceLoading: false,
            serviceError: null
        });

        // Use a lowercase weapon prop to test the toLowerCase() logic
        render(<WeaponSkins weapon={'ak-47'} />);

        // Wait for the data to be filtered and rendered
        await waitFor(() => {
            expect(screen.getByText('Skins para ak-47')).toBeInTheDocument();
            expect(screen.getByRole('img', { name: 'AK-47 | Redline' })).toBeInTheDocument();
            expect(screen.getByRole('img', { name: 'AK-47 | Case Hardened' })).toBeInTheDocument();

            const renderedSkins = screen.getAllByRole('img');
            expect(renderedSkins).toHaveLength(2);
        });
    });

});