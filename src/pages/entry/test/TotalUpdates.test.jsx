import React from 'react';
import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import Options from '../Options';
import OrderEntry from '../OrderEntry';

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

describe('grand total', () => {
  test('grand total starts at $0.00 and grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /Grand total: \$/i,
    });

    expect(grandTotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('2.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('3.5');
  });

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);
    const grandTotal = await screen.findByRole('heading', {
      name: /Grand total: \$/i,
    });

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('1.5');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');
  });

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /Grand total: \$/i,
    });

    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('1.5');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '3');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');

    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('4.00');
  });
});
