import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

  userEvent.click(checkBox);

  expect(checkBox).toBeChecked();
  expect(button).toBeEnabled();

  userEvent.click(checkBox);

  expect(button).toBeDisabled();
  expect(checkBox).not.toBeChecked();
});

test('popover responds to hover', async () => {
  render(<SummaryForm />);

  // popover starts out hidden
  const popover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(popover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const terms = screen.getByText(/terms and condition/i);
  userEvent.hover(terms);

  const popOverShow = screen.getByText(
    /no ice cream will actually be delivered/i
  );
  expect(popOverShow).toBeInTheDocument();

  //popover disappears when we mouse out
  userEvent.unhover(terms);
  await waitForElementToBeRemoved(
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
