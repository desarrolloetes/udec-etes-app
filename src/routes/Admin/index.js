import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';

const Admin = ({ match }) => {
  const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={PageLoader}>
      <Switch>
        <Route path={`${requestedUrl}/users`} component={lazy(() => import('./Users'))} />
      </Switch>
    </Suspense>
  );
};

export default Admin;
