import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../index';

describe('Input', () => {
  it('should render input with label', () => {
    render(<Input label="Test Label" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should handle value changes', () => {
    const handleChange = vi.fn();
    render(<Input label="Test Label" onChange={handleChange} />);
    
    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'test value' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Input label="Test Label" disabled />);
    expect(screen.getByLabelText('Test Label')).toBeDisabled();
  });

  it('should have correct type', () => {
    render(<Input label="Test Label" type="password" />);
    expect(screen.getByLabelText('Test Label')).toHaveAttribute('type', 'password');
  });
}); 