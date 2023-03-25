import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ConformEmail.scss';

// import { FormattedMessage } from 'react-intl';

class ConformEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log(this.state);
        return (
            <div className="conform-background ">
                <div className="conform-content">
                    <h2>Enter the code from your email</h2>
                    <hr />
                    <div> Let us know that this email address belongs to you. Enter the code from the email sent to your email.</div>
                    <input type="number" max="6" />
                    <div>
                        <a href="/"> Send Email Again</a>
                    </div>
                    <hr />
                    <div className="continue">
                        <button className="btn-continue">
                            <a href="/login">Continue</a>
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
