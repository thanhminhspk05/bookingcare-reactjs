import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';

import { changeLanguageApp } from '../../store/actions/appActions';

class HomeHeader extends Component {
    changeLanguage(language) {
        this.props.changeLanguageAppRedux(language);
        // fire redux event
    }
    render() {
        let { language } = this.props;
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.specialty" />
                                    </b>
                                    <div className="subs-title">
                                        <FormattedMessage id="home-header.search-doctor" />
                                    </div>
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.health-facility" />
                                    </b>
                                    <div className="subs-title">
                                        <FormattedMessage id="home-header.select-room" />
                                    </div>
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.doctor" />
                                    </b>
                                    <div className="subs-title">
                                        <FormattedMessage id="home-header.choose-doctor" />
                                    </div>
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.fee" />
                                    </b>
                                    <div className="subs-title">
                                        <FormattedMessage id="home-header.check-health" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <b>
                                    <FormattedMessage id="home-header.support" />
                                </b>
                            </div>
                            <div className="login">
                                <button className="btn">
                                    <a href="/login" className="btn">
                                        <FormattedMessage id="home-header.login" />
                                    </a>
                                </button>
                            </div>
                            <div className="language">
                                <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                    <span
                                        onClick={() => {
                                            this.changeLanguage(LANGUAGES.VI);
                                        }}
                                    >
                                        VN
                                    </span>
                                </div>
                                <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                    <span
                                        onClick={() => {
                                            this.changeLanguage(LANGUAGES.EN);
                                        }}
                                    >
                                        EN
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="content-up">
                        <h1 className="">
                            <FormattedMessage id="home-banner.medical-background" />
                        </h1>
                        <h1 className="">
                            <FormattedMessage id="home-banner.health-care" />
                        </h1>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <FormattedMessage id="home-banner.placeholder">{(placeholder) => <input placeholder={placeholder} />}</FormattedMessage>
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="far fa-hospital"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="home-banner.exam-specialist" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-mobile-alt"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="home-banner.remote-exam" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-stethoscope"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="home-banner.general-exam" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-flask"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="home-banner.medical-test" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-user-md"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="home-banner.mental-health" />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="fas fa-briefcase-medical"></i>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id="home-banner.dental-exam" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn, // fire state redux to props component
        language: state.app.language,
        // inject
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)), // fire changeLanguageApp get languague is param to Props
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
