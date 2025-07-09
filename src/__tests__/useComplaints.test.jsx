import { renderHook, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useComplaints } from '../hooks/useComplaints';
import { complaintService } from '../services/complaintService';

// Mock the complaint service
jest.mock('../services/complaintService');

describe('useComplaints Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loads user complaints by default', async () => {
    const mockComplaints = [
      { _id: '1', orderId: 'ORD-001', description: 'Test complaint' }
    ];

    complaintService.getComplaintsByUser.mockResolvedValue({
      data: {
        complaints: mockComplaints,
        totalPages: 1,
        currentPage: 1
      }
    });

    const { result } = renderHook(() => useComplaints());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.complaints).toEqual(mockComplaints);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.currentPage).toBe(1);
  });

  test('loads admin complaints when isAdmin is true', async () => {
    const mockComplaints = [
      { _id: '1', orderId: 'ORD-001', description: 'Test complaint' }
    ];

    complaintService.getAllComplaints.mockResolvedValue({
      data: { complaints: mockComplaints }
    });

    const { result } = renderHook(() => useComplaints(true));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.complaints).toEqual(mockComplaints);
    expect(complaintService.getAllComplaints).toHaveBeenCalled();
  });

  test('raises complaint successfully', async () => {
    complaintService.raiseComplaint.mockResolvedValue({ success: true });
    complaintService.getComplaintsByUser.mockResolvedValue({
      data: { complaints: [], totalPages: 1, currentPage: 1 }
    });

    const { result } = renderHook(() => useComplaints());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let raiseResult;
    await act(async () => {
      raiseResult = await result.current.raiseComplaint({
        orderId: 'ORD-001',
        productType: 'Electronics',
        description: 'Test complaint'
      });
    });

    expect(raiseResult.success).toBe(true);
    expect(complaintService.raiseComplaint).toHaveBeenCalledWith({
      orderId: 'ORD-001',
      productType: 'Electronics',
      description: 'Test complaint'
    });
  });

  test('closes complaint successfully', async () => {
    complaintService.closeComplaint.mockResolvedValue({ success: true });
    complaintService.getComplaintsByUser.mockResolvedValue({
      data: { complaints: [], totalPages: 1, currentPage: 1 }
    });

    const { result } = renderHook(() => useComplaints());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.closeComplaint('complaint-id');
    });

    expect(complaintService.closeComplaint).toHaveBeenCalledWith('complaint-id');
  });

  test('sends reply successfully', async () => {
    complaintService.sendComplaintReply.mockResolvedValue({ success: true });
    complaintService.getComplaintsByUser.mockResolvedValue({
      data: { complaints: [], totalPages: 1, currentPage: 1 }
    });

    const { result } = renderHook(() => useComplaints());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.sendReply('complaint-id', 'Test reply');
    });

    expect(complaintService.sendComplaintReply).toHaveBeenCalledWith('complaint-id', 'Test reply');
  });
});