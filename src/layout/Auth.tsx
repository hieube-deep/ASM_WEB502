import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function Auth() {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <nav className="navbar navbar-dark bg-primary shadow">
                <div className="container">
                    <Link to="/" className="navbar-brand fw-semibold">
                        <strong>WEB502 App</strong>
                    </Link>
                    <Link to="/list" className="btn btn-light">
                        Quay lại trang chủ
                    </Link>
                </div>
            </nav>

            <div className="flex-grow-1 d-flex align-items-center justify-content-center bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-5">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-dark text-white text-center py-3">
                <p className="mb-0">&copy; 2024 WEB502 App</p>
            </footer>
        </div>
    )
}

export default Auth
