import { Link, useLocation } from "react-router-dom"
import "./Navigation.css"

export default function Navigation() {
  const location = useLocation()
  
  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <i className="fas fa-graduation-cap me-2 fs-4"></i>
          <span className="brand-text">AMS</span>
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/') ? 'active' : ''}`} 
                to="/"
              >
                <i className="fas fa-home me-1"></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/add-class') ? 'active' : ''}`} 
                to="/add-class"
              >
                <i className="fas fa-plus-circle me-1"></i>
                Add Class
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/view-attendance') ? 'active' : ''}`} 
                to="/view-attendance"
              >
                <i className="fas fa-chart-bar me-1"></i>
                View Attendance
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}