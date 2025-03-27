import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'src/layout/SalesExecutive/MainLayout';

const HomePage = Loadable(lazy(() => import('pages/SalesExecutive/Home')));
const AboutUsPage = Loadable(lazy(() => import('pages/SalesExecutive/AboutUs')));
const Contact = Loadable(lazy(() => import('pages/SalesExecutive/Contact')));
const Orders = Loadable(lazy(() => import('pages/SalesExecutive/Orders')));
const OrderDetails = Loadable(lazy(() => import('pages/SalesExecutive/Orders/OrderSummary')));
const Cart = Loadable(lazy(() => import('pages/SalesExecutive/Cart')));
const EditProfile = Loadable(lazy(() => import('pages/SalesExecutive/EditProfile')));
const ForgotPassword = Loadable(lazy(() => import('pages/SalesExecutive/ForgotPassword')));
const PageNotFound = Loadable(lazy(() => import('pages/SalesExecutive/PageNotFound')));
const PrivacyPolicy = Loadable(lazy(() => import('pages/SalesExecutive/PrivacyPolicy')));
const ProductDetails = Loadable(lazy(() => import('pages/SalesExecutive/ProductDetails')));
const ReturnPolicy = Loadable(lazy(() => import('pages/SalesExecutive/ReturnPolicy')));
const TermsCondition = Loadable(lazy(() => import('pages/SalesExecutive/TermsCondition')));
const Support = Loadable(lazy(() => import('pages/SalesExecutive/Support')));
const Checkout = Loadable(lazy(() => import('pages/SalesExecutive/Checkout')));
const CreateAccount = Loadable(lazy(() => import('pages/SalesExecutive/CreateAccount')));
const AddAddress = Loadable(lazy(() => import('pages/SalesExecutive/AddAddress')));
const Email = Loadable(lazy(() => import('pages/SalesExecutive/Email')));
const Exchange = Loadable(lazy(() => import('pages/SalesExecutive/Exchange')));
const FranchiseEnquiry = Loadable(lazy(() => import('pages/SalesExecutive/FranchiseEnquiry')));
const SearchResult = Loadable(lazy(() => import('pages/SalesExecutive/SearchResult')));
const TrackOrder = Loadable(lazy(() => import('pages/SalesExecutive/TrackOrder')));
const Vision = Loadable(lazy(() => import('pages/SalesExecutive/Vision')));
const WhyBuyFromUs = Loadable(lazy(() => import('pages/SalesExecutive/WhyBuyFromUs')));
const CustomerLogin = Loadable(lazy(()=>import('pages/SalesExecutive/Login')));
const CustomerSignup= Loadable(lazy(()=> import('pages/SalesExecutive/Signup')));
const OrderSuccessful= Loadable(lazy(()=> import('pages/SalesExecutive/Orders/OrderSuccess')));
const Wishlist = Loadable(lazy(()=>import('pages/SalesExecutive/Wishlist')));
const ChangePassword = Loadable(lazy(()=>import('pages/SalesExecutive/ChangePassword')));
const MyAddress = Loadable(lazy(()=>import('pages/SalesExecutive/MyAddress')));
const ProductsPage = Loadable(lazy(()=>import('pages/SalesExecutive/Products')));
const MyLeavePage = Loadable(lazy(()=>import('pages/SalesExecutive/MyLeaves')));
const AttendencePage = Loadable(lazy(()=>import('pages/SalesExecutive/Attendence')));

const routePrefix = '/sales-executive';
const SalesExecutiveRoutes = (isLoggedIn) => [
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
                path: 'my-leaves',
                element: <MyLeavePage />
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
                path: 'track-order',
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
            }
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
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'wishlist',
                element: <Wishlist/>
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
                path: 'checkout',
                element: <Checkout />
            },
            {
                path: 'order-success',
                element: <OrderSuccessful />
            },
            {
                path: 'attendence',
                element: <AttendencePage />
            }
        ]
    }

];  

export default SalesExecutiveRoutes;
