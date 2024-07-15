import { red } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "../../components";
import CommonSelect from "../../components/custom/CommonSelect";
import SearchBox from "../../components/custom/SearchBox";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://18.158.81.67:80/api/Clients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(response.data.value);
        console.log(response.data.value);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchClients();
  }, []);

  //   async function handleStatusChange(id, value) {
  //     // dispatch(fetching(true));
  //     await editClient(token, id, {
  //       isActive: value,
  //     })
  //       .then((data) => {
  //         value
  //           ? dispatch(success(t("AlertMessages.CLIENT_ACTIVE_SUCESS")))
  //           : dispatch(success(t("AlertMessages.CLIENT_INACTIVE_SUCESS")));
  //         callApi();
  //       })
  //       .catch((err) => dispatch(error(t("AlertMessages.NETWORK_ISSUE"))));
  //     dispatch(fetching(false));
  //   }

  const columns = useMemo(() => [
    {
      selector: (info) => (
        <NavLink to={`view/${info.Id}`}>{info.ClientName}</NavLink>
      ),
      //   selector: (info) => info.ClientName,
      name: "CLIENT NAME",
      sortable: true,
      sortField: "ClientName",
      allowOverflow: true,
      wrap: true,
    },
    {
      selector: (info) => info.ClientNumber,
      name: "CLIENT NUMBER",
      sortable: true,
      sortField: "ClientNumber",
      allowOverflow: true,
      wrap: true,
    },
    {
      name: "ADDRESS",
      selector: (info) => info.Address.Street1,
      sortable: false,
      allowOverflow: true,
      wrap: true,
      hide: "md",
    },
    {
      name: "STREET",
      selector: (info) => info.Address.Street2,
      sortable: false,
      hide: "md",
      allowOverflow: true,
      wrap: true,
    },
    {
      name: "POSTAL CODE",
      selector: (info) => info.Address.PostCode,
      sortable: false,
      hide: "md",
      allowOverflow: true,
      wrap: true,
    },
    {
      name: "CITY",
      selector: (info) => info.Address.Location,
      sortable: false,
      hide: "md",
      allowOverflow: true,
      wrap: true,
    },
    {
      name: "COUNTRY",
      selector: (info) => info.ClientCountry,
      sortable: false,
      hide: "md",
      allowOverflow: true,
      wrap: true,
    },
    {
      name: "FIRST NAME",
      selector: (info) => info.FirstName,
      sortable: true,
      sortField: "FirstName",
      hide: "md",
      allowOverflow: true,
      wrap: true,
    },
    {
      name: "LAST NAME",
      selector: (info) => info.LastName,
      sortable: true,
      sortField: "LastName",
      hide: "md",
      allowOverflow: true,
      wrap: true,
    },
    {
      name: "PHONE",
      selector: (info) => info.Phone,
      sortable: true,
      sortField: "Phone",
      hide: "md",
      allowOverflow: true,
      wrap: true,
    },
    {
      selector: (info) => info.TestingOfficeId,
      name: "TESTING OFFICE",
      sortable: false,
      allowOverflow: true,
      wrap: true,
      hide: "sm",
    },
    {
      name: "STATUS",
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
      name: "ACTION",
      sortable: false,
      allowOverflow: true,
      right: true,
      selector: (info) => info.Id,
      selector: (info) =>
        // <button
        //   info={info}
        //   //   handleStatusChange={handleStatusChange}
        //   module={"/client"}
        //   isCopy={true}
        // />
        [
          <Link to={`view/${info.Id}`}>
            <Icon name="eye-fill"></Icon>
          </Link>,
          <Link to={`view/${info.Id}/client/edit/${info.Id}`}>
            <Icon name="edit"></Icon>
          </Link>,
          <Link to={`add`}>
            <Icon name="user-add"></Icon>
          </Link>
        ],
    },
  ]);
  

  return (
    <>
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
                    // value={filter.ClientCountryId}
                    // setValue={(value) =>
                    //   setFilter({ ...filter, ClientCountryId: value })
                    // }
                    hideInActive={false}
                  />
                </div>
                {/* {testingOfficeId || tId ? (
                  <></>
                ) : ( */}
                  <div>
                    <CommonSelect
                      type="TestingOffice"
                      name="TestingOfficeId"
                      placeholder="TestingOffice"
                    //   value={filter.TestingOfficeId}
                    //   setValue={(value) =>
                    //     setFilter({ ...filter, TestingOfficeId: value })
                    //   }
                      hideInActive={false}
                    />
                  </div>
                {/* )} */}
                <div>
                  <CommonSelect
                    type="Status"
                    name="isActive"
                    placeholder="Status"
                    // value={filter.isActive}
                    // setValue={(value) =>
                    //   setFilter({ ...filter, isActive: value })
                    // }
                    hideInActive={false}
                  />
                </div>
              </div>
              <div>
                <div className="data-table-select flex-row-reverse">
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="tooltip-view">Reset Filter</Tooltip>}
                  >
                    <span
                      className="ms-1 badge text-bg-primary-soft resetButton cursor-pointer"
                    //   onClick={() =>
                    //     setFilter({
                    //       isActive: true,
                    //       TestingOfficeId: testingOfficeId || tId || "",
                    //       ClientCountryId: "",
                    //     })
                        
                    //   }
                    >
                      <Icon name="undo"></Icon>
                    </span>
                  </OverlayTrigger>
                  <span className="text me-1">
                    {/* {t("commonWords.list.perPage")} */}
                  </span>
                </div>
              </div>
            </div>
          </div>
      <DataTable
        columns={columns}
        data={clients}
        fixedHeader
        pagination
        striped
        highlightOnHover
        actions
        noHeader
        pointerOnHover
      />
    </>
  );
};

export default ClientList;
