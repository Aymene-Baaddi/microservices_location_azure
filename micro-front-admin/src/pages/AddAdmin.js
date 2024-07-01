import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import { Sidebar } from "react-pro-sidebar";


const AddAdmin = () => {

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (admin.password !== admin.repeatPassword) {
        console.log("Les mots de passe ne correspondent pas");
        return;
      }

      const response = await axios.post("http://localhost:8080/api/admin/register", {
        name: admin.name,
        email: admin.email,
        password: admin.password
      });

  
      setAdmin({
        name: "",
        email: "",
        password: "",
        repeatPassword: ""
      });

      console.log("Admin ajouté avec succès", response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'admin", error);
    }
  };



  return (
    
    <MDBContainer className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
      <MDBCard className="w-75 p-4" style={{display:"flex",flexDirection:"row",alignItems:"center", height:'80vh',marginLeft:"25%",marginTop:"5%", borderRadius: '25px', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)', }}>
        <MDBCardBody className="p-0" style={{padding:'20px 0 20px 0',}}>
          <MDBRow className="g-0">
            <MDBCol md='6' className="p-4 bg-light" style={{ borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px' }}>
              <form onSubmit={handleSubmit}>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Ajouter un Admin</p>
                <div className="text-center mb-4">
                  <MDBInput placeholder="Name" id='form1' type='text' name="name" value={admin.name} onChange={handleChange} />
                </div>
                <div className="text-center mb-4">
                  <MDBInput placeholder="Email" id='form2' type='email' name="email" value={admin.email} onChange={handleChange} />
                </div>
                <div className="text-center mb-4">
                  <MDBInput placeholder="Password" id='form3' type='password' name="password" value={admin.password} onChange={handleChange} />
                </div>
                <div className="text-center mb-4">
                  <MDBInput placeholder="Repeat the password" id='form4' type='password' name="repeatPassword" value={admin.repeatPassword} onChange={handleChange} />
                </div>
                <MDBBtn type="submit" size='lg' className="w-100" style={{backgroundColor:'black'}}>Add Admin</MDBBtn>
              </form>
            </MDBCol>
            <MDBCol md='6' className="p-0">
              <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' alt="signup" className="w-100 h-100" style={{ borderTopRightRadius: '25px', borderBottomRightRadius: '25px' }} />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    
  );
  
}

export default AddAdmin;