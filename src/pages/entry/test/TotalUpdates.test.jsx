import React from 'react';
import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import Options from '../Options';

test('update scoop when scoops change', async () => {
  render(<Options optionType='scoops' />);

  //make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  //update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  //update chocolate schoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update topping when topping change', async () => {
  render(<Options optionType='toppings' />);

  //make sure total starts out $0.00
  const toppingSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent('0.00');

  //update Cherries scoops to 1 and check the subtotal
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingSubtotal).toHaveTextContent('1.50');

  //update M&Ms scoops to 2 and check the subtotal
  const mmsCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });
  userEvent.click(mmsCheckbox);
  expect(toppingSubtotal).toHaveTextContent('3.00');

  //remove hot fudge and check subtotal
  userEvent.click(mmsCheckbox);
  expect(toppingSubtotal).toHaveTextContent('1.50');
});
