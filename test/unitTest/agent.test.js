import { render, screen, waitFor, userEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Agents from '../../src/components/Agents/Agents';

import useServicesFetch from '../../src/components/services/index'; // The hook you are using

// --- Mock the custom hook to control its return values ---
// Note: You must create a manual mock for '../services' if it's not a common library
// For this example, I'll mock the module directly and assume it's in a path like '../services'
jest.mock('../../src/components/services', () => jest.fn());

// --- Mock Data (Simplified structure based on usage) ---
const mockAgentsData = [
    {
        id: 'agent1',
        name: 'Agent A',
        team: { id: 'T', name: 'Terrorist' },
        description: 'Terrorist Agent 1 description.',
        image: 'http://example.com/agent_a.png',
    },
    {
        id: 'agent2',
        name: 'Agent B',
        team: { id: 'CT', name: 'Counter-Terrorist' },
        description: 'Counter-Terrorist Agent 1 description.',
        image: 'http://example.com/agent_b.png',
    },
    {
        id: 'agent3',
        name: 'Agent C',
        team: { id: 'T', name: 'Terrorist' },
        description: 'Terrorist Agent 2 description.',
        image: 'http://example.com/agent_c.png',
    },
];

describe('Agents Component', () => {

    // Reset the mock implementation before each test
    beforeEach(() => {
        useServicesFetch.mockClear();
    });

    // ----------------------------------------------------------------
    // Test Case 1: Loading State
    // ----------------------------------------------------------------
    test('renders LinearProgress when data is loading', () => {
        // Mock the hook to return a loading state
        useServicesFetch.mockReturnValue({
            data: [],
            loading: true,
            error: ""
        });

        // The component will render the LinearProgress (which is a Material UI component)
        // We'll look for its role or the underlying element it produces.
        // A common practice is to check for the 'progressbar' role.
        render(<Agents agent="terrorists" />);

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    // ----------------------------------------------------------------
    // Test Case 2: Error State
    // ----------------------------------------------------------------
    test('renders error message when data fetching fails', () => {
        const errorMessage = 'Failed to fetch data';
        
        // Mock the hook to return an error state
        useServicesFetch.mockReturnValue({
            data: [],
            loading: false,
            error: errorMessage
        });

        render(<Agents agent="terrorists" />);

        expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });

    // ----------------------------------------------------------------
    // Test Case 3: No Agents Found (Empty Data after filter)
    // ----------------------------------------------------------------
    test('renders "No hay agentes para mostrar" if data is fetched but no agents match the filter', async () => {
        // Mock the hook to return successful data fetching
        useServicesFetch.mockReturnValue({
            data: mockAgentsData,
            loading: false,
            error: null
        });

        // Render with an agent prop that won't match any data ('Z')
        render(<Agents agent="Z" />);

        // The data state update is wrapped in an effect, so we use `await waitFor`
        // or check for the final render state. Since data is set in useEffect,
        // React handles the re-render, and checking the text directly should work.
        await waitFor(() => {
            expect(screen.getByText(/No hay agentes para mostrar/i)).toBeInTheDocument();
        });
    });

    // ----------------------------------------------------------------
    // Test Case 4: Successful Data Fetching and Filtering
    // ----------------------------------------------------------------
    test('renders only agents matching the team prop (T)', async () => {
        useServicesFetch.mockReturnValue({
            data: mockAgentsData,
            loading: false,
            error: null
        });

        // Filter for 'T' (Terrorist) agents: Agent A and Agent C
        render(<Agents agent="T" />);

        // Use findByText because the component fetches and updates state asynchronously
        await waitFor(() => {
            // Check for the names of the two 'T' agents
            expect(screen.getByText('Agent A')).toBeInTheDocument();
            expect(screen.getByText('Agent C')).toBeInTheDocument();

            // Check that the 'CT' agent is NOT present
            expect(screen.queryByText('Agent B')).not.toBeInTheDocument();

            // Check the correct number of cards are rendered
            // Since they are wrapped in Card, we can look for the agent's name within the rendered structure
            // We can also check for Accordion elements or specific styles, but names are clearer.
        });
    });

    // ----------------------------------------------------------------
    // Test Case 5: Content Display (Check if description and team name are present inside AccordionDetails)
    // ----------------------------------------------------------------
    test('renders agent details inside the accordion', async () => {
        useServicesFetch.mockReturnValue({
            data: mockAgentsData,
            loading: false,
            error: null
        });

        // Filter for 'CT' (Counter-Terrorist) agents: Agent B
        render(<Agents agent="CT" />);

        // Wait for the component to render the data
        await waitFor(() => {
            // Agent B's name is visible in the AccordionSummary
            const agentName = screen.getByText('Agent B');
            expect(agentName).toBeInTheDocument();
        });

        // The description and team name are inside the AccordionDetails, which is initially hidden.
        // We need to click the AccordionSummary to expand it.
        const accordionSummary = screen.getByRole('button', { name: /agent b/i }); // Find the collapsible button

        // Click to expand the details
        userEvent.click(accordionSummary);

        // Check if the content inside the AccordionDetails is now visible
        expect(screen.getByText('Counter-Terrorist Agent 1 description.')).toBeInTheDocument();
        expect(screen.getByText('Counter-Terrorist')).toBeInTheDocument();
    });
});