import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";

function SearchBox({ search, setSearch, searchParam = [] }) {
  const [value, setValue] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearch(value.toLocaleLowerCase());
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <input
      type="search"
      placeholder={`${t("search")} ${searchParam?.toString()}`}
      className="form-control search-width"
      name="search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    ></input>
  );
}

export default SearchBox;
