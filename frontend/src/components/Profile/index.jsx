import React, { useCallback, useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';  
import UsersAPI from '../../apis/UsersAPI'
import { useLoaderData } from 'react-router-dom';
import './styles.css'

export async function loader(info){
    const userInformation = await UsersAPI.getUser(info)
    return userInformation 
}

export default function Profile(props) {
    const [userInformation, setUserInformation] = useState({})
    useEffect(()=>{
        loader(props.user.email)
    }, [])
    async function loader(info){
        let result = await UsersAPI.getUser(info)
        setUserInformation(result)
    }

    console.log(userInformation)
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
                            <MDBTypography tag="h6">Age</MDBTypography>
                            <MDBCardText className="text-muted">{userInformation.age}</MDBCardText>
                        </MDBCol>
                        </MDBRow>

                        <div className="d-flex justify-content-start">
                        <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                        <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                        <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                        </div>
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