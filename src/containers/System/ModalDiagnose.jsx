import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers, editUserService } from '../../services/userService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ModalDiagnose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            userData: {},
        };
    }

    async componentDidMount() {
        let response = await getAllUsers(this.props.dataDiagnose.id);
        if (response && response.errCode === 0) {
            this.setState({
                userData: response.user,
            });
        }
    }

    handleOnChangeInput(event) {
        this.setState({
            userData: {
                ...this.state.userData,
                [event.target.name]: event.target.value,
            },
        });
    }

    handleUpdateDiagnose = async () => {
        let response = await editUserService(this.state.userData);
        if (response && response.errCode === 0) {
            this.props.cancelModalDiagnose();
            toast.success('Updated information successfully!');
        }
    };

    render() {
        let userData = this.props.dataDiagnose;
        let { language } = this.props;
        console.log(this.state.userData);

        return (
            <>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => {
                        this.props.cancelModalDiagnose();
                    }}
                    className="modal-user-container"
                    style={{ maxWidth: '350PX', marginTop: '50px' }}
                >
                    <ModalHeader
                        toggle={() => {
                            this.props.cancelModalDiagnose();
                        }}
                    >
                        User infomation
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <FormattedMessage id="system.email" />: {userData.email}
                        </div>
                        <div>
                            <FormattedMessage id="system.fullname" />: {userData.firstName + ' ' + userData.lastName}
                        </div>
                        <div>
                            <FormattedMessage id="system.address" />: {userData.address}
                        </div>
                        <div>
                            <FormattedMessage id="system.birthday" />: {userData.birthday}
                        </div>
                        <div>
                            <FormattedMessage id="system.phone" />: {userData.phone}
                        </div>
                        <div>
                            <FormattedMessage id="system.gender" />: {language === 'vi' && userData.gender === 'Male' && 'Nam'}
                            {language === 'vi' && userData.gender === 'Female' && 'Nữ'}
                            {language === 'vi' && userData.gender === 'Other' && 'Khác'}
                            {language === 'en' && userData.gender}
                        </div>
                        <div>
                            <FormattedMessage id="system.status" />: {userData.statusHealth}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label">
                                <FormattedMessage id="system.diagnose" />:
                            </label>
                            <textarea
                                name="diagnose"
                                className="form-control form-control-lg"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.userData.diagnose || ''}
                                rows="2"
                                cols="50"
                                required
                            />
                        </div>
                        <div className="form-outline mb-4">
                            <FormattedMessage id="system.prescription" />:
                            <textarea
                                name="prescription"
                                className="form-control form-control-lg"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.userData.prescription || ''}
                                rows="4"
                                cols="50"
                                required
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            className="px-3"
                            onClick={() => {
                                this.handleUpdateDiagnose();
                            }}
                        >
                            Update
                        </Button>
                        <Button
                            color="secondary"
                            className="px-3"
                            onClick={() => {
                                this.props.cancelModalDiagnose();
                            }}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                {/* Same as */}
                <ToastContainer />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDiagnose);
