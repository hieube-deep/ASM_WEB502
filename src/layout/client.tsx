import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function Client() {
  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-md navbar-dark bg-primary shadow">
        <div className="container">
          <Link to="/list" className="navbar-brand fw-semibold">
            <strong>WEB502 App</strong>
          </Link>

          <div className="d-flex gap-2">
            <Link to="/auth/login" className="btn btn-light">
              Đăng nhập
            </Link>
            <Link to="/auth/register" className="btn btn-light">
              Đăng ký
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="container mt-5 text-center">
        <h1 className="display-4 fw-bold mb-4">
          Chào mừng đến với WEB502
        </h1>
        <Outlet />
      </div>
    </div>
  )
}

export default Client