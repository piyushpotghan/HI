import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Dash/Sidebar";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [auth] = useAuth();
  const [emerg, setEmer] = useState([]);
  const [ack, setAck] = useState(false);
  const [txt, setTxt] = useState("");
  const [currentChatId, setCurrentChatId] = useState(null); // track which chat modal is open
  const [chats, setChats] = useState([]);

  // Fetch emergency data
  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/emergency");
        if (res.ok) {
          const data = await res.json();
          setEmer(data);
        } else {
          toast.error("Failed to fetch emergencies!");
        }
      } catch (err) {
        console.log(err);
        toast.error("Server error!");
      }
    };
    fetchEmergencies();
  }, [ack]);

  // Acknowledge emergency
  const ackn = async (uid) => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/emergency/${uid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        toast.success("Updated Successfully");
        setAck(!ack);
      } else {
        toast.error("Failed to update!");
      }
    } catch (e) {
      console.log(e);
      toast.error("Server error!");
    }
  };

  // Fetch chats for a specific emergency
  const getChats = async (emergId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/chats/${auth?.user?._id}/emerg/${emergId}`
      );
      if (res.ok) {
        const data = await res.json();
        setChats(data || []);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Add chat message
  const addChat = async (receiverId, emergId, e) => {
    e.preventDefault(); // prevent page reload
    try {
      const payload = {
        senderId: auth?.user?._id,
        receiverId,
        text: txt,
        emergId,
      };
      const res = await fetch("http://localhost:3000/api/v1/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 201) {
        toast.success("Message sent!");
        setTxt("");
        getChats(emergId); // refresh chat
      } else {
        toast.error("Failed to send message!");
      }
    } catch (e) {
      console.log(e);
      toast.error("Server error!");
    }
  };

  return (
    <div className="d-flex justify-content-start">
      <Sidebar />
      <div className="container table-responsive mx-3">
        <div className="features_wrapper" style={{ marginTop: "-50px" }}>
          <div className="row">
            <div className="col-12 text-center">
              <p className="features_subtitle">Latest Women Emergency Alert!</p>
              <h2 className="features_title">Women Emergency Data</h2>
            </div>
          </div>
        </div>

        <table className="table table-striped table-bordered table-hover" style={{ marginTop: "-50px" }}>
          <thead className="table-dark text-center">
            <tr>
              <th>Name</th>
              <th>Address of Incident</th>
              <th>Map View</th>
              <th>Emergency No.</th>
              <th>Incident recorded at</th>
              <th>Acknowledgement Status</th>
              <th>Chat with victim</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {emerg.map((ee) => (
              <React.Fragment key={ee._id}>
                <tr>
                  <th style={{ color: ee.isResolved ? "green" : "red" }}>{ee.username}</th>
                  <td>{ee.addressOfInc}</td>
                  <td>
                    <a href={ee.mapLct} target="_blank" rel="noopener noreferrer">
                      <button className="btn btn-primary">View in map</button>
                    </a>
                  </td>
                  <td>{ee.emergencyNo}</td>
                  <td>{new Date(ee.createdAt).toLocaleString()}</td>
                  <td>
                    {ee.isResolved ? (
                      <button className="btn btn-success">Acknowledged</button>
                    ) : (
                      <button className="btn btn-danger" onClick={() => ackn(ee._id)}>
                        Acknowledge
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-dark"
                      data-bs-toggle="modal"
                      data-bs-target={`#chatModal-${ee._id}`}
                      onClick={() => {
                        setCurrentChatId(ee._id);
                        getChats(ee._id);
                      }}
                    >
                      Chat
                    </button>
                  </td>
                </tr>

                {/* Modal for chat */}
                <div
                  className="modal fade"
                  id={`chatModal-${ee._id}`}
                  tabIndex="-1"
                  aria-labelledby={`chatModalLabel-${ee._id}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id={`chatModalLabel-${ee._id}`}>
                          Chat with {ee.username}
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div className="chat-box" style={{ maxHeight: "300px", overflowY: "auto" }}>
                          {chats.map((c) => (
                            <div
                              key={c._id}
                              className={`d-flex ${c.senderId === auth?.user?._id ? "justify-content-end" : "justify-content-start"} my-1`}
                            >
                              <span className="badge bg-secondary">{c.text}</span>
                            </div>
                          ))}
                        </div>

                        <form onSubmit={(e) => addChat(ee.userId, ee._id, e)} className="d-flex mt-2">
                          <input
                            className="form-control me-2"
                            value={txt}
                            onChange={(e) => setTxt(e.target.value)}
                            type="text"
                            placeholder="Enter your message"
                          />
                          <button className="btn btn-primary" type="submit">
                            Send
                          </button>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
