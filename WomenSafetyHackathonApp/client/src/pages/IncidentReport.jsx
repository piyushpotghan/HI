import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Dash/Sidebar";
import toast from "react-hot-toast";
import { incidentData } from "../data/incidentData";

const IncidentReport = () => {
  const [incidentReport, setIncidentReport] = useState([]);
  const [report, setReport] = useState("");

  // Load incident data from localStorage or fallback to static
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("incidentReports"));
    if (!saved) {
      localStorage.setItem("incidentReports", JSON.stringify(incidentData));
      setIncidentReport(incidentData);
    } else {
      setIncidentReport(saved);
    }
  }, []);

  // Acknowledge button
  const acknowledge = (id) => {
    const updated = incidentReport.map((i) =>
      i._id === id ? { ...i, isSeen: true } : i
    );
    setIncidentReport(updated);
    localStorage.setItem("incidentReports", JSON.stringify(updated));
    toast.success("Incident acknowledged");
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container table-responsive mx-3">
        <h2 className="text-center my-4">Women Incident Reports</h2>

        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>Name</th>
              <th>Report</th>
              <th>Address</th>
              <th>Pincode</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Map View</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {incidentReport.map((i) => (
              <tr key={i._id}>
                <td style={{ color: i.isSeen ? "green" : "red" }}>{i.uname}</td>
                <td>
                  <button
                    className="btn btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#incidentModal"
                    onClick={() => setReport(i.report)}
                  >
                    View
                  </button>
                </td>
                <td>{i.address}</td>
                <td>{i.pincode}</td>
                <td>{i.createdAt.split("T")[0]} {i.createdAt.split("T")[1].split(".")[0]}</td>
                <td>
                  {i.isSeen ? (
                    <button className="btn btn-success" disabled>Acknowledged</button>
                  ) : (
                    <button className="btn btn-danger" onClick={() => acknowledge(i._id)}>Acknowledge</button>
                  )}
                </td>
                <td>
                  <a href={i.mapLink} target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-primary">View Map</button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <div className="modal fade" id="incidentModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Incident Report</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">{report}</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentReport;
