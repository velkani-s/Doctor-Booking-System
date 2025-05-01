import React from "react";
import './Footer.css'

const Footer = () => {
  return (
    <>
    
      <footer className="footer mt-5 pt-4 pb-3">
        <div className="container text-center text-md-start">
          <div className="row">
            <div className="col-md-4 mb-3">
              <h5 className="footer-title">Nvron Life Science</h5>
              <p>
                Your trusted platform to book appointments with expert doctors
                anytime, anywhere.
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Find a Doctor</a>
                </li>
                <li>
                  <a href="#">Book Appointment</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Contact Us</h5>
            <a href="https://www.nvronlifescience.com/about-us"><p>Email: support@nvronlifescience.com</p></a>
              <p>Phone: +1 234 567 890</p>
            
            </div>
          </div>
          <hr />
          <div className="text-center small">
            © {new Date().getFullYear()} Nvron Life Science. All rights reserved.
          </div>
        </div>
      </footer>
      
    </>
  );
};

export default Footer;
