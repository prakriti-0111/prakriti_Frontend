import { useRoutes } from 'react-router-dom';

// routes
import CustomerRoutes from './customer.routes';
import RetailerRoutes from './retailer.routes';
import SalesExecutiveRoutes from './salesExecutive.routes';

// ==============================|| ROUTING RENDER ||============================== //

const routes = (isLoggedIn) => [
    ...CustomerRoutes(isLoggedIn), 
    ...RetailerRoutes(isLoggedIn),
    ...SalesExecutiveRoutes(isLoggedIn)
];
  
export default routes;
