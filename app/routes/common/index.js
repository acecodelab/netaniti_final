const route = {};

import signup from './signup/signup_routes.js';
route.signup = signup

import login from './login/login_routes.js';
route.login = login

import dashboardGrid from './DashboardGrid/dashboard_grid_routes.js';
route.dashboardGrid = dashboardGrid

export default route
