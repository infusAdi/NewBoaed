import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { ErrorMessage } from "formik";

import Layout from '../../layout/fullpage';

import { Media, MediaGroup, Image, Logo, OverlineTitle } from '../../components';
import axios from 'axios';
import ResetPasswordEnhancer from './ResetPasswordEnhancer';

const ResetPassword = (props) => {
    const { values, handleChange, submitForm, isValid } = props;
    const { token } = useParams();
    const navigate = useNavigate();
    // const [password, setPassword] = useState('');
    // const [newPassword, setNewPassword] = useState('');

    const handleReset = async (e) => {
        e.preventDefault();
        await submitForm();
        console.log("Inside handleReset");
        if (isValid && values.Password !== "") {
            try {
                const response = await axios.post(`http://18.158.81.67:80/api/verifyresettoken`, {
                    "UserName": values.UserName,
                    "TempToken": token,
                    "Password": values.Password
                });
                //   setMessage('A reset password link has been sent to your email.');
                alert("Password Changed Successfully");
                navigate('/auths/auth-login');
            } catch (error) {
                //   setMessage('There was an error sending the reset password email.');
                alert("Error");
            }
        }else{
            console.log("Outside");
        }
    };
    return (
        <>
            <Layout title="Login" centered>
                <div className="container p-2 p-sm-4">
                    <Card className="overflow-hidden card-gutter-lg rounded-4 card-auth card-auth-mh">
                        <Row className="g-0 flex-lg-row-reverse">
                            <Col lg="5">
                                <Card.Body className="h-100 d-flex flex-column justify-content-center">
                                    <Form onSubmit={handleReset}>
                                        <Row className="gy-3">
                                            <Col className="col-12">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="password">New Password</Form.Label>
                                                    <div className="form-control-wrap">
                                                        <Form.Control type="text" id="Password" placeholder="Enter new password"
                                                            value={values.Password}
                                                            name="Password"
                                                            onChange={(e) => handleChange(e)}
                                                            required />
                                                        <ErrorMessage
                                                            name="Password"
                                                            component="div"
                                                            className="error"
                                                        ></ErrorMessage>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col className="col-12">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="password">Confirm Password</Form.Label>
                                                    <div className="form-control-wrap">
                                                        <Form.Control type="text" id="ConfirmPassword" placeholder="Confirm Password"
                                                            value={values.ConfirmPassword}
                                                            name="ConfirmPassword"
                                                            onChange={(e) => handleChange(e)} required />
                                                        <ErrorMessage
                                                            name="ConfirmPassword"
                                                            component="div"
                                                            className="error"
                                                        ></ErrorMessage>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col className="col-12">
                                                <div className="d-grid">
                                                    <Button type="submit">Submit</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                    <div className="my-3 text-center">
                                        <OverlineTitle className="overline-title-sep"><span>OR</span></OverlineTitle>
                                    </div>
                                    <Row className="g-2">
                                        <Col xxl="6">
                                            <Button href="#auth" variant="outline-light" className="w-100">
                                                <Image src="/images/icon/d.png" alt="" className="icon" />
                                                <span className="fw-medium">Continue with Google</span>
                                            </Button>
                                        </Col>
                                        <Col xxl="6">
                                            <Button href="#auth" variant="outline-light" className="w-100">
                                                <Image src="/images/icon/b.png" alt="" className="icon" />
                                                <span className="fw-medium">Continue with Facebook</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <div className="text-center mt-4">
                                        <p className="small">Don't have an account? <Link to="/auths/auth-register">Register</Link></p>
                                    </div>
                                </Card.Body>
                            </Col>
                            <Col lg="7">
                                <Card.Body className="bg-darker is-theme has-mask has-mask-1 h-100 d-flex flex-column justify-content-end">
                                    <div className="mask mask-1"></div>
                                    <div className="brand-logo">
                                        <Logo />
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-11">
                                            <div className="mt-4">
                                                <div className="h1 title mb-3">Welcome back to <br /> our community</div>
                                                <p>Discover how to manage Two-Factor Authentication in Joomla. The two-factor authentication in Joomla is a very popular security practice.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <MediaGroup className="media-group-overlap">
                                            <Media size="sm" shape="circle" border className="border-white">
                                                <Image src="/images/avatar/a.jpg" alt="" />
                                            </Media>
                                            <Media size="sm" shape="circle" border className="border-white">
                                                <Image src="/images/avatar/b.jpg" alt="" />
                                            </Media>
                                            <Media size="sm" shape="circle" border className="border-white">
                                                <Image src="/images/avatar/c.jpg" alt="" />
                                            </Media>
                                            <Media size="sm" shape="circle" border className="border-white">
                                                <Image src="/images/avatar/d.jpg" alt="" />
                                            </Media>
                                        </MediaGroup>
                                        <p className="small mt-2">More than 2k people joined us, it's your turn</p>
                                    </div>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </Layout>

        </>
    )
}

export default ResetPasswordEnhancer(ResetPassword);
