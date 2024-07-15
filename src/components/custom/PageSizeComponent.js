import React from "react";

function PageSizeComponent(props) {
  const { pagination, onPaginationChange } = props;
  return (
    <select
      className="form-select flex-grow-1"
      value={pagination.pageSize}
      onChange={(e) => {
        onPaginationChange({ ...pagination, pageSize: e.target.value });
      }}
    >
      {[10, 25, 50, 100, 200, "all"].map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          {pageSize}
        </option>
      ))}
    </select>
  );
}

export default PageSizeComponent;
