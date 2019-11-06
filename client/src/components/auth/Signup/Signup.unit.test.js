import React from 'react';
import { render, fireEvent } from 'utils/unit-test-utils';
import { Signup } from './Signup';

/* Unit tests for Signup component. */

test('updates the signup form', () => {
  const { getByLabelText, getByDisplayValue, getAllByDisplayValue } = render(
    <Signup
      signup={() => {}}
      signupClear={() => {}}
      clearErrorMessage={() => {}}
    />
  );
  const usernameInput = getByLabelText('Username');
  const passwordInput = getByLabelText('Password');
  const passwordConfirmInput = getByLabelText('Retype password');

  fireEvent.change(usernameInput, { target: { value: 'username' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.change(passwordConfirmInput, { target: { value: 'password' } });

  const username = getByDisplayValue('username');
  const passwords = getAllByDisplayValue('password');

  expect(username).toBeDefined();
  expect(passwords).toHaveLength(2);
});

test('renders a spinner if loading is in progress', () => {
  const { getByTestId } = render(
    <Signup
      loading={true}
      signup={() => {}}
      signupClear={() => {}}
      clearErrorMessage={() => {}}
    />
  );

  const element = getByTestId('spinner');

  expect(element).toBeDefined();
});

describe('test submit button', () => {
  let usernameInput, passwordInput, passwordConfirmInput, signupButton;

  beforeEach(() => {
    const { getByTestId, getByLabelText } = render(
      <Signup
        signup={() => {}}
        signupClear={() => {}}
        clearErrorMessage={() => {}}
      />
    );

    usernameInput = getByLabelText('Username');
    passwordInput = getByLabelText('Password');
    passwordConfirmInput = getByLabelText('Retype password');
    signupButton = getByTestId('signup');
  });

  test('disables submit button if any required inputs are missing', () => {
    expect(signupButton).toBeDisabled();

    fireEvent.change(usernameInput, { target: { value: 'username' } });

    expect(signupButton).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(signupButton).toBeDisabled();

    fireEvent.change(passwordConfirmInput, { target: { value: 'password' } });

    expect(signupButton).not.toBeDisabled();
  });

  test('disables submit button if password is inadequate', () => {
    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.change(passwordInput, { target: { value: 'passwor' } });
    fireEvent.change(passwordConfirmInput, { target: { value: 'passwor' } });

    expect(signupButton).toBeDisabled();
  });

  test('disables submit button if the two password inputs do not match', () => {
    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(passwordConfirmInput, { target: { value: 'passwodr' } });

    expect(signupButton).toBeDisabled();
  });
});
