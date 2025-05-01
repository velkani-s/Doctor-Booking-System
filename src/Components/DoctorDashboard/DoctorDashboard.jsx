import React from "react";
import Header from "../Header/Header";
import { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient";
import Footer from "../footer/Footer";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Form } from "react-bootstrap";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  

  // Fetch appointments for the logged-in doctor
  useEffect(() => {
    const storedDoctor = localStorage.getItem("doctor");

    if (!storedDoctor) {
      toast.error("Not logged in. Please log in again.");
      return;
    }

    const doctor = JSON.parse(storedDoctor);
    setDoctorName(doctor.name);
  }, []);

  useEffect(() => {
    if (doctorName) {
      fetchAppointments();
    }
  }, [doctorName]);

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from("Appointments")
      .select("*")
      .eq("doctor", doctorName)
      .order("date", { ascending: true });

    if (error) {
      toast.error("Failed to fetch appointments");
    } else {
      setAppointments(data);
    }
  };

  const handleCancel = async (id) => {
    const { error } = await supabase.from("Appointments").delete().eq("id", id);
    if (error) {
      toast.error("Failed to cancel appointment.");
    } else {
      toast.success("Appointment cancelled.");
      fetchAppointments();
    }
  };
  const openRescheduleModal = (appt) => {
    setEditingAppointment(appt);
    setNewDate(appt.date);
    setNewTime(appt.time);
    setShowModal(true);
  };
  const handleReschedule = async () => {
    const { error } = await supabase
      .from("Appointments")
      .update({ date: newDate, time: newTime })
      .eq("id", editingAppointment.id);
  
    if (error) {
      toast.error("Failed to reschedule appointment.");
    } else {
      toast.success("Appointment rescheduled.");
      setShowModal(false);
      fetchAppointments();
    }
  };
  const formatTime12Hour = (timeStr) => {
    const [hour, minute] = timeStr.split(":");
    const h = parseInt(hour, 10);
    const suffix = h >= 12 ? "PM" : "AM";
    const formattedHour = ((h + 11) % 12 + 1); // converts 0-23 to 1-12
    return `${formattedHour}:${minute} ${suffix}`;
  };
  
  return (
    <>
      <Header />
      <ToastContainer position="top-center" autoClose={3000} />
      <Container>
        <h2 className="m-4">Doctor Dashboard</h2>
        <h5 className="mb-4">Welcome, Dr. {doctorName}</h5>
        <Row>
          <Col>
            {appointments.length > 0 ? (
              appointments.map((appt) => (
                <Card key={appt.id} className="mb-3 shadow-sm ">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <Card.Title className="mb-1">Patient Appointment</Card.Title>
                    <Card.Text>
                      <strong>Date:</strong> {appt.date}
                      <br />
                      <strong>Time:</strong> {formatTime12Hour(appt.time)}

                      <br />
                    </Card.Text>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleCancel(appt.id)}        
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outline-dark"
                      size="sm"
                      className="me-2"
                      onClick={() => openRescheduleModal(appt)}
                    >
                      Reschedule
                    </Button>
                   
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No appointments scheduled.</p>
            )}
          </Col>
        </Row>
      </Container><Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Reschedule Appointment</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Select Date</Form.Label>
        <Form.Control
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Select Time</Form.Label>
        <Form.Control
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Close
    </Button>
    <Button variant="primary" onClick={handleReschedule}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>

      <Footer/>
    </>
  );
};

export default DoctorDashboard;
