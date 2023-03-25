import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { changeLanguageApp } from '../../store/actions/appActions';
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';

class Header extends Component {
    changeLanguage(language) {
        this.props.changeLanguageAppRedux(language);
    }
    render() {
        let { firstName, lastName } = this.props.userInfo;
        const { processLogout, language } = this.props;
        return (
            <div className="header-container">
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                <div className="language-logout">
                    <span className="welcome">
                        <FormattedMessage id="home-header.welcome" />
                        {`, ${firstName}`}
                    </span>

                    <span className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'} onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                        VN
                    </span>
                    <span className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'} onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                        EN
                    </span>

                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)), // fire changeLanguageApp get languague is param to Props
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
