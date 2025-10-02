import { render, screen } from '@testing-library/react';
import Agents from '../../src/components/Agents';

describe('Agents component', () => {
    it('renders without crashing', () => {
        render(<Agents agent="terrorists" />);
        expect(screen.getByText()).toBeInTheDocument();
    });

    // it('renders CardMedia with correct props', () => {
    //     // Mock agent data
    //     const agent = {
    //         image: 'test-image.jpg'
    //     };
    //     // Render Agents with agent prop
    //     render(<Agents agent={agent} />);
    //     // Validate CardMedia (img) is rendered with correct attributes
    //     const img = screen.getByAltText('Agent CS:GO');
    //     expect(img).toBeInTheDocument();
    //     expect(img).toHaveAttribute('src', agent.image);
    //     expect(img).toHaveAttribute('height', '250');
    // });

    // it('renders no agents message if list is empty', () => {
    //     render(<Agents agent={[]} />);
    //     expect(screen.getByText(/no agents available/i)).toBeInTheDocument();
    // });

    // it('renders correct agent type when passed as string', () => {
    //     render(<Agents agent="counter-terrorists" />);
    //     expect(screen.getByText(/counter-terrorists/i)).toBeInTheDocument();
    // });

    // it('handles null agent prop gracefully', () => {
    //     render(<Agents agent={null} />);
    //     expect(screen.getByText(/no agents available/i)).toBeInTheDocument();
    // });

    // it('handles undefined agent prop gracefully', () => {
    //     render(<Agents />);
    //     expect(screen.getByText(/no agents available/i)).toBeInTheDocument();
    // });

    // it('renders single agent when passed as string', () => {
    //     render(<Agents agent="Agent Smith" />);
    //     expect(screen.getByText(/Agent Smith/i)).toBeInTheDocument();
    // });
});