import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import Navbar from '../components/layout/Navbar';
import { USER_ROLES } from '../constants/roles';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
  };
});

describe('Navbar Component', () => {
  const mockOnLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders home link', () => {
    render(<Navbar user={null} onLogout={mockOnLogout} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  test('displays user information when logged in', () => {
    const mockUser = { name: 'John Doe', role: USER_ROLES.USER };
    render(<Navbar user={mockUser} onLogout={mockOnLogout} />);
    expect(screen.getByText('John Doe (user)')).toBeInTheDocument();
  });

  test('shows dropdown menu when user icon is clicked', () => {
    const mockUser = { name: 'John Doe', role: USER_ROLES.USER };
    render(<Navbar user={mockUser} onLogout={mockOnLogout} />);
    const userIcon = screen.getByRole('button');
    fireEvent.click(userIcon);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('navigates to user dashboard when dashboard is clicked', () => {
    const mockUser = { name: 'John Doe', role: USER_ROLES.USER };
    render(<Navbar user={mockUser} onLogout={mockOnLogout} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Dashboard'));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  test('navigates to admin dashboard for admin user', () => {
    const mockUser = { name: 'Admin User', role: USER_ROLES.ADMIN };
    render(<Navbar user={mockUser} onLogout={mockOnLogout} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Dashboard'));
    expect(mockNavigate).toHaveBeenCalledWith('/admin');
  });

  test('calls onLogout when logout is clicked', () => {
    const mockUser = { name: 'John Doe', role: USER_ROLES.USER };
    render(<Navbar user={mockUser} onLogout={mockOnLogout} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Logout'));
    expect(mockOnLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('closes menu when clicked outside', () => {
    const mockUser = { name: 'John Doe', role: USER_ROLES.USER };
    render(<Navbar user={mockUser} onLogout={mockOnLogout} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });
});
