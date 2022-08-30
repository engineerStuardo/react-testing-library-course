import React from 'react';
import { render, screen } from '@testing-library/react';

import ScoopOption from '../ScoopOption';
import userEvent from '@testing-library/user-event';

test('Testing we get error when negative scoops is selected', () => {
  render(<ScoopOption name='' imagePath='' updateItemCount={jest.fn()} />);

  const vanillaInput = screen.getByRole('spinbutton');
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '-1');
  expect(vanillaInput).toHaveClass('is-invalid');

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '2.5');
  expect(vanillaInput).toHaveClass('is-invalid');

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '11');
  expect(vanillaInput).toHaveClass('is-invalid');

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '3');
  expect(vanillaInput).not.toHaveClass('is-invalid');
});
