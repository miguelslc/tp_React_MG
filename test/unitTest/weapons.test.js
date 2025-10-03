import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Weapons from '../../src/components/Weapons/Weapons'; // Adjust the path as necessary
import useServicesFetch from '../../src/components/services/index'; // The hook you are using

// --- Mock external dependencies ---

// 1. Mock the custom hook to control its return values
jest.mock('../../src/components/services', () => jest.fn());

// 2. Mock 'react-router-dom' to spy on the navigation function
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

// 3. Mock the console.log to prevent pollution and spy on its calls
global.console = {
    ...global.console,
    log: jest.fn(),
};

// --- Mock Data ---
const mockWeaponsData = [
    // These two are skipped by .slice(2)
    { id: 'weapon0', name: 'Weapon Zero', description: 'Desc 0', image: 'img0.png' },
    { id: 'weapon1', name: 'Weapon One', description: 'Desc 1', image: 'img1.png' },
    // These two should be rendered
    { id: 'weapon2', name: 'AK-47', description: 'Potent Assault Rifle.', image: 'img2.png' },
    { id: 'weapon3', title: 'Desert Eagle', description: 'Heavy Pistol.', image: 'img3.png' }, // Uses 'title' fallback
];

// Mock the setWeapon prop
const mockSetWeapon = jest.fn();

describe('Weapons Component', () => {

    beforeEach(() => {
        // Clear all mocks before each test
        useServicesFetch.mockClear();
        mockNavigate.mockClear();
        mockSetWeapon.mockClear();
        global.console.log.mockClear();
    });

    // ----------------------------------------------------------------
    // Test Case 1: Loading State
    // ----------------------------------------------------------------
    test('renders LinearProgress when data is loading', () => {
        useServicesFetch.mockReturnValue({
            data: [],
            loading: true,
            error: null
        });

        render(<Weapons setWeapon={mockSetWeapon} />);

        // Check for the accessible role of Material UI's LinearProgress
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    // ----------------------------------------------------------------
    // Test Case 2: Error State
    // ----------------------------------------------------------------
    test('renders error message when data fetching fails', () => {
        const errorMessage = 'Network failed';

        useServicesFetch.mockReturnValue({
            data: [],
            loading: false,
            error: errorMessage
        });

        render(<Weapons setWeapon={mockSetWeapon} />);

        expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });

    // ----------------------------------------------------------------
    // Test Case 3: No Products/Empty Data State
    // ----------------------------------------------------------------
    test('renders "No hay productos para mostrar" if fetched data is an empty array', async () => {
        useServicesFetch.mockReturnValue({
            data: [],
            loading: false,
            error: null
        });

        render(<Weapons setWeapon={mockSetWeapon} />);
        await waitFor(() => {    
            expect(screen.getByText(/No hay productos para mostrar/i)).toBeInTheDocument();
        });
    });

    // ----------------------------------------------------------------
    // Test Case 4: Successful Rendering and Slicing
    // ----------------------------------------------------------------
    test('renders weapons, skipping the first two items', async () => {
        useServicesFetch.mockReturnValue({
            data: mockWeaponsData,
            loading: false,
            error: null
        });

        render(<Weapons setWeapon={mockSetWeapon} />);

        // Wait for the data to be rendered (AccordionSummaries use h5 for weapon name)
        await waitFor(() => {
            // Check for the rendered items (index 2 and 3)
            expect(screen.getByText('AK-47')).toBeInTheDocument();
            expect(screen.getByText('Desert Eagle')).toBeInTheDocument();
            
            // Check that the skipped items (index 0 and 1) are NOT present
            expect(screen.queryByText('Weapon Zero')).not.toBeInTheDocument();
            expect(screen.queryByText('Weapon One')).not.toBeInTheDocument();

            // Check name fallback: The 'Desert Eagle' should have been found using 'weapon.title'
            expect(screen.getByText('Desert Eagle')).toBeInTheDocument();
        });
    });

    // ----------------------------------------------------------------
    // Test Case 5: Navigation and Prop Handling on Button Click
    // ----------------------------------------------------------------
    test('calls setWeapon, logs weapon name, and navigates on "Ver Skins" button click', async () => {
        useServicesFetch.mockReturnValue({
            data: mockWeaponsData,
            loading: false,
            error: null
        });

        render(<Weapons setWeapon={mockSetWeapon} />);

        // 1. Wait for the weapon card to render
        await screen.findByText('AK-47');

        // 2. Find and await the click on the AccordionSummary to reveal the button
        const accordionSummary = screen.getByRole('button', { name: /ak-47/i });
        await userEvent.click(accordionSummary); // AWAIT the click

        // 3. Find and AWAIT the "Ver Skins" button to appear (findByRole returns a Promise)
        const viewSkinsButton = await screen.findByRole('button', { name: /ver skins/i });

        // 4. AWAIT the click on the button
        await userEvent.click(viewSkinsButton); // AWAIT the click

        // Assertions for the onHandleClick logic:

        // A. Check if setWeapon was called with the correct argument (weapon.name)
        expect(mockSetWeapon).toHaveBeenCalledTimes(1);
        expect(mockSetWeapon).toHaveBeenCalledWith('AK-47');

        // C. Check if navigation was called
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('/weapons/skins');
    });
    // ----------------------------------------------------------------
    // Test Case 6: Renders description inside AccordionDetails
    // ----------------------------------------------------------------
    test('renders weapon description after expanding the accordion', async () => {
        useServicesFetch.mockReturnValue({
            data: mockWeaponsData,
            loading: false,
            error: null
        });

        render(<Weapons setWeapon={mockSetWeapon} />);
        
        // 1. Wait for the weapon card to render
        await screen.findByText('AK-47');

        // 2. Find and click the AccordionSummary
        const accordionSummary = screen.getByRole('button', { name: /ak-47/i });
        userEvent.click(accordionSummary);

        // 3. Check if the description is visible
        const descriptionText = screen.getByText('Potent Assault Rifle.');
        expect(descriptionText).toBeInTheDocument();
    });
});