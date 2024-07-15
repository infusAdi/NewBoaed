// import { Breadcrumb, Button } from "react-bootstrap";
// import Layout from "../../layout/default";
// import Block from "../../components/Block/Block";
// import DataTable from "react-data-table-component";
// import { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import ClientList from "./ClientList";
// import { Link, Outlet } from "react-router-dom";

// function Client() {
//   //   const [clients, setClients] = useState([]);
//   //   const [error, setError] = useState(null);

//   //   useEffect(() => {
//   //     const fetchClients = async () => {
//   //       try {
//   //         const token = localStorage.getItem("authToken");
//   //         const response = await axios.get("http://18.158.81.67:80/api/Clients", {
//   //           headers: {
//   //             Authorization: `Bearer ${token}`,
//   //           },
//   //         });
//   //         setClients(response.data.value);
//   //         console.log(response.data.value);
//   //       } catch (err) {
//   //         setError(err.message);
//   //       }
//   //     };

//   //     fetchClients();
//   //   }, []);

//   return (
//     <Layout title="Accordion" content="container">
//       <Block.Head page>
//         <Block.HeadContent>
//           <div className="d-flex justify-content-between">
//             <Block.Title>Client</Block.Title>
//             <Block.Title>
//               <Link to={"add"}>
//                 <Button variant="primary">+ Add Client</Button>
//               </Link>
//             </Block.Title>
//           </div>

//           <Block.Text>
//             <Breadcrumb className="breadcrumb-arrow">
//               <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
//               <Breadcrumb.Item href="#" active>
//                 Client
//               </Breadcrumb.Item>
//             </Breadcrumb>
//           </Block.Text>
//         </Block.HeadContent>
//       </Block.Head>

//       <Block>
//         <ClientList />
//       </Block>
//       <Outlet />
//     </Layout>
//   );
// }

// export default Client;

///////////NEW Code Change

import { createColumnHelper } from "@tanstack/react-table";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { clientList, editClient } from "../../apiServices/ClientServices";
import Layout from "../../layout/default";
// import Table from "../../components/custom/Table";
import { usePagination } from "../../../src/customHooks/usePagination";
import { useSorting } from "../../../src/customHooks/useSorting";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageSizeComponent from "../../components/custom/PageSizeComponent";
import SearchBox from "../../components/custom/SearchBox";
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  FormCheck,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import CommonSelect from "../../components/custom/CommonSelect";
import {
  error,
  fetching,
  success,
} from "../../reduxStore/reducer/fetchReducers";
import { generateFilterQuery } from "../../utilities/generalFunctions";
import { Block, Icon } from "../../components/index";
import ActionButtons from "../../components/custom/ActionButtons";
import Table from "../../components/custom/Table";
// import ActionButtons from "components/custom/ActionButtons";
// import Headings from "components/custom/Headings";
// import { addBreadCrumbs } from "reduxStore/reducer/breadcrumbsReducer";

function ClientList() {
  const token = useSelector((state) => state.user.user.token);
  const testingOfficeId = useSelector(
    (state) => state.user.user.TestingOfficeId
  );
  const breadCrumbs = useSelector((state) => state.breadCrumbs.breadCrumbs);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { tId } = useParams();

  const [filter, setFilter] = useState({
    isActive: true,
    TestingOfficeId: testingOfficeId || tId,
  });
  const [data, _setData] = useState(() => []);
  const [search, setSearch] = useState("");
  const { limit, skip, pagination, onPaginationChange } = usePagination();
  const { sorting, onSortingChange, field, order } = useSorting();

  // const searchString = [
  //   t("client.form.label.clientName"),
  //   t("client.form.label.clientNumber"),
  //   t("client.form.label.address_Street1"),
  //   t("client.form.label.address_Street2"),
  //   t("client.form.label.address_PostCode"),
  //   t("client.form.label.address_Location"),
  //   t("commonWords.form.label.firstName"),
  //   t("commonWords.form.label.lastName"),
  // ];

  const columns = useMemo(() => [
    {
      selector: (info) => <Link to={`view/${info.Id}`}>{info.ClientName}</Link>,
      name: t("client.form.label.clientName"),
      sortable: true,
      sortField: "ClientName",
      allowOverflow: true,
      wrap: true,
    },
    {
      selector: (info) => info.ClientNumber,
      name: t("client.form.label.clientNumber"),
      sortable: true,
      sortField: "ClientNumber",
      allowOverflow: true,
      wrap: true,
    },
    {
      name: t("client.form.label.address_Street1"),
      selector: (info) => info.Address?.Street1,
      sortable: false,
      allowOverflow: true,
      wrap: true,
      hide: "md",
    },
    {
      name: t("client.form.label.address_Street2"),
      selector: (info) => info.Address?.Street2,
      sortable: false,
      hide: "md",
      allowOverflow: true,
      wrap: true,
    },
    {
      name: t("client.form.label.address_PostCode"),
      selector: (info) => info.Address?.PostCode,
      sortable: false,
      hide: "md",
      allowOverflow: true,
      wrap: true,
    },
    {
      name: t("client.form.label.address_Location"),
      selector: (info) => info.Address?.Location,
      sortable: false,
      hide: "md",
      allowOverflow: true,
      wrap: true,
    },
    {
      name: t("client.form.label.clientCountryId"),
      selector: (info) => info.ClientCountry?.CountryName,
      sortable: false,
      hide: "md",
      allowOverflow: true,
      wrap: true,
    },
    {
      name: t("commonWords.form.label.firstName"),
      selector: (info) => info.FirstName,
      sortable: true,
      sortField: "FirstName",
      hide: "md",
      allowOverflow: true,
      wrap: true,
    },
    {
      name: t("commonWords.form.label.lastName"),
      selector: (info) => info.LastName,
      sortable: true,
      sortField: "LastName",
      hide: "md",
      allowOverflow: true,
      wrap: true,
    },
    {
      name: t("commonWords.form.label.phone"),
      selector: (info) => info.Phone,
      sortable: true,
      sortField: "Phone",
      hide: "md",
      allowOverflow: true,
      wrap: true,
    },
    {
      selector: (info) => info.TestingOffice?.TestingOfficeName,
      name: t("client.form.label.testingOfficeId"),
      sortable: false,
      allowOverflow: true,
      wrap: true,
      hide: "sm",
    },
    {
      name: t("testingoffice.form.label.Status"),
      sortable: false,
      hide: "sm",
      selector: (info) => (
        <Badge
          pill
          bg={`${
            info.isActive
              ? "success text-bg-success-soft"
              : "danger text-bg-danger-soft"
          }`}
        >
          {info.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      name: t("commonWords.list.actions"),
      sortable: false,
      allowOverflow: true,
      right: true,
      selector: (info) => info.Id,
      selector: (info) => (
        <ActionButtons
          info={info}
          handleStatusChange={handleStatusChange}
          module={"/client"}
          isCopy={true}
        />
      ),
    },
  ]);

  const [totalRecord, setTotalRecords] = useState(0);

  const callApi = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    const searchParam = [
      "ClientName",
      "ClientNumber",
      "Address/Street1",
      "Address/Street2",
      "Address/PostCode",
      "Address/Location",
      "FirstName",
      "LastName",
    ];

    let sortingLink = sorting?.id
      ? `&$orderby=${field} ${order}`
      : "&$orderby=CreatedOn DESC";
    let paginationLink = `${
      limit == "all" ? "" : `&top=${limit}&skip=${skip}`
    }`;

    let filterLink = generateFilterQuery(filter, searchParam, search);

    await clientList(
      token,
      `?$count=true&$expand=ClientCountry($select=CountryName),TestingOffice($select=TestingOfficeName)${filterLink}${sortingLink}${paginationLink}`
    )
      .then((data) => {
        _setData(data?.value);
        setTotalRecords(data["@odata.count"]);
      })
      .catch((error) => console.log(error));
  }, [limit, skip, sorting, field, order, filter, search, token]);

  async function handleStatusChange(id, value) {
    const token = localStorage.getItem("authToken");
    dispatch(fetching(true));
    await editClient(token, id, {
      isActive: value,
    })
      .then((data) => {
        value
          ? dispatch(success(t("AlertMessages.CLIENT_ACTIVE_SUCESS")))
          : dispatch(success(t("AlertMessages.CLIENT_INACTIVE_SUCESS")));
        callApi();
      })
      .catch((err) => dispatch(error(t("AlertMessages.NETWORK_ISSUE"))));
    dispatch(fetching(false));
  }
  useEffect(() => {
    callApi();
  }, [limit, skip, sorting, field, order, filter, search]);

  //   useEffect(() => {
  //     dispatch(
  //       addBreadCrumbs({
  //         client: [
  //           {
  //             name: "Client",
  //             link: `/client${tId ? `/${tId}` : ""}`,
  //           },
  //         ],
  //       })
  //     );
  //   }, [tId]);

  return (
    <Fragment>
      <Layout title="Accordion" content="container">
        {" "}
        <Block.Head page>
          <Block.HeadContent>
            {" "}
            <div className="d-flex justify-content-between">
              {" "}
              <Block.Title>Client</Block.Title>{" "}
              <Block.Title>
                <Link to={"add"}>
                  {" "}
                  <Button variant="primary">+ Add Client</Button>{" "}
                </Link>{" "}
              </Block.Title>{" "}
            </div>{" "}
            <Block.Text>
              {" "}
              <Breadcrumb className="breadcrumb-arrow">
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>{" "}
                <Breadcrumb.Item href="#" active>
                  Client{" "}
                </Breadcrumb.Item>{" "}
              </Breadcrumb>{" "}
            </Block.Text>{" "}
          </Block.HeadContent>{" "}
        </Block.Head>{" "}
        {/* <Block>
           <ClientList />
          {" "}
        </Block> */}
        {/* /////// */}
        <Block className={"mt-4"}>
          <Card>
            <div className="data-table-wrapper">
              <div className="data-table-top">
                <div className="data-table-search">
                  <SearchBox
                    search={search}
                    setSearch={setSearch}
                    // searchParam={searchString}
                  />
                </div>
                <div className="data-table-action-wrap">
                  <div>
                    <CommonSelect
                      type="Country"
                      name="ClientCountryId"
                      placeholder="Country"
                      value={filter.ClientCountryId}
                      setValue={(value) =>
                        setFilter({ ...filter, ClientCountryId: value })
                      }
                      hideInActive={false}
                    />
                  </div>
                  {testingOfficeId || tId ? (
                    <></>
                  ) : (
                    <div>
                      <CommonSelect
                        type="TestingOffice"
                        name="TestingOfficeId"
                        placeholder="TestingOffice"
                        value={filter.TestingOfficeId}
                        setValue={(value) =>
                          setFilter({ ...filter, TestingOfficeId: value })
                        }
                        hideInActive={false}
                      />
                    </div>
                  )}
                  <div>
                    <CommonSelect
                      type="Status"
                      name="isActive"
                      placeholder="Status"
                      value={filter.isActive}
                      setValue={(value) =>
                        setFilter({ ...filter, isActive: value })
                      }
                      hideInActive={false}
                    />
                  </div>
                </div>
                <div>
                  <div className="data-table-select flex-row-reverse">
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="tooltip-view">Reset Filter</Tooltip>
                      }
                    >
                      <span
                        className="ms-1 badge text-bg-primary-soft resetButton cursor-pointer"
                        onClick={() =>
                          setFilter({
                            isActive: true,
                            TestingOfficeId: testingOfficeId || tId || "",
                            ClientCountryId: "",
                          })
                        }
                      >
                        <Icon name="undo"></Icon>
                      </span>
                    </OverlayTrigger>
                    <PageSizeComponent
                      pagination={pagination}
                      onPaginationChange={onPaginationChange}
                    />
                    <span className="text me-1">Per Page</span>
                  </div>
                </div>
              </div>
              <Table
                data={data}
                columns={columns}
                onPaginationChange={onPaginationChange}
                onSortingChange={onSortingChange}
                pagination={pagination}
                sorting={sorting}
                totalRecord={totalRecord}
              />
            </div>
          </Card>
        </Block>
        <Outlet />
      </Layout>
    </Fragment>
  );
}

export default ClientList;
