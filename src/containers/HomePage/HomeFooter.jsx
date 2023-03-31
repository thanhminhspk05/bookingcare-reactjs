import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

class HomeFooter extends Component {
    render() {
        return (
            <div className="footer">
                <p>
                    &copy; 2023 BookingCare. <FormattedMessage id="home-footer.contact" /> &#8594;{' '}
                    <a href="/#" target="_blank">
                        <FormattedMessage id="home-footer.click-here" />
                    </a>{' '}
                    &#8592;
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
