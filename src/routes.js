import React from 'react';

const News = React.lazy(() => import('./containers/News/News'));
const Login = React.lazy(() => import('./views/Pages/Register/Register'));
const NewsManagement = React.lazy(() => import('./containers/NewsManagement/NewsManagement'));
const UserManagement = React.lazy(() => import('./containers/UserManagement/UserManagement'));
const NewsCreate = React.lazy(() => import('./containers/NewsManagement/NewsCreate'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/news', name: 'News', component: News },
  { path: '/login', name: 'Login', component: Login },
  { path: '/newsmanagement', name: 'News Management', component: NewsManagement },
  { path: '/usermanagement', name: 'User Management', component: UserManagement },
  { path: '/createnews', name: 'User Management', component: NewsCreate },
];

export default routes;
