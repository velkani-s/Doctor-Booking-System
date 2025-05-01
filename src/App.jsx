import "./App.css";
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Page from "./Components/Page/page";
import PatientRegister from "./Components/register/PatientRegister";
import DoctorRegister from "./Components/DoctorRegister/DoctorRegister";
import PatientLogin from "./Components/register/PatientLogin/PatientLogin";
import PatientDashboard from "./Components/PaatientDashboard/PatientDashboard";
import DoctorLogin from "./Components/DoctorRegister/DoctorLogin/DoctorLogin";
import DoctorDashboard from "./Components/DoctorDashboard/DoctorDashboard";

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Page/>} />
      <Route path="/patientRegister" element={<PatientRegister/>} />
      <Route path="/PatientLogin" element={<PatientLogin/>} />
      <Route path="/patientDashboard" element={<PatientDashboard/>} />
      <Route path="/DoctorRegister" element={<DoctorRegister/>} />
      <Route path="/DoctorLogin" element={<DoctorLogin/>} />
      <Route path="/DoctorDashboard" element={<DoctorDashboard/>} />

     </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
