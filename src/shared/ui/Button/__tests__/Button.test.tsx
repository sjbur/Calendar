import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../index';

describe('Button', () => {
  it('should render button with text', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Test Button</Button>);

    fireEvent.click(screen.getByText('Test Button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeDisabled();
  });
});
