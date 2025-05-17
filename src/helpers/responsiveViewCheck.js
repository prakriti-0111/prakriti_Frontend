import React from 'react';

const withIsMobileView = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isMobileView: false,
      };
      this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
      this.setState({
        isMobileView: window.innerWidth < 768,
      });
    }

    render() {
      return <WrappedComponent isMobileView={this.state.isMobileView} {...this.props} />;
    }
  };
};

export default withIsMobileView;