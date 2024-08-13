import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SamplePage from './Pages/SamplePage';
import Error404 from './Pages/404';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ForgotPasswordPage from './Auth/ForgotPassword';
// import Admin from './Admin';
import UsersModule from './Admin/Users';
import RolesModule from './Admin/Roles';
import BusinessUnitsModule from './Admin/BusinessUnits';
import PurchaseAreasModule from './Admin/PurchaseAreas';
import StandardModule from './Pages/Standards';
import StandardMajorsReportModule from './Pages/StandardMajorsReport';
import StandardRoomsLayoutReportModule from './Pages/StandardRoomsLayoutReport';
import StandardEquipmentByMajorReport from './Pages/StandardEquipmentByMajorReport';
import ChargeAccountsModule from './Admin/ChargeAccounts';
import MajorsModule from './Admin/Majors';
import SchoolsModule from './Admin/Schools';
import ItemsModule from './Admin/Items';
import GapSourceStockModule from './Pages/GapSourceStock';
import GapSourceStandardModule from './Pages/GapSourceStandard';
import GapSourceDemandModule from './Pages/GapSourceDemand';
import BookCoverageModule from './Pages/BookCoverageReport';
import GapModule from './Pages/Gap';

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useSelector(({ auth }) => auth);
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();

  if (location.pathname === '' || location.pathname === '/') {
    return <Redirect to={'/sample-page'} />;
  } else if (authUser && location.pathname === '/signin') {
    return <Redirect to={'/sample-page'} />;
  }

  return (
    <React.Fragment>
      <Switch>
        <RestrictedRoute path="/sample-page" component={SamplePage} />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Register} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <RestrictedRoute path="/admin/users" component={UsersModule} />
        <RestrictedRoute path="/admin/roles" component={RolesModule} />
        <RestrictedRoute path="/admin/businessUnits" component={BusinessUnitsModule} />
        <RestrictedRoute path="/admin/purchaseAreas" component={PurchaseAreasModule} />
        <RestrictedRoute path="/admin/chargeAccounts" component={ChargeAccountsModule} />
        <RestrictedRoute path="/admin/majors" component={MajorsModule} />
        <RestrictedRoute path="/admin/schools" component={SchoolsModule} />
        <RestrictedRoute path="/admin/items" component={ItemsModule} />
        <RestrictedRoute path="/standard/standards" component={StandardModule} />
        <RestrictedRoute path="/reports/standard-majors" component={StandardMajorsReportModule} />
        <RestrictedRoute path="/reports/standard-prototype" component={StandardRoomsLayoutReportModule} />
        <RestrictedRoute path="/reports/equipment-major" component={StandardEquipmentByMajorReport} />
        <RestrictedRoute path="/reports/book-coverage" component={BookCoverageModule} />
        <RestrictedRoute path="/bibliographic/gap-source-stock" component={GapSourceStockModule} />
        <RestrictedRoute path="/bibliographic/gap-source-demand" component={GapSourceDemandModule} />
        <RestrictedRoute path="/bibliographic/gap-source-standard" component={GapSourceStandardModule} />
        <RestrictedRoute path="/bibliographic/gaps" component={GapModule} />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
