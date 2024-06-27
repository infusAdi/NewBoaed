import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../../layout/fullpage";
import {
  Media,
  MediaGroup,
  Image,
  OverlineTitle,
  Logo,
} from "../../components";

import { useTranslation } from "react-i18next";
import LanguageSelector from "../../components/LanguageSelector";
import loginEnhancer from "./loginEnhancer";
import { ErrorMessage } from "formik";

const AuthLoginPage = (props) => {
  const { values, handleChange, submitForm, isValid } = props;
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  // using Fetch Method

  //   const handleLogin = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await fetch("http://18.158.81.67/api/login", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           UserName: email,
  //           Password: password,
  //         }),
  //         // mode: "no-cors",
  //       });
  //       console.log(response);

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await response.json();
  //       const token = data.token;
  //       if (token !== null && token !== undefined) {
  //         localStorage.setItem("authToken", token);
  //         console.log(data);
  //         navigate("/"); // yeh home navigate krne
  //       }
  //     } catch (error) {
  //       setError("Login failed. Please check your credentials and try again."); // to show a error msg on ui
  //       console.error(error);
  //     }
  //   };

  // using Axios :::::::::::::::::::::::::::::::::

  const handleLogin = async (e) => {
    e.preventDefault();
    await submitForm();
    console.log("inside handle login");
    if (isValid && values.UserName !== "") {
      try {
        const response = await axios.post(
          "http://18.158.81.67/api/login",
          {
            UserName: values.UserName,
            Password: values.Password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        const token = data.token;
        if (token !== null && token !== undefined) {
          localStorage.setItem("authToken", token);
          console.log(data);
          console.log("data is loaded");
          navigate("/"); // navigate to home
          alert(`${values.UserName} Welcome to login page.`)
        } else {
          setError(
            "Username or Password in not found, Please check your credentials and try again."
          );
        }
      } catch (error) {
        setError("Login failed. Please check your credentials and try again."); // show an error message on the UI
        console.error(error);
      }
    } else {
      console.log("Please fill details");
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
                  <div className="nk-block-head text-center">
                    <div className="nk-block-head-content">
                      <h3 className="nk-block-title mb-1">
                        {t("login.header")}
                      </h3>
                      <p className="small">{t("login.subHeader")}</p>
                    </div>
                  </div>
                  {error && <p className="text-danger">{error}</p>}

                  <Form /*onSubmit= {handleLogin} */>
                    <Row className="gy-3">
                      <Col className="col-12">
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="email">
                            {t("login.form.label.username")}
                          </Form.Label>
                          <div className="form-control-wrap">
                            <Form.Control
                              type="email"
                              id="email"
                              placeholder={t("login.form.placeHolder.username")}
                              required
                              value={values.UserName}
                              name="UserName"
                              onChange={(e) => handleChange(e)}
                              // value={email}
                              // onChange={(e) => setEmail(e.target.value)}
                            />
                            <ErrorMessage
                              name="UserName"
                              component="div"
                              className="error"
                            ></ErrorMessage>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col className="col-12">
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="password">
                            {t("login.form.label.password")}
                          </Form.Label>
                          <div className="form-control-wrap">
                            <Form.Control
                              type="password"
                              id="password"
                              placeholder={t("login.form.placeHolder.password")}
                              // required
                              // value={password}
                              // onChange={(e) => setPassword(e.target.value)}
                              name="Password"
                              value={values.Password}
                              onChange={(e) => handleChange(e)}
                            />
                            <ErrorMessage
                              name="Password"
                              component="div"
                              className="error"
                            ></ErrorMessage>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col className="col-12">
                        <div className="d-flex flex-wrap justify-content-between">
                          <Form.Check
                            className="form-check-sm"
                            type="checkbox"
                            id="rememberMe"
                            label={t("login.form.text.rememberMe")}
                          />
                          <Link to="/auths/auth-reset" className="small">
                            {t("login.form.text.forgetPassword")}
                          </Link>
                        </div>
                      </Col>
                      <Col className="col-12">
                        <div className="d-grid">
                          <Button type="submit" onClick={(e) => handleLogin(e)}>
                            {t("login.form.button.login")}
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                  <div className="my-3 text-center">
                    <OverlineTitle className="overline-title-sep">
                      <span>{t("login.form.text.select")}</span>
                    </OverlineTitle>
                  </div>
                  <Row className="g-2">
                    {/* <Col xxl="6">
                      <Button
                        href="#auth"
                        variant="outline-light"
                        className="w-100"
                      >
                        <Image
                          src="/images/icon/d.png"
                          alt=""
                          className="icon"
                        />
                        <span className="fw-medium">English</span>
                      </Button>
                    </Col> */}

                    <LanguageSelector />
                    {/* <Col xxl="6">
                      <Button
                        href="#auth"
                        variant="outline-light"
                        className="w-100"
                      >
                        <Image
                          src="/images/icon/b.png"
                          alt=""
                          className="icon"
                        />
                        <span className="fw-medium">
                          Germany
                        </span>
                      </Button>
                    </Col> */}
                  </Row>
                  <div className="text-center mt-4">
                    <p className="small">
                      {t("login.form.button.noAcc")}{" "}
                      <Link to="/auths/auth-register">
                        {t("login.form.button.noAccc")}
                      </Link>
                    </p>
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
                        <div className="h1 title mb-3">
                          {t("login.form.text.leftH")} <br />{" "}
                          {t("login.form.text.leftH1")}
                        </div>
                        <p>{t("login.form.text.leftH2")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <MediaGroup className="media-group-overlap">
                      <Media
                        size="sm"
                        shape="circle"
                        border
                        className="border-white"
                      >
                        <Image src="/images/avatar/a.jpg" alt="" />
                      </Media>
                      <Media
                        size="sm"
                        shape="circle"
                        border
                        className="border-white"
                      >
                        <Image src="/images/avatar/b.jpg" alt="" />
                      </Media>
                      <Media
                        size="sm"
                        shape="circle"
                        border
                        className="border-white"
                      >
                        <Image src="/images/avatar/c.jpg" alt="" />
                      </Media>
                      <Media
                        size="sm"
                        shape="circle"
                        border
                        className="border-white"
                      >
                        <Image src="/images/avatar/d.jpg" alt="" />
                      </Media>
                    </MediaGroup>
                    <p className="small mt-2">{t("login.form.text.leftH3")}</p>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default loginEnhancer(AuthLoginPage);
