import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import { FormattedMessage } from 'react-intl';

class MedicalFacility extends Component {
    render() {
        let settings = { ...this.props.settings };
        return (
            <div className="section medical-facility">
                <div className="section-container">
                    <div className="section-content">
                        <div className="section-header">
                            <span className="title-section">Cơ sở y tế nổi bật</span>
                            <button className="btn-section">Tìm kiếm</button>
                        </div>
                        <div className="section-body">
                            <Slider {...settings}>
                                <div className="img-customize">
                                    <div className="bg-image facility"></div>
                                    <h5>Bệnh viện 1</h5>
                                </div>
                                <div className="img-customize">
                                    <div className="bg-image facility"></div>
                                    <h5>Bệnh viện 2</h5>
                                </div>
                                <div className="img-customize">
                                    <div className="bg-image facility"></div>
                                    <h5>Bệnh viện 3</h5>
                                </div>
                                <div className="img-customize">
                                    <div className="bg-image facility"></div>
                                    <h5>Bệnh viện 4</h5>
                                </div>
                                <div className="img-customize">
                                    <div className="bg-image facility"></div>
                                    <h5>Bệnh viện 5</h5>
                                </div>
                                <div className="img-customize">
                                    <div className="bg-image facility"></div>
                                    <h5>Bệnh viện 6</h5>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
