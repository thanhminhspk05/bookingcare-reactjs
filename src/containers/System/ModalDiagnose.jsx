import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
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
            diagnose: '',
            prescription: '',
        };
    }

    componentDidMount() {
        this.setState({
            id: this.props.dataDiagnose.id,
            diagnose: this.props.dataDiagnose.diagnose,
            prescription: this.props.dataDiagnose.prescription,
        });
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                userData: response.user,
            });
        }
    };

    handleOnChangeInput(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleUpdateDiagnose = async () => {
        let data = {
            id: this.state.id,
            diagnose: this.state.diagnose,
            prescription: this.state.prescription,
        };

        let response = await editUserService(data);
        if (response && response.errCode === 0) {
            this.props.cancelModalDiagnose();
            toast.success('Deleted information successfully!');
        }
    };

    render() {
        let userData = this.props.dataDiagnose;
        console.log(userData);
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
                            <label htmlFor="">Email:</label>
                            <input type="text" value={userData.email} disabled style={{ border: 'none', background: '#fff', width: '200px' }} />
                        </div>
                        <div>
                            <label htmlFor="">Full name:</label>
                            <input
                                type="text"
                                value={userData.firstName + ' ' + userData.lastName}
                                disabled
                                style={{ border: 'none', background: '#fff', width: '200px', textTransform: 'capitalize' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Address:</label>
                            <input
                                type="text"
                                value={userData.address}
                                disabled
                                style={{ border: 'none', background: '#fff', width: '200px', textTransform: 'capitalize' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Birthay:</label>
                            <input
                                type="text"
                                value={userData.birthday}
                                disabled
                                style={{ border: 'none', background: '#fff', width: '200px', textTransform: 'capitalize' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Phone Number:</label>
                            <input
                                type="text"
                                value={userData.phone}
                                disabled
                                style={{ border: 'none', background: '#fff', width: '200px', textTransform: 'capitalize' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Gender:</label>
                            <input
                                type="text"
                                value={userData.gender}
                                disabled
                                style={{ border: 'none', background: '#fff', width: '200px', textTransform: 'capitalize' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Role:</label>
                            <input
                                type="text"
                                value={userData.roleId}
                                disabled
                                style={{ border: 'none', background: '#fff', width: '200px', textTransform: 'capitalize' }}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Status health:</label>
                            <input
                                type="text"
                                value={userData.statusHealth || ''}
                                disabled
                                style={{ border: 'none', background: '#fff', width: '200px', textTransform: 'capitalize' }}
                            />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label">Diagnose</label>
                            <textarea
                                name="diagnose"
                                className="form-control form-control-lg"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.diagnose || ''}
                                rows="2"
                                cols="50"
                                required
                            />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label">Prescription</label>
                            <textarea
                                name="prescription"
                                className="form-control form-control-lg"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.prescription || ''}
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
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDiagnose);
