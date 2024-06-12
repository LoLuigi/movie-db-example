import React, { useState, useCallback, useEffect, useContext } from 'react';

import UsersAPI from '../apis/UsersAPI'
import UserContext from '../config/userContext';

import Page from '../components/Page';
import Profile from '../components/Profile';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ThemeContext from '../config/themeContext';

import './styles/profile-styles.css'

const ProfilePage = (props) => {
  const [user, setUser] = useContext(UserContext)
  const [theme, setTheme] = useContext(ThemeContext)
  const [userMethod, setUserMethod] = useState("Login")
  const [form, setForm] = useState({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    age: "",
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
      age: "",
      theme:""
    })
    console.log(form)
  })

  const onChangeMethod = useCallback((render) => (event) => {
    console.log(event);
    const { target: {value} } = event
    console.log(value);
    setUserMethod(value)
  })  


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
              <Form.Control value={form["email"]} onChange={onFormChange("email")} type="email" placeholder="someone@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control value={form["password"]} onChange={onFormChange("password")} type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" onClick={onLogin}>
              Login
            </Button>
            <button value="Register" className='register-btn' onClick={onChangeMethod()}>Or Register</button>
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
            <Form.Group className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control value={form["age"]} as='input' onChange={onFormChange("age")} type="text" placeholder="DD.MM.YYYY" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control value={form["email"]} onChange={onFormChange("email")} type="email" placeholder="someone@example.com" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control value={form["password"]} onChange={onFormChange("password")} type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" onClick={onRegister}>
              Register
            </Button>
            <button value="Login" className='register-btn' onClick={onChangeMethod()}>Or Login</button>
            {/**/}
          </Form>
          </Page>
        )
      }
    }
};

export default ProfilePage;
