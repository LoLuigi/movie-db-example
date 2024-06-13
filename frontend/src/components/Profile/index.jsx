import React, { useCallback, useEffect, useState, useContext } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';  
import UsersAPI from '../../apis/UsersAPI'

import { Link, useLoaderData } from 'react-router-dom';
import './styles.css'
import UserContext from '../../config/userContext';


export async function loader(info){
    const userInformation = await UsersAPI.getUser(info)
    return userInformation 
}

export default function Profile(props) {
    const [userInformation, setUserInformation] = useState({})
    const [user, setUser] = useContext(UserContext)
    let reload = false
    useEffect(()=>{
        loader(user)
    }, [])
    async function loader(info){
        let result = await UsersAPI.getUser(info)
        setUserInformation(result)
    }

    const onLogOut = useCallback((load)=>(click) =>{
        setUser(null)
        props.logOut()
    })

    const onEdit = useCallback((load)=>(click) =>{
        props.edit()
    })


    return (
        <section className="vh-100">
        <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="6" className="mb-4 mb-lg-0">
                <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                <MDBRow className="g-0">
                    <MDBCol md="4" className="gradient-custom text-center"
                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                    {/* <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                        alt="Avatar" className="my-5" fluid /> */}
                    <MDBTypography tag="h5" className='card-text'>{`Hello`}</MDBTypography>
                    <MDBTypography tag="h5" className='card-text'>{`${userInformation.firstName} ${userInformation.lastName}`}</MDBTypography>
                    <MDBIcon far icon="edit mb-5" />
                    </MDBCol>
                    <MDBCol md="8">
                    <MDBCardBody className="p-4">
                        <MDBTypography tag="h6">Information</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Email</MDBTypography>
                            <MDBCardText className="text-muted">{userInformation.email}</MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Birthday</MDBTypography>
                            <MDBCardText className="text-muted">{userInformation.age}</MDBCardText>
                        </MDBCol>
                        <Link to={'/profile'}><button onClick={onEdit()} className='logOut'>Edit Profile</button></Link>
                        <Link to={'/profile'}><button onClick={onLogOut()} className='logOut'>Log Out</button></Link>
                        </MDBRow>
                    </MDBCardBody>
                    </MDBCol>
                </MDBRow>
                </MDBCard>
            </MDBCol>
            </MDBRow>
        </MDBContainer>
        </section>
    );
}