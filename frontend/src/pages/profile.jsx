import React, { useState, useCallback, useEffect } from 'react';

import UsersAPI from '../apis/UsersAPI'

import Page from '../components/Page';
import Profile from '../components/Profile';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './styles/profile-styles.css'

const ProfilePage = (props) => {
  const [loggedIn, setLoggedIn] = useState(props.loggedin || false)
  const [userMethod, setUserMethod] = useState("Login")
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const onFormChange = useCallback((key) => (event) =>{
    setForm({
      ...form,
      [key]: event.currentTarget.value,
    })
  },[form])

  async function onRegister(){
    let test2 = await UsersAPI.postCreate(form);
    if(!test2){
      document.Button.className="Error"
    }
    setLoggedIn(test2[0]);
  };
  async function onLogin(){
    let test = await UsersAPI.postLogin(form);
    setLoggedIn(test);
  };


  const onChangeMethod = useCallback((render) => (method) => {
    setUserMethod(method)
  })
  
  if (!loggedIn){
    

  }
  if (loggedIn){
  return(
    <Page title="Profile">
    <Profile user={form}></Profile>
  </Page>
  )}else{
    if (userMethod === "Login"){
      return(
        <Page title="Login">
        <Form className='formed'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={form["email"]} onChange={onFormChange("email")} type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={form["password"]} onChange={onFormChange("password")} type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" onClick={onLogin}>
            Submit
          </Button>
          <button className='register-btn' onClick={onChangeMethod("Register")}>Register</button>
          {/*type="submit"*/}
        </Form>
        </Page>
      )
    }else{
      return(
        <Page title="Register">
        <Form className='formed'>
        <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control value={form["lastName"]} onChange={onFormChange("lastName")} required type="string" placeholder="Last Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control value={form["firstName"]} onChange={onFormChange("firstName")} required type="string" placeholder="First Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Age</Form.Label>
            <Form.Control value={form["age"]} onChange={onFormChange("age")} required type="number" placeholder="Age" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={form["email"]} onChange={onFormChange("email")} required type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={form["password"]} onChange={onFormChange("password")} required type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" onClick={onRegister}>
            Submit
          </Button>
          <button className='register-btn' onClick={onChangeMethod("Register")}>Login</button>
          {/**/}
        </Form>
        </Page>
      )
    }
  };
};

export default ProfilePage;
