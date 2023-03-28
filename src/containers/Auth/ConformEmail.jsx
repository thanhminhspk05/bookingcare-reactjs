import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ConformEmail.scss';

import { FormattedMessage } from 'react-intl';

class ConformEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="conform-background ">
                <div className="conform-content">
                    <h2>
                        <FormattedMessage id="conform-email.title" />
                    </h2>
                    <hr />
                    <div>
                        <FormattedMessage id="conform-email.request" />
                    </div>
                    <input type="number" max="6" placeholder="Code" />
                    <div>
                        <a href="/">
                            <FormattedMessage id="conform-email.send-again" />
                        </a>
                    </div>
                    <hr />
                    <div className="continue">
                        <button className="btn-continue">
                            <a href="/login">
                                <FormattedMessage id="conform-email.continue" />
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConformEmail);
