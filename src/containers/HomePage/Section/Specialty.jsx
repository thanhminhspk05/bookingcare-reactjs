import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import { FormattedMessage } from 'react-intl';

class Specialty extends Component {
    render() {
        let settings = { ...this.props.settings };
        return (
            <div className="section specialty">
                <div className="section-container">
                    <div className="section-content">
                        <div className="section-header">
                            <span className="title-section">Chuyên khoa phổ biến</span>
                            <button className="btn-section">Xem thêm</button>
                        </div>
                        <div className="section-body">
                            <Slider {...settings}>
                                <div className="img-customize">
                                    <div className="bg-image specialty"></div>
                                    <h5>Cơ xương khớp 1</h5>
                                </div>
                                <div className="img-customize">
                                    <div className="bg-image specialty"></div>
                                    <h5>Cơ xương khớp 2</h5>
                                </div>
                                <div className="img-customize">
                                    <div className="bg-image specialty"></div>
                                    <h5>Cơ xương khớp 3</h5>
                                </div>
                                <div className="img-customize">
                                    <div className="bg-image specialty"></div>
                                    <h5>Cơ xương khớp 4</h5>
                                </div>
                                <div className="img-customize">
                                    <div className="bg-image specialty"></div>
                                    <h5>Cơ xương khớp 5</h5>
                                </div>
                                <div className="img-customize">
                                    <div className="bg-image specialty"></div>
                                    <h5>Cơ xương khớp 6</h5>
                                </div>
                            </Slider>
                        </div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
