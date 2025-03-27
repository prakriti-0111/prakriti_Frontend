import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'src/layout/Customer/MainLayout';

const HomePage = Loadable(lazy(() => import('pages/Customer/Home')));
const SearchPage = Loadable(lazy(() => import('pages/Customer/SearchPage')));
const AboutUsPage = Loadable(lazy(() => import('pages/Customer/AboutUs')));
const Contact = Loadable(lazy(() => import('pages/Customer/Contact')));
const Orders = Loadable(lazy(() => import('pages/Customer/Orders')));
const OrderDetails = Loadable(lazy(() => import('pages/Customer/Orders/OrderSummary')));
const OrderReturn = Loadable(lazy(() => import('pages/Customer/Orders/OrderReturn')));
const Cart = Loadable(lazy(() => import('pages/Customer/Cart')));
const EditProfile = Loadable(lazy(() => import('pages/Customer/EditProfile')));
const ForgotPassword = Loadable(lazy(() => import('pages/Customer/ForgotPassword')));
const PageNotFound = Loadable(lazy(() => import('pages/Customer/PageNotFound')));
const PrivacyPolicy = Loadable(lazy(() => import('pages/Customer/PrivacyPolicy')));
const ProductDetails = Loadable(lazy(() => import('pages/Customer/ProductDetails')));
const ReturnPolicy = Loadable(lazy(() => import('pages/Customer/ReturnPolicy')));
const TermsCondition = Loadable(lazy(() => import('pages/Customer/TermsCondition')));
const Support = Loadable(lazy(() => import('pages/Customer/Support')));
const Checkout = Loadable(lazy(() => import('pages/Customer/Checkout')));
const CreateAccount = Loadable(lazy(() => import('pages/Customer/CreateAccount')));
const AddAddress = Loadable(lazy(() => import('pages/Customer/AddAddress')));
const Email = Loadable(lazy(() => import('pages/Customer/Email')));
const Exchange = Loadable(lazy(() => import('pages/Customer/Exchange')));
const FranchiseEnquiry = Loadable(lazy(() => import('pages/Customer/FranchiseEnquiry')));
const SearchResult = Loadable(lazy(() => import('pages/Customer/SearchResult')));
const TrackOrder = Loadable(lazy(() => import('pages/Customer/TrackOrder')));
const Vision = Loadable(lazy(() => import('pages/Customer/Vision')));
const WhyBuyFromUs = Loadable(lazy(() => import('pages/Customer/WhyBuyFromUs')));
const CustomerLogin = Loadable(lazy(()=>import('pages/Customer/Login')));
const CustomerSignup= Loadable(lazy(()=> import('pages/Customer/Signup')));
const OrderSuccessful= Loadable(lazy(()=> import('pages/Customer/Orders/OrderSuccess')));
const Wishlist = Loadable(lazy(()=>import('pages/Customer/Wishlist')));
const ChangePassword = Loadable(lazy(()=>import('pages/Customer/ChangePassword')));
const MyAddress = Loadable(lazy(()=>import('pages/Customer/MyAddress')));
const ProductsPage = Loadable(lazy(()=>import('pages/Customer/Products')));
const RetailersCreatePage = Loadable(lazy(()=>import('pages/Customer/Retailers/create')));

const routePrefix = '/';
const CustomerRoutes = (isLoggedIn) => [
    {
        path: routePrefix,
        element: <MainLayout />,
        children: [
            {
                path: routePrefix,
                element: <HomePage />
            },
            {
                path: 'about-us',
                element: <AboutUsPage />
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: "signup",
                element:<CustomerSignup/>
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: 'page-not-found',
                element: <PageNotFound />
            },
            {
                path: 'privacy-policy',
                element: <PrivacyPolicy />
            },
            {
                path: 'products',
                element: <ProductsPage />
            },
            {
                path: 'products/:slug',
                element: <ProductDetails />
            },
            {
                path: 'return-policy',
                element: <ReturnPolicy />
            },
            {
                path: 'terms-condition',
                element: <TermsCondition />
            },
            {
                path: 'support',
                element: <Support />
            },
            {
                path: 'create-account',
                element: <CreateAccount />
            },
            // {
            //     path: 'add-address',
            //     element: <AddAddress />
            // },
            {
                path: 'email',
                element: <Email />
            },
            {
                path: 'exchange',
                element: <Exchange />
            },
            {
                path: 'franchise-enquiry',
                element: <FranchiseEnquiry />
            },
            {
                path: 'search-result',
                element: <SearchResult />
            },
            {
                path: 'search-result/:id',
                element: <SearchResult />
            },
            {
                path: 'track-order/:id',
                element: <TrackOrder />
            },
            {
                path: 'vision',
                element: <Vision />
            },
            {
                path: 'why-buy-from-us',
                element: <WhyBuyFromUs />
            },
            {
                path: `login`,
                element: <CustomerLogin />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'checkout',
                element: <Checkout />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path: 'wishlist',
                element: <Wishlist/>
            },
        ]
    },
    {
        path: routePrefix,
        element: isLoggedIn ? <MainLayout /> : <Navigate to={`${routePrefix}login`} />,
        children: [
            {
                path: 'orders',
                element: <Orders />
            },
            {
                path: 'orders/:id',
                element: <OrderDetails />
            },
            {
                path: 'order-return/:id',
                element: <OrderReturn />
            },
          
            {
                path: 'edit-profile',
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
                path: 'order-success',
                element: <OrderSuccessful />
            },
            {
                path: 'retailers/create',
                element: <RetailersCreatePage />
            }
        ]
    }

];

  
export default CustomerRoutes;
