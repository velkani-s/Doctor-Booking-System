import React from "react";
import Header from "../Header/Header";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  Form,
} from "react-bootstrap";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("Select Doctor");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointments, setAppointments] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [latestAppointment, setLatestAppointment] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);

  const fetchAppointments = async () => {
    const { data, error } = await supabase.from("Appointments").select("*");
    if (error) {
      console.error("Error fetching appointments:", error);
    } else {
      setAppointments(data);
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await supabase
        .from("DoctorData")
        .select("id, name");
      if (error) {
        console.error("Error fetching doctors:", error);
      } else {
        setDoctors(data);
      }
    };

    fetchDoctors();
    fetchAppointments();
    // Get patient info from localStorage
    const storedPatient = localStorage.getItem("patient");
    if (storedPatient) {
      const patient = JSON.parse(storedPatient);
      setPatientInfo(patient);
    } else {
      toast.error("Patient not logged in.");
    }
  }, []);

  const handleSelect = (eventKey) => {
    setSelectedDoctor(eventKey);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Selected Doctor:", selectedDoctor);
    // Add your appointment booking logic here
    event.preventDefault();

    const today = new Date();
    const selected = new Date(selectedDate);

    // Clear time portion for accurate comparison
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    if (selectedDoctor === "Select Doctor" || !selectedDate || !selectedTime) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (selected < today) {
      toast.error("Please select a valid date (today or future).");
      return;
    }

    const { error } = await supabase.from("Appointments").insert([
      {
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
      },
    ]);

    if (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment. Try again.");
    } else {
      fetchAppointments();
      toast.success("Appointment booked successfully!");
      setLatestAppointment({
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
      });
      setSelectedDoctor("Select Doctor");
      setSelectedDate("");
      setSelectedTime("");
      console.log("Appointment booked successfully!");
    }
  };
  const handleCancel = async (id) => {
    const { error } = await supabase.from("Appointments").delete().eq("id", id);
    if (error) {
      toast.error("Failed to cancel appointment.");
    } else {
      toast.success("Appointment cancelled.");
      fetchAppointments(); // Refresh list
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
      toast.error("Failed to reschedule.");
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
    const formattedHour = ((h + 11) % 12 + 1);
    return `${formattedHour}:${minute} ${suffix}`;
  };
  

  return (
    <>
      <Header />
      <ToastContainer position="top-center" autoClose={3000} />
      <Container>
        <h2 className="m-4">Patient Dashboard</h2>
        {patientInfo && (
          <h5 className="mb-4 text-muted">
            Logged in as: {patientInfo.name || patientInfo.email}
          </h5>
        )}
        <Row>
          <Col lg={4} sm={12}>
            <Card className="shadow">
              <Card.Body>
                <Card.Title className="mb-4">Book New Appointment</Card.Title>

                <Form onSubmit={handleSubmit}>
                  {/* Dropdown */}
                  <Form.Group className="mb-3">
                    <Dropdown onSelect={handleSelect}>
                      <Dropdown.Toggle
                        variant="outline-dark"
                        id="dropdown-basic"
                      >
                        {selectedDoctor}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {doctors.map((doctor) => (
                          <Dropdown.Item key={doctor.id} eventKey={doctor.name}>
                            {doctor.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>

                  {/* Date Picker */}
                  <Form.Group className="mb-3" controlId="datePicker">
                    <Form.Label>Select Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </Form.Group>

                  {/* Time Picker */}
                  <Form.Group className="mb-3" controlId="timePicker">
                    <Form.Label>Select Time</Form.Label>
                    <Form.Control
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" className="w-100">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8} sm={12}>
            <Card>
              <Card.Header>Your Booked Appointments</Card.Header>
              {appointments.length > 0 ? (
                appointments.map((appt, index) => (
                  <Card className="m-3" key={index}>
                    <Card.Body>
                      <Card.Title>{appt.doctor}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                      {appt.date} at {formatTime12Hour(appt.time)}

                      </Card.Subtitle>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleCancel(appt.id)}
                        className="me-2"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => openRescheduleModal(appt)}
                      >
                        Reschedule
                      </Button>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Card.Body>
                  <Card.Title>No Appointments Booked</Card.Title>
                </Card.Body>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reschedule Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="datePicker">
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </Form.Group>

            {/* Time Picker */}
            <Form.Group className="mb-3" controlId="timePicker">
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
            Reschedule
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default PatientDashboard;
