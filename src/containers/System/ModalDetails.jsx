import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

class ModalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let userData = this.props.dataDetailsUser;
        let { language } = this.props;

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
                    <FormattedMessage id="system.user-info" />
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
                        <FormattedMessage id="system.role" />: {language === 'vi' && userData.roleId === 'Admin' && 'Quản trị viên'}
                        {language === 'vi' && userData.roleId === 'Doctor' && 'Bác sỹ'}
                        {language === 'vi' && userData.roleId === 'Patient' && 'Bệnh nhân'}
                        {language === 'en' && userData.roleId}
                    </div>
                    <div>
                        <FormattedMessage id="system.status" />: {userData.statusHealth}
                    </div>
                    <div>
                        <FormattedMessage id="system.diagnose" />: {userData.diagnose}
                    </div>
                    <div>
                        <FormattedMessage id="system.prescription" />: {userData.prescription}
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
                        <FormattedMessage id="system.close" />
                    </Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDetails);
