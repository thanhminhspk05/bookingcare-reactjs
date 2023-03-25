import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import { FormattedMessage } from 'react-intl';

class OutstandingDoctor extends Component {
    render() {
        let settings = { ...this.props.settings };
        return (
            <div className="section outstanding-doctor">
                <div className="section-container">
                    <div className="section-content">
                        <div className="section-header">
                            <span className="title-section">Bác sĩ nổi bật tuần qua</span>
                            <button className="btn-section">Tìm kiếm</button>
                        </div>
                        <div className="section-body">
                            <Slider {...settings}>
                                <div className="custom-border">
                                    <div className="img-customize">
                                        <div className="bg-image outstanding-doctor"></div>
                                        <h5>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Văn A</h5>
                                        <h5>Da liễu</h5>
                                    </div>
                                </div>
                                <div className="custom-border">
                                    <div className="img-customize">
                                        <div className="bg-image outstanding-doctor"></div>
                                        <h5>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Văn A</h5>
                                        <h5>Da liễu</h5>
                                    </div>
                                </div>
                                <div className="custom-border">
                                    <div className="img-customize">
                                        <div className="bg-image outstanding-doctor"></div>
                                        <h5>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Văn A</h5>
                                        <h5>Da liễu</h5>
                                    </div>
                                </div>
                                <div className="custom-border">
                                    <div className="img-customize">
                                        <div className="bg-image outstanding-doctor"></div>
                                        <h5>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Văn A</h5>
                                        <h5>Da liễu</h5>
                                    </div>
                                </div>
                                <div className="custom-border">
                                    <div className="img-customize">
                                        <div className="bg-image outstanding-doctor"></div>
                                        <h5>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Văn A</h5>
                                        <h5>Da liễu</h5>
                                    </div>
                                </div>
                                <div className="custom-border">
                                    <div className="img-customize">
                                        <div className="bg-image outstanding-doctor"></div>
                                        <h5>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Văn A</h5>
                                        <h5>Da liễu</h5>
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
