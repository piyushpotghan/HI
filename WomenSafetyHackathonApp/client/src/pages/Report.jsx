import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/auth';

import reports from '../images/report.png';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const Report = () => {
  const [report, setReport] = useState('');
  const [pincodeOfIncident, setPincodeOfIncident] = useState('');
  const [address, setAddress] = useState('');

  const [auth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!report.trim()) return toast.error('Report is required');
    if (!pincodeOfIncident.trim()) return toast.error('Pincode is required');
    if (!address.trim()) return toast.error('Address is required');

    try {
      const res = await axios.post(
        'http://localhost:3000/api/v1/incidents',
        {
          report,
          pincodeOfIncident,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success('Incident reported successfully');
        setReport('');
        setPincodeOfIncident('');
        setAddress('');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to send report');
    }
  };

  return (
    <>
      <Navbar />

      <div className="marginStyle">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="row border rounded-5 p-3 bg-white shadow box-area reverseCol">

            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <img src={reports} className="img-fluid" alt="report" />
            </div>

            <div className="col-md-6">
              <h2>Incident Report</h2>
              <p>We will take action as soon as possible</p>

              <input
                type="number"
                className="form-control mb-3"
                placeholder="Pincode"
                value={pincodeOfIncident}
                onChange={(e) => setPincodeOfIncident(e.target.value)}
              />

              <textarea
                rows={3}
                className="form-control mb-3"
                placeholder="Incident report"
                value={report}
                onChange={(e) => setReport(e.target.value)}
              />

              <textarea
                rows={3}
                className="form-control mb-3"
                placeholder="Incident address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <button
                className="btn btn-lg text-white"
                style={{ backgroundColor: 'blueviolet', width: '100%' }}
                onClick={handleSubmit}
              >
                Submit Incident
              </button>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Report;