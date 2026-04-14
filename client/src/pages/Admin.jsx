import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import './Admin.css';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const backend_url = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');

            const res = await fetch(
                `${backend_url}/api/auth/admin/users`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.status === 401 || res.status === 403) {
                alert('Unauthorized');
                return;
            }

            const data = await res.json();
            setUsers(data.contacts);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error('Failed to load users');
        }
    };

    return (
        <div className="admin-page">
            <Navbar userName="Admin" />

            <div className="admin-container">
                <h1>Admin Panel</h1>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="admin-pagination">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Prev
                    </button>

                    <span>
                        Page {page} of {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Admin;
