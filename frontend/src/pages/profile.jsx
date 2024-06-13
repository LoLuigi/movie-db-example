import React, { useState, useCallback, useEffect, useContext } from 'react';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'

import UsersAPI from '../apis/UsersAPI'
import UserContext from '../config/userContext';
import ThemeContext from '../config/themeContext';

import Themes from '../components/Themes';
import Page from '../components/Page';
import Profile from '../components/Profile';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import './styles/profile-styles.css'

const ProfilePage = (props) => {
  const [user, setUser] = useContext(UserContext)
  const [theme, setTheme] = useContext(ThemeContext)
  const [userMethod, setUserMethod] = useState("Login")
  const [type, setType] = useState('password')
  const [icon, setIcon] = useState(eyeOff);

  const [form, setForm] = useState({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    age: "",
    theme: "default"
  })
  const [userInfo, setUserInfo] = useState(form)

  const onThemeChange = useCallback((key) =>{
    const { target: {value}} = key
    setTheme(value)
    setForm({
        ...form,
        "theme": value
      })
    })


  async function getUser(){
    let _user = await UsersAPI.getUser(form.email || user);
    setUserInfo(_user);
    setForm({
      email: _user.email,
      password: _user.password,
      lastName: _user.lastName,
      firstName: _user.firstName,
      age: _user.age,
      theme: _user.theme
    });
    if (_user.theme !== theme) {
      if (_user.theme !==undefined){
        setTheme(_user.theme)
      }
    }
  }

  const onFormChange = useCallback((key) => (event) =>{
    setForm({
      ...form,
      [key]: event.currentTarget.value,
    })
  },[form])

  async function onRegister(){
    let _user = await UsersAPI.postCreate(form);
    setUser(_user);
    onTheme()
  };
  async function onLogin(){
    let _user = await UsersAPI.postLogin(form);
    setUser(_user);
    onTheme()
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
    setTheme("default")
  })

  const onTheme = () => {
    getUser()
  }
  const onEditCancel = () => {
    setUserMethod("Login")
  }

  const onEdit = useCallback((render)=> (set)=>{
    getUser()
    setUserMethod("Edit")
  })
  async function onEditSend(){
    let _user = await UsersAPI.postEdit(form);
    setUser(_user)
    setUserMethod("Login")
  }

  const onChangeMethod = useCallback((render) => (event) => {
    const { target: {value} } = event
    setUserMethod(value)
  })  

  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }
 }

  if (user!==null){
    if (userMethod === "Edit"){
      return(
        <Page title="Edit">
        <Form className='formed'>
        <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control value={form["lastName"]} onChange={onFormChange("lastName")} type="string" placeholder={userInfo.lastName} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control value={form["firstName"]} onChange={onFormChange("firstName")} type="string" placeholder={userInfo.firstName} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Birthday</Form.Label>
            <Form.Control value={form["age"]} as='input' onChange={onFormChange("age")} type="text" placeholder={userInfo.age} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control disabled="true" value={form["email"]} onChange={onFormChange("email")} type="email" placeholder={userInfo.email} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <span class="eye flex justify-around items-center" onClick={handleToggle}>
                  <Icon class="absolute mr-10" icon={icon} size={25}/>
            </span>
            <Form.Control value={form["password"]} onChange={onFormChange("password")} type={type} placeholder={userInfo.password}/>
          </Form.Group>
          <Form.Group className="themeChanger">
            <Form.Label>Theme</Form.Label>
            <Themes theme={theme} onChange={onThemeChange} user={user}></Themes>
          </Form.Group>
          <Button variant="primary" onClick={onEditSend}>
            Send Edit
          </Button>
          <Link to={'/profile'}>
            <Button variant="primary cancel" onClick={onEditCancel}> 
              Cancel Edit
            </Button>
          </Link>
        </Form>
        </Page>
      )
    }else{
      return(
        <Page title="Profile">
        <Profile edit={onEdit()} logOut={onLogOut()}></Profile>
        </Page>
      )}

  }else{
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
    }if (userMethod === "Register"){
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
