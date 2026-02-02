import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Dash/Sidebar";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";

const Dashboard = () => {
  const [incidentReport, setIncidentReport] = useState([]);
  const [report, setReport] = useState("");
  const [ack, setAck] = useState(false);

  const [auth] = useAuth();

  /* ================= GET ALL INCIDENTS ================= */
  const getAllIncident = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/v1/incidents",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (res.status === 200) {
        const data = await res.json();
        setIncidentReport(data);
      } else {
        toast.error("Failed to fetch incidents");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  /* ================= ACKNOWLEDGE INCIDENT ================= */
  const acknowledge = async (incId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/incidents/${incId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Acknowledged successfully");
        setAck(!ack);
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    getAllIncident();
    window.scrollTo(0, 0);
  }, [ack]);

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
            </tr>
          </thead>

          <tbody className="text-center">
            {incidentReport.map((p) => (
              <tr key={p._id}>
                <td style={{ color: p.isSeen ? "green" : "red" }}>
                  {p.uname}
                </td>

                <td>
                  <button
                    className="btn btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => setReport(p.report)}
                  >
                    View
                  </button>
                </td>

                <td>{p.address}</td>
                <td>{p.pincode}</td>
                <td>
                  {p.createdAt?.split("T")[0]}{" "}
                  {p.createdAt?.split("T")[1]?.split(".")[0]}
                </td>

                <td>
                  {p.isSeen ? (
                    <button className="btn btn-success" disabled>
                      Acknowledged
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger"
                      onClick={() => acknowledge(p._id)}
                    >
                      Acknowledge
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Incident Report</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">{report}</div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;