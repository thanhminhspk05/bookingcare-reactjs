import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManageAdmin from '../containers/System/UserManageAdmin.jsx';
import UserDoctor from '../containers/System/UserDoctor.jsx';
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
                            <Route path="/system/user-manage" component={UserManageAdmin} />
                        ) : (
                            <Route path="/system/user-manage" component={UserDoctor} />
                        )}

                        {/* <Route path="/system/user-doctor" component={UserDoctor} />

                        <Route path="/system/user-status" component={UserManageAdmin} /> */}

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
