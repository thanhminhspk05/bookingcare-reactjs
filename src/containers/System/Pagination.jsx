import React, { Component } from 'react';

class Pagination extends Component {
    render() {
        let pageNumbers = [];
        let { totalUsers, usersPerPage, paginate } = this.props;
        for (let i = 1; i < Math.ceil(totalUsers / usersPerPage) + 1; i++) {
            pageNumbers.push(i);
        }
        return (
            <div className="d-flex justify-content-center pagination">
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        style={{ padding: '4px 8px', border: 'none', margin: '20px 5px', background: '#ccc' }}
                    >
                        {number}
                    </button>
                ))}
            </div>
        );
    }
}

export default Pagination;
