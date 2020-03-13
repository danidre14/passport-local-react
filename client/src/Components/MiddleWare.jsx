import React from "react";

import makeRequest from "../makeRequest";

function MiddleWare(props) {
  const pathname = props.location.pathname;
  const params = props.location.search;
  const fullPath = `${pathname}${params}`;

  function getData() {
    makeRequest(
      [`/api${fullPath}`],
      {},
      ({ code, value }) => {
        if (code && code === "REROUTE" && value && value !== pathname)
          props.history.push(value);
      },
      () => {}
    );
  }
  getData();

  return <></>;
}

export default MiddleWare;
