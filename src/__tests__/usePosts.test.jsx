import { renderHook, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePosts } from '../hooks/usePosts';
import { postService } from '../services/postService';

// Mock the post service
jest.mock('../services/postService');

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('usePosts Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ id: 'user-1' }));
  });

  test('loads posts successfully', async () => {
    const mockPosts = [
      { _id: '1', title: 'Test Post', likes: 5, likedBy: [] }
    ];

    postService.getPosts.mockResolvedValue({
      data: { posts: mockPosts }
    });

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.posts).toEqual(mockPosts);
  });

  test('handles like functionality', async () => {
    const mockPosts = [
      { _id: '1', title: 'Test Post', likes: 5, likedBy: [] }
    ];

    postService.getPosts.mockResolvedValue({
      data: { posts: mockPosts }
    });
    postService.likePost.mockResolvedValue({ success: true });

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.handleLike('1');
    });

    expect(postService.likePost).toHaveBeenCalledWith('1');
    expect(result.current.likedPosts.has('1')).toBe(true);
  });

  test('creates post successfully', async () => {
    const mockPost = { _id: '2', title: 'New Post' };
    
    postService.getPosts.mockResolvedValue({
      data: { posts: [] }
    });
    postService.createPost.mockResolvedValue({ post: mockPost });

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let createResult;
    await act(async () => {
      createResult = await result.current.createPost(new FormData());
    });

    expect(createResult.success).toBe(true);
    expect(result.current.posts).toContainEqual(mockPost);
  });

  test('updates post successfully', async () => {
    const mockPosts = [
      { _id: '1', title: 'Original Title' }
    ];
    const updatedPost = { _id: '1', title: 'Updated Title' };

    postService.getPosts.mockResolvedValue({
      data: { posts: mockPosts }
    });
    postService.updatePost.mockResolvedValue({ post: updatedPost });

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let updateResult;
    await act(async () => {
      updateResult = await result.current.updatePost('1', new FormData());
    });

    expect(updateResult.success).toBe(true);
    expect(result.current.posts[0].title).toBe('Updated Title');
  });

  test('deletes post successfully', async () => {
    const mockPosts = [
      { _id: '1', title: 'Test Post' },
      { _id: '2', title: 'Another Post' }
    ];

    postService.getPosts.mockResolvedValue({
      data: { posts: mockPosts }
    });
    postService.deletePost.mockResolvedValue({ success: true });

    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.deletePost('1');
    });

    expect(postService.deletePost).toHaveBeenCalledWith('1');
    expect(result.current.posts).toHaveLength(1);
    expect(result.current.posts[0]._id).toBe('2');
  });
});