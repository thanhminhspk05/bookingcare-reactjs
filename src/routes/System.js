import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageForAdmin from '../containers/System/ManageForAdmin.jsx';
import ManageForDoctor from '../containers/System/ManageForDoctor.jsx';
import ManageForUser from '../containers/System/ManageForUser.jsx';
import { changeLanguageApp } from '../store/actions/appActions';
import Header from '../containers/Header/Header.js';
class System extends Component {
    changeLanguage(language) {
        this.props.changeLanguageAppRedux(language);
    }
    render() {
        let { systemMenuPath } = this.props;
        let roleId = this.props.userInfo.roleId;
        console.log(roleId);
        return (
            <div className="system-container">
                {this.props.isLoggedIn && <Header />}
                <div className="system-list">
                    <Switch>
                        {roleId === 'admin' ? (
                            <Route path="/system/user-manage" component={ManageForAdmin} />
                        ) : roleId === 'doctor' ? (
                            <Route path="/system/user-manage" component={ManageForDoctor} />
                        ) : (
                            <Route path="/system/user-manage" component={ManageForUser} />
                        )}

                        <Route
                            component={() => {
                                return <Redirect to={systemMenuPath} />;
                            }}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
