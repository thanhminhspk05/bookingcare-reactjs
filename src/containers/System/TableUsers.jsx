import React, { Component } from 'react';

class TableUsers extends Component {
    render() {
        let currentUsers = this.props.currentUsers;
        console.log(currentUsers);
        let { search } = this.props;
        return (
            <table id="customers">
                <tbody>
                    <tr>
                        <th style={{ width: '50px' }}>Number</th>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Adress</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    {currentUsers &&
                        currentUsers
                            .filter((user) => {
                                return search === ''
                                    ? user
                                    : user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                                          user.lastName.toLowerCase().includes(search.toLowerCase()) ||
                                          user.email.toLowerCase().includes(search.toLowerCase()) ||
                                          user.address.toLowerCase().includes(search.toLowerCase()) ||
                                          user.roleId.toLowerCase().includes(search.toLowerCase());
                            })
                            .map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td style={{ textTransform: 'capitalize' }}>{item.roleId}</td>

                                        <td style={{ width: '150px' }}>
                                            <button
                                                onClick={() => {
                                                    this.props.openDetailsUser(item);
                                                }}
                                                style={{ border: '1px solid #ca8229' }}
                                            >
                                                Details
                                            </button>
                                            <button
                                                className="mx-2"
                                                style={{ border: '1px solid #db0808' }}
                                                onClick={() => this.props.handleDeleteUser(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                </tbody>
            </table>
        );
    }
}

export default TableUsers;
