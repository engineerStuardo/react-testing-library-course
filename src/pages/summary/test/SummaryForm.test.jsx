import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import SummaryForm from '../SummaryForm';

test('Testing that we have unchecked checkbox by default', () => {
  render(<SummaryForm />);
  const checkBox = screen.getByRole('checkbox', {
    // name: 'I agree to Terms and Conditions',
    name: /terms and conditions/i,
  });
  expect(checkBox).not.toBeChecked();
});

test('Testing checkbox that enables button when checked and disables it when unchecked', () => {
  render(<SummaryForm />);
  const checkBox = screen.getByRole('checkbox', {
    // name: 'I agree to Terms and Conditions',
    name: /terms and conditions/i,
  });
  const button = screen.getByRole('button', { name: /confirm order/i });

  expect(button).toBeDisabled();
  expect(checkBox).not.toBeChecked();

  fireEvent.click(checkBox);

  expect(checkBox).toBeChecked();
  expect(button).toBeEnabled();

  fireEvent.click(checkBox);

  expect(button).toBeDisabled();
  expect(checkBox).not.toBeChecked();
});
