import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../test/testUtils';
import Input from './Input';

const setup = (secretWord = 'party') => {
  return shallow(<Input secretWord={secretWord} />);
}

test('Input renders without error', () => {
  const wrapper = setup();
  const inputComponent = findByTestAttr(wrapper, 'component-input');
  expect(inputComponent.length).toBe(1);
});

describe('state controlled input field', () => {
  let mockSetGurrentGuess = jest.fn();
  let wrapper;
  beforeEach(() => {
    mockSetGurrentGuess.mockClear();
    React.useState = jest.fn(() => ['', mockSetGurrentGuess]);
    wrapper = setup();
  });
  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);
    expect(mockSetGurrentGuess).toHaveBeenCalledWith('train');
  });
  test('field is cleared upon submit button click', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    const mockEvent = { preventDefault(){} };
    submitButton.simulate('click', mockEvent);
    expect(mockSetGurrentGuess).toHaveBeenCalledWith('');
  });
});