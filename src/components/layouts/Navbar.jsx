import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    onLogout(); 
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid p-2">
        <Link className="navbar-brand fw-bold" to="/dashboard">DSA Sheet</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <Link className={`nav-link ${isActive('/dashboard') ? 'active text-warning' : 'text-white'}`} to="/dashboard">Profile</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className={`nav-link ${isActive('/topics') ? 'active text-warning' : 'text-white'}`} to="/topics">Topics</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className={`nav-link ${isActive('/progress') ? 'active text-warning' : 'text-white'}`} to="/progress">Progress</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
