import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import ComplaintForm from '../components/forms/ComplaintForm';

describe('ComplaintForm Component', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders complaint form fields', () => {
    render(<ComplaintForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText('Order ID')).toBeInTheDocument();
    expect(screen.getByLabelText('Product Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /raise complaint/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', async () => {
    render(<ComplaintForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /raise complaint/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Order ID is required')).toBeInTheDocument();
      expect(screen.getByText('Product type is required')).toBeInTheDocument();
      expect(screen.getByText('Description is required')).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    mockOnSubmit.mockResolvedValue({ success: true });

    render(<ComplaintForm onSubmit={mockOnSubmit} />);

    const orderIdInput = screen.getByLabelText('Order ID');
    const productTypeSelect = screen.getByLabelText('Product Type');
    const descriptionTextarea = screen.getByLabelText('Description');
    const submitButton = screen.getByRole('button', { name: /raise complaint/i });

    fireEvent.change(orderIdInput, { target: { value: 'ORD-12345' } });
    fireEvent.change(productTypeSelect, { target: { value: 'Electronics' } });
    fireEvent.change(descriptionTextarea, { target: { value: 'Product not working' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        orderId: 'ORD-12345',
        productType: 'Electronics',
        description: 'Product not working'
      });
    });
  });

  test('resets form after successful submission', async () => {
    mockOnSubmit.mockResolvedValue({ success: true });

    render(<ComplaintForm onSubmit={mockOnSubmit} />);

    const orderIdInput = screen.getByLabelText('Order ID');
    const productTypeSelect = screen.getByLabelText('Product Type');
    const descriptionTextarea = screen.getByLabelText('Description');
    const submitButton = screen.getByRole('button', { name: /raise complaint/i });

    fireEvent.change(orderIdInput, { target: { value: 'ORD-12345' } });
    fireEvent.change(productTypeSelect, { target: { value: 'Electronics' } });
    fireEvent.change(descriptionTextarea, { target: { value: 'Product not working' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(orderIdInput.value).toBe('');
      expect(productTypeSelect.value).toBe('');
      expect(descriptionTextarea.value).toBe('');
    });
  });
});
