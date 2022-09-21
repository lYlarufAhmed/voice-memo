import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';
import amplifyConfigParams from 'amplify_auth_params.js';
import { Container } from '@material-ui/core';
import { DHeader } from 'components';
import { GivingHistory, UserProfile } from './pages';

const routes = [
  { path: '/dashboard/profile', exact: false, name: 'Profile', component: UserProfile },
  // { path: '/dashboard/giving', exact: false, name: 'Giving', component: Giving },
  { path: '/dashboard/history', exact: false, name: 'Giving History', component: GivingHistory },
];

const DashboardRoutes = React.forwardRef((props, ref) => (
  <Switch>
    {routes.map(({ component: PageComponent, path, exact }) => (
      <Route key={`${path}-${exact ? 1 : 0}`} path={path} exact={!!exact}>
        <div className="app-header-spacer">
          <DHeader path={path} ref={ref} headers={routes.map(r => ({ path: r.path, name: r.name }))} />
        </div>
        <div className="app-content">
          <Container
            style={{
              height: '100%',
              flexDirection: 'column',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <PageComponent />
          </Container>
        </div>
      </Route>
    ))}
    <Redirect to="/dashboard/profile" />
  </Switch>
));

export default withAuthenticator(DashboardRoutes, amplifyConfigParams);
