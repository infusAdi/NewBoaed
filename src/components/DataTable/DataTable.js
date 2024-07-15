import React, { Fragment, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import exportFromJSON from 'export-from-json'
import { Button } from 'react-bootstrap';

import DataTablePagination from '../Pagination/DataTablePagination';
import { useTranslation } from 'react-i18next';


// export file component

const Export = ({ data }) => {
    const fileName = "user-data";

    const exportCSV = () => {
      const exportType = exportFromJSON.types.csv;
      exportFromJSON({ data, fileName, exportType });
    };
  
    const exportExcel = () => {
      const exportType = exportFromJSON.types.xls;
      exportFromJSON({ data, fileName, exportType });
    };
  
    return (
        <div className="export-options d-flex align-items-center me-2">
            <div className="export-title small me-2">Export</div>
            <div className="btn-group">
                <Button variant="outline-light" onClick={() => exportCSV()}>
                    CSV
                </Button>
                <Button variant="outline-light" onClick={() => exportExcel()}>
                    Excel
                </Button>
            </div>
        </div>
    );
  };


// expanded component in mobile view

const expandedComponent = ({ data }) => {
    return (
      <ul className="data-details p-3 gap gy-1 border-bottom small">
        <li>
          <span className="data-title text-base fw-medium me-2">Name:</span> 
          <span className="data-text text-light">{data.name}</span>
        </li>
        <li>
          <span className="data-title text-base fw-medium me-2">Age:</span> 
          <span className="data-text text-light">{data.age}</span>
        </li>
        <li>
          <span className="data-title text-base fw-medium me-2">Position:</span> 
          <span className="data-text text-light">{data.position}</span>
        </li>
        <li>
          <span className="data-title text-base fw-medium me-2">Company:</span> 
          <span className="data-text text-light">{data.company}</span>
        </li>
        <li>
          <span className="data-title text-base fw-medium me-2">Start Date:</span> 
          <span className="data-text text-light">{data.startDate}</span>
        </li>
        <li>
          <span className="data-title text-base fw-medium me-2">Salary:</span> 
          <span className="data-text text-light">{data.salary}</span>
        </li>
      </ul>
    );
};

// custom checkbox

const customCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
  <div className="form-check" id={rest.name}>
    <input
      type="checkbox"
      className="form-check-input"
      ref={ref}
      onClick={onClick}
      {...rest}
    />
  </div>
));

function DataTableComponent({data, columns, className, expandableRows, actions, tableClassName, selectableRows, ...props}) {
    const [tableData, setTableData] = useState(data);
    const [searchText, setSearchText] = useState('');
    const [showItemPerPage, setShowItemPerPage] = useState(10);
    const [mobileView, setMobileView] = useState(false);

    // filter items by name
    useEffect(() => {
        const filteredData = data.filter(
            item => item.name.toLowerCase().includes(searchText.toLowerCase())
        );

        setTableData(filteredData);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText])

    // function to change the table design view to expanable under 1200 px
    const viewChange = () => {
        if (window.innerWidth < 960 && expandableRows) {
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
    <div className="data-table-wrapper">
        <div className="data-table-top">
            <div className="data-table-search">
                <input 
                    className="form-control" 
                    placeholder="Search by name" 
                    type="text" 
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <div className="data-table-action-wrap">
                {actions && <Export data={data} />}
                <div className="data-table-select">
                    <select 
                        className="form-select" 
                        onChange={(e) => setShowItemPerPage(e.target.value)}
                        value={showItemPerPage}
                        >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                    </select>
                    <span className="text">Per page</span>
                </div>
            </div>
        </div>
        <DataTable
            columns={columns}
            data={tableData}
            className={tableClassName}
            noDataComponent={<div className="p-2">There are no records found.</div>}
            sortIcon={
                <div className="data-table-sorter"></div>
            }
            pagination
            expandableRowsComponent={expandedComponent}
            expandableRows={mobileView}
            selectableRows={selectableRows}
            selectableRowsComponent={customCheckbox}
            paginationComponent={({ rowsPerPage, rowCount, onChangePage, onChangeRowsPerPage, currentPage }) => (
                <div className="data-table-bottom">
                  <DataTablePagination
                    showItemPerPage={showItemPerPage}
                    itemPerPage={rowsPerPage}
                    totalItems={rowCount}
                    paginate={onChangePage}
                    currentPage={currentPage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    setShowItemPerPage={setShowItemPerPage}
                />
                </div>
            )}
        />
    </div>
  )
}

export default DataTableComponent;



/////////////////////////////////////
// function Table(props) {
//   const {
//     data,
//     columns,
//     onPaginationChange,
//     onSortingChange,
//     pagination,
//     totalRecord,
//   } = props;

//   // const isFetching = useSelector((state) => state.fetch.isFetching);
//   const { t } = useTranslation();

//   const ExpandedComponent = ({ data }) => {
//     return (
//       <ul className="data-details p-3 gap gy-1 border-bottom small">
//         {columns.map((x, i) => (
//           <li key={`table_li_${i}`}>
//             <span className="data-title text-base fw-medium me-2">
//               {x.name}:
//             </span>
//             <span className="data-text text-light">
//               {typeof x.selector == "string"
//                 ? data[x.selector]
//                 : x.selector(data)}
//             </span>
//           </li>
//         ))}
//       </ul>
//     );
//   };
//   const [mobileView, setMobileView] = useState(false);

//   const viewChange = () => {
//     if (window.innerWidth < 960) {
//       setMobileView(true);
//     } else {
//       setMobileView(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("load", viewChange);
//     window.addEventListener("resize", viewChange);
//     return () => {
//       window.removeEventListener("resize", viewChange);
//     };
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   return (
//     <Fragment>
//       <DataTable
//         columns={columns}
//         data={data}
//         expandableRowsComponent={ExpandedComponent}
//         expandableRows={mobileView}
//         fixedHeader={true}
//         noDataComponent={<div className="p-2">{t("message.emptyList")}</div>}
//         className="data-table-head-light table-responsive"
//         sortIcon={<div className="data-table-sorter"></div>}
//         // progressPending={isFetching}
//         sortServer
//         onSort={(field, direction) =>
//           onSortingChange({
//             id: field.sortField,
//             order: direction,
//           })
//         }
//         pagination
//         paginationServer
//         paginationTotalRows={totalRecord}
//         onChangeRowsPerPage={(value) =>
//           onPaginationChange({ ...pagination, pageSize: value })
//         }
//         onChangePage={(value) =>
//           onPaginationChange({ ...pagination, pageIndex: value - 1 })
//         }
//         paginationComponent={({
//           rowsPerPage,
//           rowCount,
//           onChangePage,
//           onChangeRowsPerPage,
//           currentPage,
//         }) => (
//           <div className="data-table-bottom">
//             <DataTablePagination
//               showItemPerPage={
//                 pagination.pageSize === "all" ? 1000000000 : pagination.pageSize
//               }
//               itemPerPage={rowsPerPage}
//               totalItems={rowCount}
//               paginate={onChangePage}
//               currentPage={currentPage}
//               onChangeRowsPerPage={onChangeRowsPerPage}
//             />
//           </div>
//         )}
//       />
//     </Fragment>
//   );
// }

// export default Table;