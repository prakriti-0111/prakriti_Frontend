import { Component, React } from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import withRouter from 'src/helpers/withRouter';
import Header from './Header';
import Footer from './Footer';


class MainLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <>
                <Header />
                <Outlet />
                <Footer />
            </>
        )
    }

};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainLayout));