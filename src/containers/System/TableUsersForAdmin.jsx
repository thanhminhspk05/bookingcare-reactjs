import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './TableUsers.scss';
import { getAllUsers } from '../../services/userService';

class TableUsersForAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            currentPage: 1,
            order: 'ASC',
            search: '',
            usersPerPage: 10,
        };
    }

    async componentDidMount() {
        await this.getAllUserFromReact('ALL');
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                userData: response.user,
            });
        }
    };

    clearSearch = async () => {
        await this.getAllUserFromReact('ALL');
        this.setState({ search: '' });
    };

    handleOnChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    prevPage = () => {
        this.setState({
            currentPage: this.state.currentPage - 1,
        });
    };

    nextPage = () => {
        this.setState({
            currentPage: this.state.currentPage + 1,
        });
    };

    changeCurrentPage = (number) => {
        this.setState({
            currentPage: number,
        });
    };

    handleSortData = (colName) => {
        if (this.state.order === 'ASC') {
            let sorted = [...this.props.userData].sort((a, b) => (a.colName < b.colName ? 1 : -1));
            console.log(sorted);
            this.setState({ userData: sorted, order: 'DESC' });
        }
        if (this.state.order === 'DESC') {
            let sorted = [...this.props.userData].sort((a, b) => (a.colName > b.colName ? 1 : -1));
            console.log(sorted);
            this.setState({ userData: sorted, order: 'ASC' });
        }
    };

    handleSearchData = (keyword) => {
        let userData = this.state.userData;
        let search = this.state.search;
        let userDataFilter = userData.filter((user) => {
            return search === ''
                ? user
                : user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
                      user.email.toLowerCase().includes(search.toLowerCase()) ||
                      user.address.toLowerCase().includes(search.toLowerCase()) ||
                      user.roleId.toLowerCase().includes(search.toLowerCase());
        });
        this.setState({ userData: userDataFilter });
    };

    render() {
        let { language } = this.props;
        let { currentPage, usersPerPage, userData, userDataFilter, order } = this.state;
        console.log('userData', userData);
        console.log('userDataFilter', userDataFilter);

        // FORMULA
        usersPerPage = Number(usersPerPage);
        let indexOfFirstUser = (currentPage - 1) * usersPerPage;
        let indexOfLastUser = indexOfFirstUser + usersPerPage;
        let totalUsers = userData ? userData.length : 0;
        indexOfLastUser = indexOfLastUser > totalUsers ? totalUsers : indexOfLastUser;

        let currentUserPage =
            userDataFilter === [] ? userDataFilter.slice(indexOfFirstUser, indexOfLastUser) : userData.slice(indexOfFirstUser, indexOfLastUser);
        console.log(currentUserPage);
        let totalPages = Math.ceil(totalUsers / usersPerPage) + 1;
        let pageNumbers = [];

        for (let i = 1; i < totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <>
                <div className="d-flex justify-content-between">
                    <div className="d-flex relative">
                        <FormattedMessage id="system.search">
                            {(placeholder) => (
                                <input
                                    type="text"
                                    name="search"
                                    onChange={(event) => {
                                        this.handleOnChangeInput(event);
                                    }}
                                    placeholder={placeholder}
                                    style={{
                                        padding: '6px 12px',
                                        margin: '0 0 10px 10px',
                                        outline: 'none',
                                        borderRadius: '5px',
                                        border: '1px solid #696969',
                                        width: '320px',
                                    }}
                                    value={this.state.search}
                                />
                            )}
                        </FormattedMessage>
                        <i
                            className="far fa-times-circle"
                            style={{ fontSize: '15px', margin: '10px 10px', position: 'absolute', left: '305px', cursor: 'pointer' }}
                            onClick={() => {
                                this.clearSearch();
                            }}
                        ></i>
                        <i
                            className="fas fa-search"
                            onClick={() => {
                                this.handleSearchData();
                            }}
                            style={{ fontSize: '25px', margin: '5px 10px', cursor: 'pointer' }}
                        ></i>
                    </div>
                    <div>
                        <label className="mx-1">
                            Show
                            <select
                                className="mx-2"
                                name="usersPerPage"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event);
                                }}
                            >
                                <option value="10" defaultValue>
                                    10
                                </option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            entries
                        </label>
                    </div>
                </div>
                <table id="customers">
                    <tbody>
                        <tr>
                            <th
                                onClick={() => {
                                    this.handleSortData('id');
                                }}
                                style={{ width: '100px', textAlign: 'center' }}
                            >
                                <FormattedMessage id="system.number" />
                            </th>
                            <th
                                onClick={() => {
                                    this.handleSortData('firstName');
                                }}
                            >
                                <FormattedMessage id="system.email" />
                            </th>
                            <th>
                                <FormattedMessage id="system.first-name" />
                            </th>
                            <th
                                onClick={() => {
                                    this.handleSortData('lastName');
                                }}
                            >
                                <FormattedMessage id="system.last-name" />
                            </th>
                            <th
                                onClick={() => {
                                    this.handleSortData('address');
                                }}
                            >
                                <FormattedMessage id="system.address" />
                            </th>

                            <th
                                onClick={() => {
                                    this.handleSortData('roleId');
                                }}
                            >
                                <FormattedMessage id="system.role" />
                            </th>
                            <th>
                                <FormattedMessage id="system.action" />
                            </th>
                        </tr>
                        {currentUserPage &&
                            currentUserPage.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td style={{ textAlign: 'center' }}>{item.id}</td>
                                        <td
                                            onClick={(event) => {
                                                this.handleSortData(event);
                                            }}
                                        >
                                            {item.email}
                                        </td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        {language === 'vi' && (
                                            <td>
                                                {item.roleId === 'Admin' ? 'Quản trị viên' : ''}
                                                {item.roleId === 'Doctor' ? 'Bác sỹ' : ''}
                                                {item.roleId === 'Patient' ? 'Bệnh nhân' : ''}
                                            </td>
                                        )}
                                        {language === 'en' && <td>{item.roleId}</td>}

                                        <td style={{ width: '150px' }}>
                                            <button
                                                onClick={() => {
                                                    this.props.openDetailsUser(item);
                                                }}
                                                style={{ border: '1px solid #ca8229' }}
                                            >
                                                <FormattedMessage id="system.detail" />
                                            </button>
                                            <button
                                                className="mx-2"
                                                style={{ border: '1px solid #db0808' }}
                                                onClick={() => this.props.handleDeleteUser(item.id)}
                                            >
                                                <FormattedMessage id="system.delete" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                <div className="pagination-footer">
                    <span>{`Show ${indexOfFirstUser + 1} to ${indexOfLastUser} of ${totalUsers} entries`}</span>
                    <div className="index-buttons">
                        {currentPage === 1 ? (
                            <button
                                onClick={() => {
                                    this.prevPage();
                                }}
                                disabled
                            >
                                <FormattedMessage id="system.previous" />
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    this.prevPage();
                                }}
                            >
                                <FormattedMessage id="system.previous" />
                            </button>
                        )}

                        {pageNumbers.map((number, index) => (
                            <span key={index} className="mx-1">
                                {currentPage === number ? (
                                    <button className="active">{number}</button>
                                ) : (
                                    <button onClick={() => this.changeCurrentPage(number)}>{number}</button>
                                )}
                            </span>
                        ))}
                        {currentPage === totalPages - 1 ? (
                            <button
                                onClick={() => {
                                    this.nextPage();
                                }}
                                disabled
                            >
                                <FormattedMessage id="system.next" />
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    this.nextPage();
                                }}
                            >
                                <FormattedMessage id="system.next" />
                            </button>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default TableUsersForAdmin;
