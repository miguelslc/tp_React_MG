import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Home from '../../src/components/Home/Home'; // Adjust the path as necessary


const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    // Use the actual implementation for other exports (like Link, etc.) if needed
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

// Mock the setAgent prop
const mockSetAgent = jest.fn();

describe('Home Component', () => {

    beforeEach(() => {
        // Clear mocks before each test
        mockNavigate.mockClear();
        mockSetAgent.mockClear();
    });

    test('renders the main heading and both card titles', () => {
        render(<Home setAgent={mockSetAgent} />);

        // Check the main title
        expect(screen.getByText('Bingo Bango Bongo, Bish Bash Bosh')).toBeInTheDocument();

        // Check the two card titles
        expect(screen.getByText('Anti-Terrotistas')).toBeInTheDocument();
        expect(screen.getByText('Terroristas')).toBeInTheDocument();
    });

    test('calls setAgent with "counter-terrorists" and navigates when CT image is clicked', async () => {
        render(<Home setAgent={mockSetAgent} />);
        
        // Find the image by its alt text, which has the onClick handler
        // Note: The click handler is on the <img> tag, not the CardActionArea
        const ctImage = screen.getByAltText('Anti-Terroristas');

        // Click the image
        await userEvent.click(ctImage);

        // A. Check if setAgent was called with the correct argument
        expect(mockSetAgent).toHaveBeenCalledTimes(1);
        expect(mockSetAgent).toHaveBeenCalledWith('counter-terrorists');
        
        // B. Check if navigation was called
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('/agents');
    });

    test('calls setAgent with "terrorists" and navigates when TT image is clicked', async () => {
        render(<Home setAgent={mockSetAgent} />);

        // Find the image by its alt text
        const ttImage = screen.getByAltText('Terroristas');

        // Click the image
        await userEvent.click(ttImage);

        // A. Check if setAgent was called with the correct argument
        expect(mockSetAgent).toHaveBeenCalledTimes(1);
        expect(mockSetAgent).toHaveBeenCalledWith('terrorists');
        
        // B. Check if navigation was called
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('/agents');
    });

    test('handles clicks on both teams sequentially', async () => {
        render(<Home setAgent={mockSetAgent} />);

        const ctImage = screen.getByAltText('Anti-Terroristas');
        const ttImage = screen.getByAltText('Terroristas');

        // Click CT
        await userEvent.click(ctImage);

        // Check CT assertions
        expect(mockSetAgent).toHaveBeenCalledTimes(1);
        expect(mockSetAgent).toHaveBeenCalledWith('counter-terrorists');
        expect(mockNavigate).toHaveBeenCalledTimes(1);

        // Click TT
        await userEvent.click(ttImage);

        // Check TT assertions (calls should increment)
        expect(mockSetAgent).toHaveBeenCalledTimes(2);
        expect(mockSetAgent).toHaveBeenCalledWith('terrorists');
        expect(mockNavigate).toHaveBeenCalledTimes(2);
    });
});