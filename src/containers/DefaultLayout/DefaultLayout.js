import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  navChecker = () =>{
    if(localStorage.getItem('fake-detik-authorization')){
    var nav=navigation;
    var newsManagement={
      name: 'News Management',
      url: '/newsmanagement',
      icon: 'icon-pencil',
    }
    nav.items.push(newsManagement)
    var userManagement={
      name: 'User Management',
      url: '/usermanagement',
      icon: 'icon-pencil',
    }
    nav.items.push(userManagement)
    var createNews={
      name: 'Create News',
      url: '/createnews',
      icon: 'icon-pencil',
    }
    nav.items.push(createNews)
  }
  }

  componentDidMount(){
    this.navChecker()
  }

  render() {
    return (
      <div className="app">
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/news" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
