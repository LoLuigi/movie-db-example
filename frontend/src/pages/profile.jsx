import React, { useState, useCallback, useEffect, useContext } from 'react';

import UsersAPI from '../apis/UsersAPI'
import UserContext from '../config/userContext';

import Page from '../components/Page';
import Profile from '../components/Profile';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './styles/profile-styles.css'

const ProfilePage = (props) => {
  const [user, setUser] = useContext(UserContext)
  const [userMethod, setUserMethod] = useState("Login")
  const [form, setForm] = useState({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    age: ""
  })
  const onFormChange = useCallback((key) => (event) =>{
    setForm({
      ...form,
      [key]: event.currentTarget.value,
    })
  },[form])

  async function onRegister(){
    let _user = await UsersAPI.postCreate(form);
    setUser(_user);
  };
  async function onLogin(){
    let _user = await UsersAPI.postLogin(form);
    setUser(_user);
  };
  const onLogOut=useCallback((render) => (set)=>{
    setForm({
      ...form,
      email: "",
      password: "",
      lastName: "",
      firstName: "",
      age: ""})
    console.log(form)
  })



  const onChangeMethod = useCallback((render) => (method) => {
    setUserMethod(method)
  })
  // onlogout={onLogOut(null)}
  if (user!==null){
  return(
    <Page title="Profile">
    <Profile logOut={onLogOut()}></Profile>
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
            <Form.Control value={form["lastName"]} onChange={onFormChange("lastName")} type="string" placeholder="Last Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control value={form["firstName"]} onChange={onFormChange("firstName")} type="string" placeholder="First Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Age</Form.Label>
            <Form.Control value={form["age"]} onChange={onFormChange("age")} type="number" placeholder="Age" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={form["email"]} onChange={onFormChange("email")} type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={form["password"]} onChange={onFormChange("password")} type="password" placeholder="Password" />
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
