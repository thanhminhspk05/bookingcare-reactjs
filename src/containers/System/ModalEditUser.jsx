import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
        };
    }

    componentDidMount() {
        let { dataEditUser } = this.props;
        this.setState({
            id: dataEditUser.id,
            email: dataEditUser.email,
            firstName: dataEditUser.firstName,
            lastName: dataEditUser.lastName,
            address: dataEditUser.address,
        });
    }

    clearUserInput = () => {
        let emptyState = { email: '', password: '', firstName: '', lastName: '', address: '' };
        this.setState({
            ...emptyState,
        });
        this.props.response.errCode = '';
        this.props.response.errMessage = '';
    };

    handleOnChangeInput(event) {
        let copyState = { ...this.state };
        let name = event.target.name;
        copyState[name] = event.target.value;
        this.setState({
            ...copyState,
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            console.log(!this.state[arrInput[i]]);
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert(`Missing parameter ${arrInput[i]}`);
                break;
            }
        }
        return isValid;
    };

    handleSaveUser = () => {
        let data = {
            id: this.state.id,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
        };

        let isValid = this.checkValidateInput();
        console.log(this.props);
        if (isValid && data) {
            this.props.handleEditUser(data);
            this.props.cancelModelEditUser();
        }
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.props.cancelModelEditUser();
                }}
                className="modal-user-container"
                size="lg"
            >
                <ModalHeader
                    toggle={() => {
                        this.props.cancelModelEditUser();
                    }}
                >
                    Edit user infomation
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label htmlFor="">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value="hardcore"
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">First name</label>
                            <input
                                type="text"
                                name="firstName"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Last name</label>
                            <input
                                type="text"
                                name="lastName"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container input-addess">
                            <label htmlFor="">Address</label>
                            <input
                                type="text"
                                name="address"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                value={this.state.address}
                            />
                        </div>
                        <div className="input-container gender">
                            <label>Role</label>
                            <select
                                name="roleId"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                                style={{ padding: '5px 0' }}
                                value={this.state.gender}
                                required
                            >
                                <option value="doctor">Doctor</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => {
                            this.handleSaveUser();
                        }}
                    >
                        Save changes
                    </Button>
                    <Button
                        color="secondary"
                        className="px-3"
                        onClick={() => {
                            this.props.cancelModelEditUser();
                        }}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
