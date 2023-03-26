import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let userData = this.props.dataDetailsUser;

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => {
                    this.props.cancelDetailsUser();
                }}
                className="modal-user-container"
                style={{ maxWidth: '350PX', marginTop: '50px' }}
            >
                <ModalHeader
                    toggle={() => {
                        this.props.cancelDetailsUser();
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
                    <div>
                        <label htmlFor="">Diagnose:</label>
                        <input
                            type="text"
                            value={userData.statusHealth || ''}
                            disabled
                            style={{ border: 'none', background: '#fff', width: '200px', textTransform: 'capitalize' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Prescription:</label>
                        <input
                            type="text"
                            value={userData.statusHealth || ''}
                            disabled
                            style={{ border: 'none', background: '#fff', width: '200px', textTransform: 'capitalize' }}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="secondary"
                        className="px-3"
                        onClick={() => {
                            this.props.cancelDetailsUser();
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDetails);
