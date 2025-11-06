import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle } from './Toggle';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { act } from 'react-dom/test-utils';

describe('Toggle component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with default state', () => {
    render(<Toggle />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-pressed', 'false');
    expect(btn).toHaveAccessibleName('Turn on');
  });

  it('toggles state on click', () => {
    render(<Toggle />);
    const btn = screen.getByRole('button');

    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    expect(btn).toHaveAccessibleName('Turn off');
  });

  it('resets automatically after 2 seconds', () => {
    vi.useFakeTimers();

    render(<Toggle />);
    const btn = screen.getByRole('button');

    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-pressed', 'true');

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(btn).toHaveAttribute('aria-pressed', 'false');
    expect(btn).toHaveAccessibleName('Turn on');
  });

  it('cleans up timer on unmount', () => {
    vi.useFakeTimers();

    const { unmount } = render(<Toggle />);
    const btn = screen.getByRole('button');

    fireEvent.click(btn);
    act(() => {
      unmount();
      vi.advanceTimersByTime(2000);
    });

  });
});
