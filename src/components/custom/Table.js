import DataTablePagination from "../Pagination/DataTablePagination";
import React, { useState, useEffect, Fragment } from "react";
// import Pagination from "./Pagination";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function Table(props) {
  const {
    data,
    columns,
    onPaginationChange,
    onSortingChange,
    pagination,
    totalRecord,
  } = props;

  const isFetching = useSelector((state) => state.fetch.isFetching);
  const { t } = useTranslation();

  const ExpandedComponent = ({ data }) => {
    return (
      <ul className="data-details p-3 gap gy-1 border-bottom small">
        {columns.map((x, i) => (
          <li key={`table_li_${i}`}>
            <span className="data-title text-base fw-medium me-2">
              {x.name}:
            </span>
            <span className="data-text text-light">
              {typeof x.selector == "string"
                ? data[x.selector]
                : x.selector(data)}
            </span>
          </li>
        ))}
      </ul>
    );
  };
  const [mobileView, setMobileView] = useState(false);

  const viewChange = () => {
    if (window.innerWidth < 960) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

  useEffect(() => {
    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    return () => {
      window.removeEventListener("resize", viewChange);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      <DataTable
        columns={columns}
        data={data}
        expandableRowsComponent={ExpandedComponent}
        expandableRows={mobileView}
        fixedHeader={true}
        noDataComponent={<div className="p-2">{t("message.emptyList")}</div>}
        className="data-table-head-light table-responsive"
        sortIcon={<div className="data-table-sorter"></div>}
        progressPending={isFetching}
        sortServer
        onSort={(field, direction) =>
          onSortingChange({
            id: field.sortField,
            order: direction,
          })
        }
        pagination
        paginationServer
        paginationTotalRows={totalRecord}
        onChangeRowsPerPage={(value) =>
          onPaginationChange({ ...pagination, pageSize: value })
        }
        onChangePage={(value) =>
          onPaginationChange({ ...pagination, pageIndex: value - 1 })
        }
        paginationComponent={({
          rowsPerPage,
          rowCount,
          onChangePage,
          onChangeRowsPerPage,
          currentPage,
        }) => (
          <div className="data-table-bottom">
            <DataTablePagination
              showItemPerPage={
                pagination.pageSize === "all" ? 1000000000 : pagination.pageSize
              }
              itemPerPage={rowsPerPage}
              totalItems={rowCount}
              paginate={onChangePage}
              currentPage={currentPage}
              onChangeRowsPerPage={onChangeRowsPerPage}
            />
          </div>
        )}
      />
    </Fragment>
  );
}

export default Table;
