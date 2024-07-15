import React, { Fragment, useEffect, useRef } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Field, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ClientEnhancer from "./ClientEnhancer";
import CommonSelect from "../../components/custom/CommonSelect";
import {
  addClient,
  editClient,
  getClientById,
} from "../../apiServices/ClientServices";
import {
  error,
  fetching,
  success,
} from "../../reduxStore/reducer/fetchReducers";
// import LoaddingButton from "components/custom/LoaddingButton";
// import FileComponent from "components/custom/FileComponent";
import { Button, Card, Col, Row, Form, Breadcrumb } from "react-bootstrap";
// import { Block } from "components";
// import CancelButton from "components/custom/CancelButton";
import { findKeyFromObject } from "../../utilities/generalFunctions";
import { Block } from "../../components";
import axios from "axios";
import Layout from "../../layout/default";
import { toast } from "react-toastify";
// import Headings from "components/custom/Headings";
// import { addBreadCrumbs } from "reduxStore/reducer/breadcrumbsReducer";
// import Snap from "snapsvg-cjs";

function ClientForm(props) {
  const {
    errors,
    view,
    edit,
    values,
    handleChange,
    submitForm,
    setFieldValue,
    isValid,
    setValues,
  } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const token = useSelector((state) => state.user.user.token);
  const testingOfficeId = useSelector(
    (state) => state.user.user.TestingOfficeId
  );
  const { t } = useTranslation();
  const { clientId, tId } = useParams();
  const countryOptions = useSelector((state) => state.common.country);
  const isFetching = useSelector((state) => state.fetch.isFetching);
  const svgDiv = useRef("");
  async function submitHandler(e) {
    submitForm();
    try {
      dispatch(fetching(true));
      if (isValid) {
        let testingData = { ...values };

        if (edit) {
          await editClient(token, clientId, testingData)
            .then((data) => {
              if (data.success) {
                dispatch(success(t("AlertMessages.CLIENT_UPDATE_SUCCESS")));
                navigate(`/client`);
              } else {
                if (data.conflict) {
                  dispatch(
                    error(
                      `${findKeyFromObject(values, data.message)}${t(
                        "AlertMessages.DATA_ALREADY_EXIST"
                      )}`
                    )
                  );
                } else {
                  dispatch(error(t("AlertMessages.NETWORK_ISSUE")));
                }
                dispatch(error(t("AlertMessages.NETWORK_ISSUE")));
              }
            })
            .catch((err) => dispatch(error(t("AlertMessages.NETWORK_ISSUE"))));
        } else {
          delete testingData.Id;
          delete testingData.CreatedOn;
          delete testingData.CreatedById;
          delete testingData.ModifiedById;
          delete testingData.ModifiedOn;

          //   const response = await axios.post(
          //     `http://18.158.81.67:80/api/Clients`,
          //     testingData,
          //     {
          //       headers: {
          //         Authorization: `Bearer ${token}`,
          //       },
          //     }
          //   );
          //   const data = response.data;
          //   console.log(data.value[0]);

          await addClient(token, testingData)
            .then((data) => {
              if (data.Id) {
                dispatch(success(t("AlertMessages.CLIENT_ADDED_SUCCESS")));
                navigate("/client");
              } else {
                if (data.conflict) {
                  dispatch(
                    error(
                      `${findKeyFromObject(values, data.message)}${t(
                        "AlertMessages.DATA_ALREADY_EXIST"
                      )}`
                    )
                  );
                } else {
                  dispatch(error(t("AlertMessages.NETWORK_ISSUE")));
                }
                dispatch(error(t("AlertMessages.NETWORK_ISSUE")));
              }
            })
            .catch((err) => dispatch(error(t("AlertMessages.NETWORK_ISSUE"))));
        }
      }
      dispatch(fetching(false));
    } catch (err) {
      dispatch(error(t("AlertMessages.NETWORK_ISSUE")));
      dispatch(fetching(false));
      console.log(err);
    }
    // {
    //   edit ? (toast.success("User Edited.....")) : (toast.success("User Added"))
    // }
    // toast.success("user added 1.....");
    navigate("/client");
  }

  async function fetchClientById() {
    dispatch(fetching(true));
    await getClientById(token, clientId)
      .then((data) => {
        setValues({ ...data.value[0] });
      })
      .catch((error) => console.log(error));
    dispatch(fetching(false));
  }
  useEffect(() => {
    if (clientId) {
      fetchClientById();
    }
  }, [clientId]);

  useEffect(() => {
    if (testingOfficeId) {
      setFieldValue("TestingOfficeId", testingOfficeId || tId);
    }
    if (tId) {
      setFieldValue("TestingOfficeId", tId);
    }
    if (values.ClientCountryId === "") {
      setFieldValue(
        "ClientCountryId",
        countryOptions.find((f) => f.IsDefault)?.value
      );
    }
  }, []);

  // useEffect(() => {
  //   var element = Snap(svgDiv);
  //   console.log(element, "element");
  //   Snap.load("assets/images/logo_domatec_web.svg", (data) => {
  //     if (element) {
  //       element.append(data);
  //     }
  //   });
  // }, [svgDiv]);

  return (
    <Fragment>
      <>
        <Layout title="Accordion" content="container">
          <Block.Head page>
            <Block.HeadContent>
              <div className="d-flex justify-content-between">
                {edit ? (
                  <Block.Title>Edit Client Form</Block.Title>
                ) : (
                  <Block.Title>Add Client Form</Block.Title>
                )}
              </div>

              <Block.Text>
                <Breadcrumb className="breadcrumb-arrow">
                  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="/client">Client</Breadcrumb.Item>
                  {edit ? (
                    <Breadcrumb.Item href="#" active>
                      Edit{" "}
                    </Breadcrumb.Item>
                  ) : (
                    <Breadcrumb.Item href="#" active>
                      Add{" "}
                    </Breadcrumb.Item>
                  )}
                </Breadcrumb>
              </Block.Text>
            </Block.HeadContent>
          </Block.Head>
          <Block>
            <Form>
              <Row className="g-gs m-0 p-0 mt-4">
                <Col xxl="12" className="m-0 p-0">
                  <div className="gap gy-4">
                    <div className="gap-col m-0 p-0 mt-3">
                      <Card className="col-sep p-0 m-0 border-0">
                        <Card.Body>
                          <Row>
                            <Col lg={12}>
                              <div className="bio-block mb-4 mt-4">
                                <h6 className="bio-block-title mb-1">
                                  Client Details
                                </h6>
                                <Card className="col-sep card-gutter-md">
                                  <Card.Body>
                                    <Row className="g-gs">
                                      <Col lg="3">
                                        <Form.Group className="form-group">
                                          <Form.Label
                                            htmlFor="ClientName"
                                            className="text-opacity-75 text-black-50"
                                          >
                                            {t("client.form.label.clientName")}
                                            <span className="error">*</span>
                                          </Form.Label>
                                          <div className="form-control-wrap">
                                            <Field
                                              className="form-control"
                                              onChange={handleChange}
                                              value={values.ClientName}
                                              type="text"
                                              id="ClientName"
                                              name="ClientName"
                                              disabled={view}
                                            />
                                            <ErrorMessage
                                              name="ClientName"
                                              component="div"
                                              className="error"
                                            />
                                          </div>
                                        </Form.Group>
                                      </Col>
                                      <Col lg="3">
                                        <Form.Group className="form-group">
                                          <Form.Label
                                            htmlFor="ClientNumber"
                                            className="text-opacity-75 text-black-50"
                                          >
                                            {t(
                                              "client.form.label.clientNumber"
                                            )}
                                          </Form.Label>
                                          <div className="form-control-wrap">
                                            <Field
                                              className="form-control"
                                              onChange={handleChange}
                                              value={values.ClientNumber}
                                              type="text"
                                              id="ClientNumber"
                                              name="ClientNumber"
                                              disabled={edit}
                                            />
                                            <ErrorMessage
                                              name="ClientNumber"
                                              component="div"
                                              className="error"
                                            />
                                          </div>
                                        </Form.Group>
                                      </Col>

                                      <Col lg="3">
                                        <Form.Group className="form-group">
                                          <Form.Label
                                            htmlFor="TestingOfficeId"
                                            className="text-opacity-75 text-black-50"
                                          >
                                            {t("user.form.label.testingOffice")}
                                            <span className="error">*</span>
                                          </Form.Label>
                                          <div className="form-control-wrap">
                                            <CommonSelect
                                              type="TestingOffice"
                                              name="TestingOfficeId"
                                              placeholder="Testing Office"
                                              value={values.TestingOfficeId}
                                              setValue={(value) =>
                                                setFieldValue(
                                                  "TestingOfficeId",
                                                  value
                                                )
                                              }
                                              hideInActive={true}
                                              isDisabled={
                                                view || testingOfficeId || tId
                                              }
                                            />
                                            <ErrorMessage
                                              name="TestingOfficeId"
                                              component="div"
                                              className="error"
                                            />
                                          </div>
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                  </Card.Body>
                                </Card>
                              </div>
                            </Col>

                            <Col lg={12}>
                              <div className="bio-block mb-4 mt-4">
                                <h6 className="bio-block-title mb-1">
                                  Address
                                </h6>
                                <Card className="col-sep card-gutter-md">
                                  <Card.Body>
                                    <Row className="g-gs">
                                      <Col lg="3">
                                        <Form.Group className="form-group">
                                          <Form.Label
                                            htmlFor="ClientCountryId"
                                            className="text-opacity-75 text-black-50"
                                          >
                                            {t(
                                              "client.form.label.clientCountryId"
                                            )}
                                          </Form.Label>
                                          <div className="form-control-wrap">
                                            <CommonSelect
                                              type="Country"
                                              name="ClientCountryId"
                                              placeholder="Country"
                                              value={values.ClientCountryId}
                                              setValue={(value) =>
                                                setFieldValue(
                                                  "ClientCountryId",
                                                  value
                                                )
                                              }
                                              hideInActive={false}
                                              isDisabled={view}
                                            />
                                            <ErrorMessage
                                              name="ClientCountryId"
                                              component="div"
                                              className="error"
                                            />
                                          </div>
                                        </Form.Group>
                                      </Col>
                                      <Col lg="3">
                                        <Form.Group className="form-group">
                                          <Form.Label
                                            htmlFor="Address_Street1"
                                            className="text-opacity-75 text-black-50"
                                          >
                                            {t(
                                              "client.form.label.address_Street1"
                                            )}
                                          </Form.Label>
                                          <div className="form-control-wrap">
                                            <Field
                                              className="form-control"
                                              onChange={handleChange}
                                              value={values.Address.Street1}
                                              type="text"
                                              id="Street1"
                                              name="Address.Street1"
                                              disabled={view}
                                            />
                                            <ErrorMessage
                                              name="Address.Street1"
                                              component="div"
                                              className="error"
                                            />
                                          </div>
                                        </Form.Group>
                                      </Col>
                                      <Col lg="3">
                                        <Form.Group className="form-group">
                                          <Form.Label
                                            htmlFor="Address.Street2"
                                            className="text-opacity-75 text-black-50"
                                          >
                                            {t(
                                              "client.form.label.address_Street2"
                                            )}
                                          </Form.Label>
                                          <div className="form-control-wrap">
                                            <Field
                                              className="form-control"
                                              onChange={handleChange}
                                              value={values.Address.Street2}
                                              type="text"
                                              id="Street2"
                                              name="Address.Street2"
                                              disabled={view}
                                            />
                                            <ErrorMessage
                                              name="Address.Street2"
                                              component="div"
                                              className="error"
                                            />
                                          </div>
                                        </Form.Group>
                                      </Col>
                                      <Col lg="3">
                                        <Form.Group className="form-group">
                                          <Form.Label
                                            htmlFor="PostCode"
                                            className="text-opacity-75 text-black-50"
                                          >
                                            {t(
                                              "client.form.label.address_PostCode"
                                            )}
                                          </Form.Label>
                                          <div className="form-control-wrap">
                                            <Field
                                              className="form-control"
                                              onChange={handleChange}
                                              value={values.Address.PostCode}
                                              type="text"
                                              id="PostCode"
                                              name="Address.PostCode"
                                              disabled={view}
                                            />
                                            <ErrorMessage
                                              name="Address.PostCode"
                                              component="div"
                                              className="error"
                                            />
                                          </div>
                                        </Form.Group>
                                      </Col>
                                      <Col lg="3">
                                        <Form.Group className="form-group">
                                          <Form.Label
                                            htmlFor="Location"
                                            className="text-opacity-75 text-black-50"
                                          >
                                            {t(
                                              "client.form.label.address_Location"
                                            )}
                                          </Form.Label>
                                          <div className="form-control-wrap">
                                            <Field
                                              className="form-control"
                                              onChange={handleChange}
                                              value={values.Address.Location}
                                              type="text"
                                              id="Location"
                                              name="Address.Location"
                                              disabled={view}
                                            />
                                            <ErrorMessage
                                              name="Address.Location"
                                              component="div"
                                              className="error"
                                            />
                                          </div>
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                  </Card.Body>
                                </Card>
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="bio-block mb-4 mt-4">
                                <h6 className="bio-block-title mb-1">
                                  Contact details
                                </h6>
                                <Card className="col-sep card-gutter-md">
                                  <Card.Body>
                                    <Row className="g-gs">
                                      <Col lg="3">
                                        <Form.Group className="form-group">
                                          <Form.Label
                                            htmlFor="FirstName"
                                            className="text-opacity-75 text-black-50"
                                          >
                                            First Name
                                          </Form.Label>
                                          <div className="form-control-wrap">
                                            <Field
                                              className="form-control"
                                              onChange={handleChange}
                                              value={values.FirstName}
                                              type="text"
                                              id="FirstName"
                                              name="FirstName"
                                              disabled={view}
                                            />
                                            <ErrorMessage
                                              name="FirstName"
                                              component="div"
                                              className="error"
                                            />
                                          </div>
                                        </Form.Group>
                                      </Col>
                                      <Col lg="3">
                                        <Form.Group className="form-group">
                                          <Form.Label
                                            htmlFor="LastName"
                                            className="text-opacity-75 text-black-50"
                                          >
                                            Last Name
                                          </Form.Label>
                                          <div className="form-control-wrap">
                                            <Field
                                              className="form-control"
                                              onChange={handleChange}
                                              value={values.LastName}
                                              type="text"
                                              id="LastName"
                                              name="LastName"
                                              disabled={view}
                                            />
                                            <ErrorMessage
                                              name="LastName"
                                              component="div"
                                              className="error"
                                            />
                                          </div>
                                        </Form.Group>
                                      </Col>
                                      <Col lg="3">
                                        <Form.Group className="form-group">
                                          <Form.Label
                                            htmlFor="Phone"
                                            className="text-opacity-75 text-black-50"
                                          >
                                            Phone
                                          </Form.Label>
                                          <div className="form-control-wrap">
                                            <Field
                                              className="form-control"
                                              onChange={handleChange}
                                              value={values.Phone}
                                              type="text"
                                              id="Phone"
                                              name="Phone"
                                              disabled={view}
                                            />
                                            <ErrorMessage
                                              name="Phone"
                                              component="div"
                                              className="error"
                                            />
                                          </div>
                                        </Form.Group>
                                      </Col>
                                      <Col lg="3">
                                        <Form.Group className="form-group">
                                          <Form.Label
                                            htmlFor="Email"
                                            className="text-opacity-75 text-black-50"
                                          >
                                            Email
                                          </Form.Label>
                                          <div className="form-control-wrap">
                                            <Field
                                              className="form-control"
                                              onChange={handleChange}
                                              value={values.Email}
                                              type="email"
                                              id="Email"
                                              name="Email"
                                              disabled={view}
                                            />
                                            <ErrorMessage
                                              name="Email"
                                              component="div"
                                              className="error"
                                            />
                                          </div>
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                  </Card.Body>
                                </Card>
                              </div>
                            </Col>

                            <Col lg={12}>
                              <div className="bio-block mb-4 mt-4">
                                <h6 className="bio-block-title mb-1">
                                  Additional Details
                                </h6>
                                <Card className="col-sep card-gutter-md">
                                  <Card.Body>
                                    <Row className="g-gs">
                                      <Col lg="3">
                                        <Form.Group className="form-group">
                                          <Form.Label
                                            htmlFor="Remarks"
                                            className="text-opacity-75 text-black-50"
                                          >
                                            Remark
                                          </Form.Label>
                                          <div className="form-control-wrap">
                                            <Field
                                              className="form-control"
                                              onChange={handleChange}
                                              value={values.Remarks}
                                              type="text"
                                              id="Remarks"
                                              name="Remarks"
                                              maxLength="255"
                                              disabled={view}
                                              component="textarea"
                                            />
                                            <div className="form-note p-0 mb-2 mt-0 text-opacity-75 text-black-50">
                                              {255 - values.Remarks.length}{" "}
                                              Charachter Left
                                            </div>
                                            <ErrorMessage
                                              name="Remarks"
                                              component="div"
                                              className="error"
                                            />
                                          </div>
                                        </Form.Group>
                                      </Col>
                                      <Col lg="3">
                                        <Form.Group className="form-group">
                                          <Form.Label
                                            htmlFor="Field1"
                                            className="text-opacity-75 text-black-50"
                                          >
                                            {t("client.form.label.field1")}
                                          </Form.Label>
                                          <div className="form-control-wrap">
                                            <Field
                                              className="form-control"
                                              onChange={handleChange}
                                              value={values.Field1}
                                              type="text"
                                              id="Field1"
                                              name="Field1"
                                              disabled={view}
                                              maxLength="255"
                                              component="textarea"
                                            />
                                            <div className="form-note p-0 mb-2 mt-0 text-opacity-75 text-black-50">
                                              {255 - values.Field1.length}{" "}
                                              Charachter Left
                                            </div>
                                            <ErrorMessage
                                              name="Field1"
                                              component="div"
                                              className="error"
                                            />
                                          </div>
                                        </Form.Group>
                                      </Col>
                                      <Col lg="3">
                                        <Form.Group className="form-group">
                                          <Form.Label
                                            htmlFor="Field2"
                                            className="text-opacity-75 text-black-50"
                                          >
                                            {t("client.form.label.field2")}
                                          </Form.Label>
                                          <div className="form-control-wrap">
                                            <Field
                                              className="form-control"
                                              onChange={handleChange}
                                              value={values.Field2}
                                              type="text"
                                              id="Field2"
                                              name="Field2"
                                              disabled={view}
                                              maxLength={255}
                                              component="textarea"
                                            />
                                            <div className="form-note p-0 mb-2 mt-0 text-opacity-75 text-black-50">
                                              {255 - values.Field2.length}{" "}
                                              Charachter Left
                                            </div>
                                            <ErrorMessage
                                              name="Field2"
                                              component="div"
                                              className="error"
                                            />
                                          </div>
                                        </Form.Group>
                                      </Col>
                                      <Col lg="3">
                                        <Form.Group className="form-group">
                                          <Form.Label
                                            htmlFor="Field3"
                                            className="text-opacity-75 text-black-50"
                                          >
                                            {t("client.form.label.field3")}
                                          </Form.Label>
                                          <div className="form-control-wrap">
                                            <Field
                                              className="form-control"
                                              onChange={handleChange}
                                              value={values.Field3}
                                              type="text"
                                              id="Field3"
                                              name="Field3"
                                              disabled={view}
                                              maxLength="255"
                                              component="textarea"
                                            />
                                            <div className="form-note p-0 mb-2 mt-0 text-opacity-75 text-black-50">
                                              {255 - values.Field3.length}{" "}
                                              Charachter Left
                                            </div>
                                            <ErrorMessage
                                              name="Field3"
                                              component="div"
                                              className="error"
                                            />
                                          </div>
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                  </Card.Body>
                                </Card>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </div>

                    <div className="gap-col">
                      <ul className="d-flex align-items-center gap g-3">
                        <li>
                          {view ? (
                            <></>
                          ) : isFetching ? (
                            // <LoaddingButton />
                            // <button>LoadingBtn</button>
                            <Button type="button" varient="primary">
                              Loading......
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              variant="primary"
                              onClick={() => submitHandler()}
                            >
                              Submit
                            </Button>
                          )}
                        </li>
                        <li>
                          {/* <CancelButton /> */}
                          <Button
                            type="button"
                            variant="primary"
                            onClick={() => navigate(-1)}
                          >
                            Cancel
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          </Block>
        </Layout>
      </>
    </Fragment>
  );
}

export default ClientEnhancer(ClientForm);
