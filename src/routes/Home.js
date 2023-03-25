import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/home';
        // let linkToRedirect;
        // console.log(isLoggedIn);
        // if (isLoggedIn) {
        //     let { userInfo } = this.props;
        //     if (userInfo.roleId === 'admin') {
        //         linkToRedirect = '/system/user-manage';
        //     } else if (userInfo.roleId === 'doctor') {
        //         linkToRedirect = '/system/user-doctor';
        //     } else if (userInfo.roleId === 'patient') {
        //         linkToRedirect = '/system/user-status';
        //     } else {
        //         linkToRedirect = '/home';
        //     }
        // } else {
        //     linkToRedirect = '/home';
        // }
        console.log(linkToRedirect);

        return <Redirect to={linkToRedirect} />;
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
