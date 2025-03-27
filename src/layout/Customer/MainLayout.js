import { Component, React } from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import withRouter from 'src/helpers/withRouter';
import Header from './Header';
import Footer from './Footer';
import { useMatch } from "react-router-dom"

const MainLayout = (props) => {
    const isSearchPage = useMatch("/search");
    return (
        <>
            {
                !isSearchPage ?
                <Header />
                : null
            }
            <Outlet />
            {
                !isSearchPage ?
                <Footer />
                : null
            }
            
        </>
    )

}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainLayout));