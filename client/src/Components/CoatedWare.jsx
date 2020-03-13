import React, { useState, useEffect } from "react";

import makeRequest from "../makeRequest";

function CoatedWare(props) {
  const pathname = props.location.pathname;
  const params = props.location.search;
  const fullPath = `${pathname}${params}`;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    function getData() {
      makeRequest(
        [`/api${fullPath}`],
        {},
        ({ code, value }) => {
          if (code && code === "REROUTE" && value && value !== pathname)
            props.history.push(value);
          else setLoaded(true);
        },
        () => {}
      );
    }
    getData();
  }, []);

  return <>{loaded && props.children}</>;
}

export default CoatedWare;
