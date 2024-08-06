import React, { useState } from 'react';
import { Overlay, OverlayContent, CloseButton, AuthForm, AuthFormTitle, FormGroup, FormLabel, FormInput, FormSelect, SubmitButton, ErrorMessage } from '../styles/StyledRegister'; 

const Register = ({ closeOverlay }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState('foodie');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
          firstname,
          lastname,
          role,
        }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFirstname('');
        setLastname('');
        setRole('foodie');
        setError(null);
        closeOverlay();
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('There was an error registering!', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Overlay>
      <OverlayContent>
        <CloseButton onClick={closeOverlay}>X</CloseButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <AuthForm onSubmit={handleSubmit}>
          <AuthFormTitle>Register</AuthFormTitle>
          <FormGroup>
            <FormLabel>Firstname</FormLabel>
            <FormInput
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Lastname</FormLabel>
            <FormInput
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Username</FormLabel>
            <FormInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Confirm Password</FormLabel>
            <FormInput
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Role</FormLabel>
            <FormSelect value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="foodie">Foodie</option>
              <option value="chef">Chef</option>
            </FormSelect>
          </FormGroup>
          <SubmitButton type="submit">Register</SubmitButton>
        </AuthForm>
      </OverlayContent>
    </Overlay>
  );
};

export default Register;
