import { useEffect, useState } from "react";
import { ApiEndPoint } from "../data/Endpoint";

const Progress = () => {
  const [progress, setProgress] = useState([]);

  const fetchData = async () => {
    try {
      const data = await ApiEndPoint.get("progress");
      setProgress(data.progress || []);
    } catch (err) {
      console.error("Error in fetching progress", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container px-3 py-4">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <h3 className="heading mb-5">Progress Report</h3>
        </div>

        <div className="col-12">
          <div className="table-responsive shadow-md">
            {progress.length === 0 ? (
              <div className="alert alert-success text-center" role="alert">
              No DSA Progress data found.
            </div>
            ) : (
              <table className="table table-bordered align-middle text-center">
                <thead style={{ backgroundColor: '#6e22e9bf', color: 'white' }}>
                  <tr>
                    <th>Topic</th>
                    <th>Hard</th>
                    <th>Medium</th>
                    <th>Easy</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {progress.map((topic, i) => (
                    <tr key={i}>
                      <td className="fw-semibold">{topic.topicName}</td>
                      <td>{topic.progress?.Hard || "0%"}</td>
                      <td>{topic.progress?.Medium || "0%"}</td>
                      <td>{topic.progress?.Easy || "0%"}</td>
                      <td>
                        <span
                          className={`badge ${
                            topic.topicStatus === "Done" ? "bg-success" : "bg-dark"
                          } text-white`}
                        >
                          {topic.topicStatus === "Done" ? "Completed" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
