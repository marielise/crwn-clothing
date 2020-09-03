import React, { Component } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from './firebase/firebase.util';

import './sign-up.styles.scss';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      displayName: '',
      confirmPassword: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });

      this.setState = {
        email: '',
        password: '',
        displayName: '',
        confirmPassword: '',
      };
    } catch (err) {
      console.error(err);
    }
  };

  handleSubmit = (event) => {
      const {name, value} = event.target;
      this.setState([name]: value);
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign up with youor email and password</span>
        <form className='sign-up-form' onSubmit={this.hamdleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            label='Display Name'
            onChange={this.handleChange}
            required
          ></FormInput>
          <FormInput
            type='email'
            name='email'
            value={email}
            label='Email'
            onChange={this.handleChange}
            required
          ></FormInput>
          <FormInput
            type='password'
            name='password'
            value={password}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            label='Confirm Password'
            required
          />
          <CustomButton type='submit'>Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
