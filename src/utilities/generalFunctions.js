export function generateFilterQuery(
    filter = [],
    searchParam = [],
    search = ""
  ) {
    let filterLink = "";
  
    for (const key in filter) {
      if (filter[key]) {
        filterLink =
          filterLink === ""
            ? `&$filter=${key} eq ${
                key.includes("Id") || key.includes("isActive")
                  ? filter[key]
                  : `'${filter[key]}'`
              }`
            : `${filterLink} AND ${key} eq  ${
                key.includes("Id") || key.includes("isActive")
                  ? filter[key]
                  : `'${filter[key]}'`
              }`;
      }
    }
  
    let searchLink = "";
  
    if (search) {
      searchParam.forEach((param) => {
        searchLink = searchLink === "" ? "" : `${searchLink} OR `;
        searchLink = `${searchLink} contains(tolower(${param}),'${search}') eq true`;
      });
    }
  
    filterLink = searchLink
      ? filterLink === ""
        ? `&$filter=${searchLink}`
        : `${filterLink} AND (${searchLink})`
      : filterLink;
  
    return filterLink;
  }
  
  export function findSubGroupText(groups, parentGroup, subGroupKey) {
    let subGroup = groups.find((f) => f.key === parentGroup)?.sub;
    return subGroup?.find((x) => x.key === subGroupKey)?.displayText;
  }
  
  export function findKeyFromObject(Objects, value) {
    return Object.keys(Objects).find((key) => value.includes(Objects[key]));
  }
  