import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader.jsx';
import Specialty from './Section/Specialty.jsx';
import './HomePage.scss';
import About from './Section/About.jsx';
import HomeFooter from './HomeFooter.jsx';

class HomePage extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div>
                <HomeHeader />
                <Specialty settings={settings} />
                <About />
                <HomeFooter />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
