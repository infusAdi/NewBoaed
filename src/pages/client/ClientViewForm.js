import React, { Fragment, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
// import { getClientById } from "apiServices/ClientServices"; // Assume this service exists
import { Breadcrumb, Button, Card, Col, Nav, Row, Tab } from "react-bootstrap";
// import { addBreadCrumbs } from "reduxStore/reducer/breadcrumbsReducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import Layout from "../../layout/default";
import { Block } from "../../components";
import { getClientById } from "../../apiServices/ClientServices";
import { useSelector } from "react-redux";

function ClientViewForm() {
  //   const token = useSelector((state) => state.user.user.token);
    const countryOptions = useSelector((state) => state.common.country);
    const testingOfficeOptions = useSelector(
      (state) => state.common.testingOffice
    );

  const { pathname } = useLocation();
  //   const dispatch = useDispatch();
  const { clientId, tId } = useParams();
  const { t } = useTranslation();
  const [values, setValues] = useState({});

  async function getClientDetails() {
    const token = localStorage.getItem("authToken");
    await getClientById(token, clientId)
      .then((data) => {
        delete data["@odata.context"];
        setValues({ ...data.value[0] });
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    if (clientId) {
      getClientDetails();
    }
  }, [clientId]);




//   async function getClientDetails() {
//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await axios.get(
//         `http://18.158.81.67:80/api/Clients(${clientId})`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = response.data;
//       // delete data["@odata.context"];
//       console.log(data.value[0]);
//       setValues({ ...data.value[0] });
//       console.log(values);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     if (clientId) {
//       getClientDetails();
//     }
//   }, [clientId]);

  //   useEffect(() => {
  //     dispatch(
  //       addBreadCrumbs({
  //         client: [
  //           { link: `/client${tId ? `/${tId}` : ""}` },
  //           {
  //             link: pathname,
  //             name: values.ClientName,
  //           },
  //         ],
  //       })
  //     );
  //   }, [values.ClientName]);

  return (
    <Fragment>
      <>
        <Layout title="Accordion" content="container">
          <Block.Head page>
            <Block.HeadContent>
              <div className="d-flex justify-content-between">
                <Block.Title> View Client</Block.Title>
                <Block.Title>
                  <Link to={`client/edit/${clientId}`}>
                    {" "}
                    <Button variant="primary"> Edit Client</Button>
                  </Link>
                </Block.Title>
                <Outlet/>
              </div>

              <Block.Text>
                <Breadcrumb className="breadcrumb-arrow">
                  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="/client">Client</Breadcrumb.Item>
                  <Breadcrumb.Item href="#" active>
                    View{" "}
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Block.Text>
            </Block.HeadContent>
          </Block.Head>
          <Tab.Container id="pills-tabs-example" defaultActiveKey="pills-home">
            <Nav variant="pills" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="pills-home">Overview</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="pills-profile">Location</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="pills-home">
                <div className="mt-4">
                  <Row>
                    <Col xxl="12">
                      <Card className="card-gutter-md">
                        <Card.Body>
                          <div className="bio-block">
                            <h4 className="bio-block-title">Client Details</h4>
                            <ul className="list-group list-group-borderless small">
                              <li className="list-group-item">
                                <span className="title fw-medium w-40 d-inline-block">
                                  {t("client.form.label.clientName")} :
                                </span>
                                <span className="text">
                                  {values.ClientName}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="title fw-medium w-40 d-inline-block">
                                  {t("client.form.label.clientNumber")} :
                                </span>
                                <span className="text">
                                  {values.ClientNumber}
                                </span>
                              </li>

                              <li className="list-group-item">
                                <span className="title fw-medium w-40 d-inline-block">
                                  {t("user.form.label.testingOffice")} :
                                </span>
                                <span className="text">
                                  {
                          testingOfficeOptions.find(
                            (f) => f.value === values.TestingOfficeId
                          )?.label
                        }
                                </span>
                              </li>
                            </ul>
                          </div>

                          <div className="bio-block">
                            <h4 className="bio-block-title">Address</h4>
                            <ul className="list-group list-group-borderless small">
                              <li className="list-group-item">
                                <span className="title fw-medium w-40 d-inline-block">
                                  {t("client.form.label.clientCountryId")} :
                                </span>
                                <span className="text">
                                  {
                          countryOptions.find(
                            (f) => f.value === values.ClientCountryId
                          )?.label
                        }
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="title fw-medium w-40 d-inline-block">
                                  {t("client.form.label.address_Street1")} :
                                </span>
                                <span className="text">
                                  {values.Address?.Street1}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="title fw-medium w-40 d-inline-block">
                                  {t("client.form.label.address_Street2")} :
                                </span>
                                <span className="text">
                                  {values.Address?.Street2}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="title fw-medium w-40 d-inline-block">
                                  {t("client.form.label.address_PostCode")} :
                                </span>
                                <span className="text">
                                  {values.Address?.PostCode}
                                </span>
                              </li>
                              <li className="list-group-item">
                                <span className="title fw-medium w-40 d-inline-block">
                                  {t("client.form.label.address_Location")} :
                                </span>
                                <span className="text">
                                  {values.Address?.Location}
                                </span>
                              </li>
                            </ul>
                          </div>

                          <div className="bio-block">
                            <h4 className="bio-block-title">
                              Contact Person Details
                            </h4>
                            <ul className="list-group list-group-borderless small">
                              <li className="list-group-item">
                                <span className="title fw-medium w-40 d-inline-block">
                                  First Name :
                                </span>
                                <span className="text">{values.FirstName}</span>
                              </li>
                              <li className="list-group-item">
                                <span className="title fw-medium w-40 d-inline-block">
                                  Last Name :
                                </span>
                                <span className="text">{values.LastName}</span>
                              </li>
                              <li className="list-group-item">
                                <span className="title fw-medium w-40 d-inline-block">
                                  Phone :
                                </span>
                                <span className="text">{values.Phone}</span>
                              </li>
                              <li className="list-group-item">
                                <span className="title fw-medium w-40 d-inline-block">
                                  Email :
                                </span>
                                <span className="text">{values.Email}</span>
                              </li>
                            </ul>
                          </div>

                          <div className="bio-block">
                            <h4 className="bio-block-title">
                              Additional Details
                            </h4>
                            <ul className="list-group list-group-borderless small">
                              <li className="list-group-item">
                                <span className="title fw-medium w-40 d-inline-block">
                                  {t("client.form.label.field1")} :
                                </span>
                                <div>
                                  <span className="text">{values.Field1}</span>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <span className="title fw-medium w-40 d-inline-block">
                                  {t("client.form.label.field2")} :
                                </span>
                                <div>
                                  <span className="text">{values.Field2}</span>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <span className="title fw-medium w-40 d-inline-block">
                                  {t("client.form.label.field3")} :
                                </span>
                                <div>
                                  <span className="text">{values.Field3}</span>
                                </div>
                              </li>
                              <li className="list-group-item">
                                <span className="title fw-medium w-40 d-inline-block">
                                  Remarks :
                                </span>
                                <div>
                                  <span className="text">{values.Remarks}</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="pills-profile">
                No Record is Found here.
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Layout>
        <Outlet/>
      </>
    </Fragment>
  );
}

export default ClientViewForm;
