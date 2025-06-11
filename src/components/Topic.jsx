import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApiEndPoint } from "../data/Endpoint";

const Topic = () => {
  const [topics, setTopics] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    try {
      const data = await ApiEndPoint.get("topics");
      setTopics(data.topics);
    } catch (err) {
      console.error("Error in fetching topics", err);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleCheckboxChange = async (topicId, subtopicId, currentStatus) => {
    const newStatus = currentStatus === 'Done' ? 'Pending' : 'Done';

    try {
      const response = await ApiEndPoint.post(
        {
          topicId,
          subtopicId,
          status: newStatus,
        },
        "sub-topic-status"
      );

      if (response.status) {
        setRefresh((prev) => !prev);
      } else {
        console.error("Failed to update subtopic status");
      }
    } catch (err) {
      console.error("API error:", err);
    }
  };

  return (
    <div className="container px-3 py-4">
      <div className="row justify-content-center">
        <div className="col-12 text-center mb-4">
          <h3 className="heading">Topics</h3>
          <small className="text-muted">
            DSA Like a Pro — The Ultimate Coding Adventure!
          </small>
        </div>

        <div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">
          {topics.length === 0 ? (
            <div className="alert alert-success text-center" role="alert">
              No DSA topics added yet.
            </div>
          ) : (
            topics.map((topic, index) => (
              <div
                className="accordion-item mb-3 rounded-3 overflow-hidden"
                style={{ border: "1px solid #6719e4" }}
                key={index}
              >
                <h2 className="accordion-header" id={`heading-${index}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${index}`}
                    aria-expanded="false"
                    aria-controls={`collapse-${index}`}
                  >
                    {topic.name}
                    <span className={`badge ${
                                    topic.status === "Done" ? "bg-success" : "bg-dark"
                                  } text-white ms-2`}>
                      {topic.status || "Pending"}
                    </span>
                  </button>
                </h2>
                <div
                  id={`collapse-${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading-${index}`}
                >
                  <div className="accordion-body">
                    <h5 className="mb-2">Sub Topics</h5>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Leetcode</th>
                          <th>YouTube</th>
                          <th>Article</th>
                          <th>Level</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topic.subtopics && topic.subtopics.length > 0 ? (
                          topic.subtopics.map((sub, subIndex) => (
                            <tr key={subIndex}>
                              <td>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  defaultChecked={sub.status === "Done"}
                                  onChange={() =>
                                    handleCheckboxChange(topic._id, sub._id, sub.status)
                                  }
                                  style={{
                                    cursor: "pointer",
                                    transform: "scale(1.3)",
                                    accentColor: sub.status === "Done" ? "#6719e4" : "#ccc",
                                  }}
                                />
                              </td>
                              <td>{sub.name}</td>
                              <td>
                                <Link to={sub.leetcode || "/"}>Practice</Link>
                              </td>
                              <td>
                                <Link to={sub.youTube || "/"}>Watch</Link>
                              </td>
                              <td>
                                <Link to={sub.articleLink || "/"}>Read</Link>
                              </td>
                              <td>{sub.level}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    sub.status === "Done" ? "bg-success" : "bg-warning"
                                  } text-white`}
                                >
                                  {sub.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center text-muted">
                              No subtopics available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Topic;
