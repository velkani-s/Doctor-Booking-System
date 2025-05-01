import React from "react";
import Header from "../Header/Header";
import "./page.css";
import Doctor from "../../assets/Doctor-images.jpg";
import Footer from "../footer/Footer";
const page = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="gredient-border">
          <section className="content row align-items-center ">
            <div className="heading col-lg-6 text-center">
              <h2>Out Best Doctors care about get you well</h2>
              <h2>Book Your Appointment Now! </h2>
            </div>
            <div className="heading col-lg-6 text-center">
              <img src={Doctor} className="img-fluid" id="doctor-img" />
            </div>
          </section>
        </div>
      </div>
      <div className="container">
        <div className="mid-section my-5 py-4 px-3 text-center">
          <section className="align-items-center">
            <div className="text">
              <h3 className="mb3">We Have the Best Doctors for Your Care</h3>
              <p className="lead">
                Our expert team of certified and experienced doctors is
                dedicated to providing you with personalized, top-quality
                healthcare. From general consultations to specialized
                treatments, we make your wellness our priority.
              </p>
              <p>
                Book an appointment with ease and meet compassionate
                professionals ready to help you every step of the way.
              </p>
            </div>
          </section>
        </div>
      </div>
      <div className="container">
        <div className="testimonials my-5 text-center">
          <h3 className="mb-4">What Our Patients Say</h3>
          <div className="row">
            <div className="col-md-4">
              <div className="testimonial-box p-3">
                <p>
                  "Booking an appointment was so easy and fast. The doctor was
                  friendly and took great care of me!"
                </p>
                <strong>- Sarah M.</strong>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-box p-3">
                <p>
                  "The entire process from booking to consultation was seamless.
                  Highly recommend their service!"
                </p>
                <strong>- James D.</strong>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-box p-3">
                <p>
                  "I found a great specialist within minutes. The system is
                  reliable, and the care was top-notch."
                </p>
                <strong>- Priya K.</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="doctor-profiles my-5 text-center">
          <h3 className="mb-4">Meet Our Experts</h3>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-card p-3">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Dr. Lisa Ann"
                  className="img-fluid rounded-circle mb-2"
                  style={{ height: "150px", width: "200px" }}
                />
                <h5>Dr. Lisa Ann</h5>
                <p>Cardiologist - 12 Years Experience</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="profile-card p-3">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Dr. Ahmed Khan"
                  className="img-fluid rounded-circle mb-2"
                  style={{ height: "150px", width: "150px" }}
                />
                <h5>Dr. Ahmed Khan</h5>
                <p>Dermatologist - 9 Years Experience</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="profile-card p-3">
                <img
                  src="https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?semt=ais_hybrid&w=740"
                  alt="Dr. Neha Patel"
                  className="img-fluid rounded-circle mb-2"
                  style={{ height: "150px", width: "100px" }}
                />
                <h5>Dr. Neha Patel</h5>
                <p>Pediatrician - 15 Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Footer/>
    </>
  );
};

export default page;
