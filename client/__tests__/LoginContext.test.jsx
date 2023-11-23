import React, { useContext } from 'react';
import renderer from 'react-test-renderer';
import { LoginContext, LoginProvider } from '../LoginContext';

const TestingTheBestComponent = () => {
  const { user, profileName, loadUser, unloadUser } = useContext(LoginContext);
  return (
    <div>
      <p>User: {user ? user.email : 'No user'}</p>
      <p>Profile Name: {profileName}</p>
      <button onClick={loadUser}>Load User</button>
      <button onClick={unloadUser}>Unload User</button>
    </div>
  );
};

describe('LoginProvider', () => {
  it('renders with initial context values', () => {
    const component = renderer.create(
      <LoginProvider>
        <TestingTheBestComponent />
      </LoginProvider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
