import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../../assets/specialty/co-xuong-khop.jpg';
import img2 from '../../assets/specialty/than-kinh.jpg';
import img3 from '../../assets/specialty/tieu-hoa.jpg';
import img4 from '../../assets/specialty/tim-mach.jpg';
import img5 from '../../assets/specialty/tai-mui-hong.jpg';
import img6 from '../../assets/specialty/cot-song.jpg';
import img7 from '../../assets/specialty/y-hoc-co-truyen.jpg';
import img8 from '../../assets/specialty/cham-cuu.jpg';

import { FormattedMessage } from 'react-intl';

class Specialty extends Component {
    render() {
        let settings = { ...this.props.settings };
        return (
            <div className="section specialty">
                <div className="section-container">
                    <div className="section-content">
                        <div className="section-header">
                            <span className="title-section">
                                <FormattedMessage id="home-specialty.popular-specialty" />
                            </span>
                            <button className="btn-section">
                                <FormattedMessage id="home-specialty.see-more" />
                            </button>
                        </div>
                        <div className="section-body">
                            <Slider {...settings}>
                                <div className="img-customize">
                                    <div className="image specialty">
                                        <img src={img1} alt="" />
                                    </div>
                                    <h5>
                                        <FormattedMessage id="home-specialty.musculoskeletal" />
                                    </h5>
                                </div>
                                <div className="img-customize">
                                    <div className="image specialty">
                                        <img src={img2} alt="" />
                                    </div>
                                    <h5>
                                        <FormattedMessage id="home-specialty.nerve" />
                                    </h5>
                                </div>
                                <div className="img-customize">
                                    <div className="image specialty">
                                        <img src={img3} alt="" />
                                    </div>
                                    <h5>
                                        <FormattedMessage id="home-specialty.digestion" />
                                    </h5>
                                </div>
                                <div className="img-customize">
                                    <div className="image specialty">
                                        <img src={img4} alt="" />
                                    </div>
                                    <h5>
                                        <FormattedMessage id="home-specialty.heart" />
                                    </h5>
                                </div>
                                <div className="img-customize">
                                    <div className="image specialty">
                                        <img src={img5} alt="" />
                                    </div>
                                    <h5>
                                        <FormattedMessage id="home-specialty.ent" />
                                    </h5>
                                </div>
                                <div className="img-customize">
                                    <div className="image specialty">
                                        <img src={img6} alt="" />
                                    </div>
                                    <h5>
                                        <FormattedMessage id="home-specialty.spine" />
                                    </h5>
                                </div>
                                <div className="img-customize">
                                    <div className="image specialty">
                                        <img src={img7} alt="" />
                                    </div>
                                    <h5>
                                        <FormattedMessage id="home-specialty.traditional-medicine" />
                                    </h5>
                                </div>
                                <div className="img-customize">
                                    <div className="image specialty">
                                        <img src={img8} alt="" />
                                    </div>
                                    <h5>
                                        <FormattedMessage id="home-specialty.acupuncture" />
                                    </h5>
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
