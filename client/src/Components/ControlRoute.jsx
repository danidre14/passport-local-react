import React, { useState, useEffect } from "react";

import makeRequest from "../makeRequest";
import { Route, Redirect } from "react-router-dom";

function ControlRoute({ component: Component, ...props }) {
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
            // props.history.push(value);
            setLoaded(value);
          else setLoaded(true);
        },
        () => {}
      );
    }
    getData();
  }, []);

  return (
    <>
      <Route
        {...props}
        render={routeProps =>
          loaded === true ? (
            <Component {...props} {...routeProps} />
          ) : loaded === false ? (
            <>Loading</>
          ) : (
            <Redirect to={loaded} />
          )
        }
      />
    </>
  );
}

export default ControlRoute;
