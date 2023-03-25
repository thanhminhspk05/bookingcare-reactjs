import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage.jsx';
import UserRedux from '../containers/System/UserRedux.jsx';
import { changeLanguageApp } from '../store/actions/appActions';
import Header from '../containers/Header/Header.js';
class System extends Component {
    changeLanguage(language) {
        this.props.changeLanguageAppRedux(language);
    }
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                {this.props.isLoggedIn && <Header />}
                <div className="system-list">
                    <Switch>
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/user-redux" component={UserRedux} />

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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
