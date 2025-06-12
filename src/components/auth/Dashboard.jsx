import { useEffect, useState } from "react";
import { ApiEndPoint } from "../../data/Endpoint";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiEndPoint.get("dashboard");
        setUser(data.user);
      } catch (err) {
        console.error("Error in fetching dashboard", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container px-3 py-4">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h3 className="heading mb-5">Dashboard</h3>
          </div>

          <div className="col-lg-8 mb-4 mb-lg-0">
            <div className="card shadow-lg border-0 rounded-4 h-100">
              <div className="card-body text-center p-5">
                <h3 className="mb-2 fw-bold">Welcome {user.name}</h3>
                <p className="text-muted mb-3 small">
                  <b>Email: </b>
                  {user.email}
                </p>
                <div className="d-grid">
                 
                    <Link to="/topics" className="login-submit-btn mt-2 text-decoration-none" style={{'width': '50%', 'margin': 'auto'}}>Explore DSA Topics</Link>
               
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
