import React from 'react';
import Can from '../Can';

const HelpPage = () => (
    <Can
        role={user.role}
        perform="posts:delete"
        yes={() => (
          <div>
            <h1>Dashboard</h1>
            <Logout />
            <Profile />
            <PostsList />
          </div>
        )}
        no={() => <Redirect to="/" />}
      />
);

export default HelpPage;