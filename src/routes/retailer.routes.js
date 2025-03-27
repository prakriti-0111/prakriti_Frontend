import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'src/layout/Retailer/MainLayout';

const HomePage = Loadable(lazy(() => import('pages/Retailer/Home')));
const AboutUsPage = Loadable(lazy(() => import('pages/Retailer/AboutUs')));
const Contact = Loadable(lazy(() => import('pages/Retailer/Contact')));
const Login = Loadable(lazy(() => import('pages/Retailer/Login')));
const Signup = Loadable(lazy(() => import('pages/Retailer/Signup')));
const Orders = Loadable(lazy(() => import('pages/Retailer/Orders')));
const Cart = Loadable(lazy(() => import('pages/Retailer/Cart')));
const EditProfile = Loadable(lazy(() => import('pages/Retailer/EditProfile')));
const ForgotPassword = Loadable(lazy(() => import('pages/Retailer/ForgotPassword')));
const PageNotFound = Loadable(lazy(() => import('pages/Retailer/PageNotFound')));
const PrivacyPolicy = Loadable(lazy(() => import('pages/Retailer/PrivacyPolicy')));
const ProductDetails = Loadable(lazy(() => import('pages/Retailer/ProductDetails')));
const ReturnPolicy = Loadable(lazy(() => import('pages/Retailer/ReturnPolicy')));
const TermsCondition = Loadable(lazy(() => import('pages/Retailer/TermsCondition')));
const Support = Loadable(lazy(() => import('pages/Retailer/Support')));
const Checkout = Loadable(lazy(() => import('pages/Retailer/Checkout')));
const CreateAccount = Loadable(lazy(() => import('pages/Retailer/CreateAccount')));
const AddAddress = Loadable(lazy(() => import('pages/Retailer/AddAddress')));
const Email = Loadable(lazy(() => import('pages/Retailer/Email')));
const Exchange = Loadable(lazy(() => import('pages/Retailer/Exchange')));
const FranchiseEnquiry = Loadable(lazy(() => import('pages/Retailer/FranchiseEnquiry')));
const SearchResult = Loadable(lazy(() => import('pages/Retailer/SearchResult')));
const TrackOrder = Loadable(lazy(() => import('pages/Retailer/TrackOrder')));
const Vision = Loadable(lazy(() => import('pages/Retailer/Vision')));
const WhyBuyFromUs = Loadable(lazy(() => import('pages/Retailer/WhyBuyFromUs')));
const OrderSuccess = Loadable(lazy(() => import('pages/Retailer/Orders/OrderSuccess')));
const OrderSuccess1 = Loadable(lazy(() => import('pages/Retailer/Orders/OrderSummary')));
const ProductsPage = Loadable(lazy(()=>import('pages/Retailer/Products')));
const ChangePassword = Loadable(lazy(()=>import('pages/Retailer/ChangePassword')));
const MyAddress = Loadable(lazy(()=>import('pages/Retailer/MyAddress')));
const Wishlist = Loadable(lazy(()=>import('pages/Retailer/Wishlist')));

const routePrefix = '/retailer';
const RetailerRoutes = (isLoggedIn) => [
    {
        path: routePrefix,
        element: <MainLayout />,
        children: [
            {
                path: routePrefix,
                element: <HomePage />
            },
            {
                path: `${routePrefix}/about-us`,
                element: <AboutUsPage />
            },
            {
                path: `${routePrefix}/contact`,
                element: <Contact />
            },
            {
                path: `${routePrefix}/login`,
                element: <Login />
            },
            {
                path: `${routePrefix}/signup`,
                element: <Signup />
            },
            {
                path: `${routePrefix}/forgot-password`,
                element: <ForgotPassword />
            },
            {
                path: `${routePrefix}/page-not-found`,
                element: <PageNotFound />
            },
            {
                path: `${routePrefix}/privacy-policy`,
                element: <PrivacyPolicy />
            },
            {
                path: `${routePrefix}/products/:slug`,
                element: <ProductDetails />
            },
            {
                path: 'products',
                element: <ProductsPage />
            },
            {
                path: 'wishlist',
                element: <Wishlist/>
            },
            {
                path: `${routePrefix}/return-policy`,
                element: <ReturnPolicy />
            },
            {
                path: `${routePrefix}/terms-condition`,
                element: <TermsCondition />
            },
            {
                path: `${routePrefix}/support`,
                element: <Support />
            },
            {
                path: `${routePrefix}/create-account`,
                element: <CreateAccount />
            },
            {
                path: `${routePrefix}/add-address`,
                element: <AddAddress />
            },
            {
                path: `${routePrefix}/email`,
                element: <Email />
            },
            {
                path: `${routePrefix}/exchange`,
                element: <Exchange />
            },
            {
                path: `${routePrefix}/franchise-enquiry`,
                element: <FranchiseEnquiry />
            },
            {
                path: `${routePrefix}/search-result/:id`,
                element: <SearchResult />
            },
            {
                path: `${routePrefix}/track-order`,
                element: <TrackOrder />
            },
            {
                path: `${routePrefix}/vision`,
                element: <Vision />
            },
            {
                path: `${routePrefix}/why-buy-from-us`,
                element: <WhyBuyFromUs />
            }
        ]
    },
    {
        path: routePrefix,
        element: isLoggedIn ? <MainLayout /> : <Navigate to={`${routePrefix}login`} />,
        children: [
            {
                path: `${routePrefix}/orders`,
                element: <Orders />
            },
            {
                path: `${routePrefix}/cart`,
                element: <Cart />
            },
            {
                path: `${routePrefix}/edit-profile`,
                element: <EditProfile />
            },
            {
                path: 'change-password',
                element: <ChangePassword />
            },
            {
                path: 'my-address',
                element: <MyAddress />
            },
            {
                path: `${routePrefix}/checkout`,
                element: <Checkout />
            },
            {
                path: `${routePrefix}/order-success`,
                element: <OrderSuccess />
            },
        ]
    }

];
  
export default RetailerRoutes;
