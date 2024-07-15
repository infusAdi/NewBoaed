import Select from "../Form/Select";
import React, { memo } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const CommonSelect = memo(function CommonSelect(props) {
  const { type, name, placeholder, value, setValue, hideInActive, isDisabled } =
    props;
  const { t } = useTranslation();
  const userGroupOptions = useSelector((state) => state.common.userGroup);
  const roleOptions = useSelector((state) => state.common.userRole);
  const testingOfficeOptions = useSelector(
    (state) => state.common.testingOffice
  );
  const countryOptions = useSelector((state) => state.common.country);
  const statusOptions = [
    {
      value: true,
      label: "Active",
    },
    {
      value: false,
      label: "Inactive",
    },
  ];

  let options = [];
  if (type === "TestingOffice") {
    options = testingOfficeOptions;
  } else if (type === "Country") {
    options = countryOptions;
  } else if (type === "Role") {
    options = roleOptions;
  } else if (type === "Group") {
    options = userGroupOptions;
  } else if (type === "Status") {
    options = statusOptions;
  }

  return (
    <Form.Select
      id={name}
      name={name}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      disabled={isDisabled}
    >
      {placeholder && (
        <option value="">{`${t("commonMaster.list.select")} ${t(
          ` ${placeholder}`
        )}`}</option>
      )}
      {options?.map((x, i) => {
        if (hideInActive) {
          return (
            x.isActive && (
              <option
                key={`${type}_opt_${i}`}
                value={type == "Group" ? x.key : x.value}
              >
                {type == "Group" ? x.key : x.label}
              </option>
            )
          );
        } else {
          return (
            <option
              key={`${type}_opt_${i}`}
              value={type == "Group" ? x.key : x.value}
            >
              {type == "Group" ? x.key : x.label}
            </option>
          );
        }
      })}
    </Form.Select>
  );
});
export default CommonSelect;
