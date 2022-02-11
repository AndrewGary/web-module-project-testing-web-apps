import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

beforeEach(() => {
    render(<ContactForm />)
    // submitBtn = screen.queryByText('Submit Todo')
    // todoInput = screen.queryByPlaceholderText('Type todo')
  })
  afterEach(() => {
    document.body.innerHTML = '' // DOM manipulation
  })

test('renders without errors', ()=>{
   //This test is automatic because of the beforeEach() function.
});

test('renders the contact form header', ()=> {
    const test = screen.getByText(/contact form/i)

    expect(test).toBeInTheDocument();
    expect(test).toBeTruthy()
    expect(test.textContent).toBe('Contact Form');


});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    const firstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstName, 'andy');
    
    const error = screen.getByText('Error: firstName must have at least 5 characters.');

    expect(error).toBeTruthy();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    const button = screen.getByRole('button');
    
    userEvent.click(button)

    const errors = screen.getAllByTestId(/error/i)

    expect(errors.length).toBe(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    const firstName = screen.getByPlaceholderText(/edd/i);
    const lastName = screen.getByPlaceholderText(/burke/i);

    userEvent.type(firstName, 'Andrew')
    userEvent.type(lastName, 'Lastname')

    const button = screen.getByRole('button');

    userEvent.click(button)

    const error = screen.getByText('Error: email must be a valid email address.');

    expect(error).toBeTruthy();


});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i)

    userEvent.type(email, 'asdf')

    const error = screen.getByText(/Error: email must be a valid email address./i)

    expect(error).toBeTruthy();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    const button = screen.getByRole('button');

    userEvent.click(button);

    const error = screen.getByText('Error: lastName is a required field.')

    expect(error).toBeTruthy();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    const firstName = screen.getByPlaceholderText(/edd/i);
    const lastName = screen.getByPlaceholderText(/burke/i);
    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i)
    const button = screen.getByRole('button');

    userEvent.type(firstName, 'Andrew');
    userEvent.type(lastName, 'lastname');
    userEvent.type(email, 'email1234@email.com');
    userEvent.click(button)

    const displayFirstName = screen.getByTestId('firstnameDisplay')
    const displayLastName = screen.getByTestId('lastnameDisplay')
    const displayEmail = screen.getByTestId('emailDisplay')
    const displayMessage = screen.queryByTestId('messageDisplay')

    expect(displayFirstName).toBeTruthy();
    expect(displayLastName).toBeTruthy();
    expect(displayEmail).toBeTruthy();
    expect(displayMessage).not.toBeTruthy();


});

test('renders all fields text when all fields are submitted.', async () => {
    const firstName = screen.getByPlaceholderText(/edd/i);
    const lastName = screen.getByPlaceholderText(/burke/i);
    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/i)
    const message = screen.getByLabelText(/message/i)
    const button = screen.getByRole('button');

    userEvent.type(firstName, 'Andrew');
    userEvent.type(lastName, 'lastname');
    userEvent.type(email, 'email1234@email.com');
    userEvent.type(message, 'here is a message');
    userEvent.click(button)

    const displayFirstName = screen.getByTestId('firstnameDisplay')
    const displayLastName = screen.getByTestId('lastnameDisplay')
    const displayEmail = screen.getByTestId('emailDisplay')
    const displayMessage = screen.getByTestId('messageDisplay')

    expect(displayFirstName).toBeTruthy();
    expect(displayLastName).toBeTruthy();
    expect(displayEmail).toBeTruthy();
    expect(displayMessage).toBeTruthy();
});