import { Suspense } from 'react';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => (props) =>
    (
        <Suspense>
            <Component {...props} />
        </Suspense>
    );

export default Loadable;
