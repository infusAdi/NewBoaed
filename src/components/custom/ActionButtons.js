import Icon from "../Icon/Icon";
import { usePermission } from "../../customHooks/useCheckPermissions";
import React, { Fragment } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function ActionButtons({
  info,
  handleStatusChange,
  module,
  hideActive,
  isCopy,
  skipPermission,
}) {
  const permission = usePermission(module);
  const { t } = useTranslation();

  const alertConfirm = (info) => {
    Swal.fire({
      title: t("alert.title"),
      text: t("alert.text"),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: t("commonWords.form.button.cancel"),
      confirmButtonText: `Yes, ${
        info.isActive
          ? t("commonWords.form.button.Inactive")
          : t("commonWords.form.button.Active")
      } it!`,
    }).then((result) => {
      if (result.value) {
        handleStatusChange(info.Id, !info.isActive);
      } else {
      }
    });
  };

  return (
    <Fragment>
      {(permission?.AllowUpdate || skipPermission) && (
        <Link to={`edit/${info.Id}`}>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-edit">
                {t("commonWords.form.button.edit")}
              </Tooltip>
            }
          >
            <span className="badge text-bg-primary-soft">
              <Icon name="pen" />
            </span>
          </OverlayTrigger>
        </Link>
      )}
      {(permission?.AllowRead || skipPermission) && (
        <Link className="p-2" to={`view/${info.Id}`}>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-view">
                {t("commonWords.form.button.view")}
              </Tooltip>
            }
          >
            <span className="badge text-bg-primary-soft">
              <Icon name="eye" />
            </span>
          </OverlayTrigger>
        </Link>
      )}
      {(permission?.AllowCreate || skipPermission) && isCopy && (
        <Link className="pe-2" to={`add/${info.Id}`}>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-copy">
                {t("commonWords.form.button.copy")}
              </Tooltip>
            }
          >
            <span className="badge text-bg-primary-soft">
              <Icon name="copy" />
            </span>
          </OverlayTrigger>
        </Link>
      )}
      {(permission?.AllowDelete || skipPermission) && !hideActive && (
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="tooltip-active">
              {info.isActive
                ? t("commonWords.form.button.Inactive")
                : t("commonWords.form.button.Active")}
            </Tooltip>
          }
        >
          <span
            className={`badge text-bg-${
              info.isActive ? "danger" : "success"
            }-soft cursor-pointer`}
            onClick={(e) => alertConfirm(info)}
          >
            {info.isActive ? <Icon name="na" /> : <Icon name="check-circle" />}
          </span>
        </OverlayTrigger>
      )}
    </Fragment>
  );
}

export default ActionButtons;
