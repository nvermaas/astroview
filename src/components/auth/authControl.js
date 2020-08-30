import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";

import { ASTROBASE_URL } from '../../utils/skyserver'

export default function AuthControl() {
  const { isAuthenticated } = useContext(AuthContext);

  console.log("loggedIn: ", isAuthenticated);

  if (isAuthenticated) {
    return <Nav.Link href={`${ASTROBASE_URL}api-auth/logout/`}>Logout</Nav.Link>
  }

  return <Nav.Link href={`${ASTROBASE_URL}api-auth/login/`}>Login</Nav.Link>;
}
