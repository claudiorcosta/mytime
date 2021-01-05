import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";


const Header = (props) => {

  const { user, signOut } = props;
  const [currentLocation, setCurrentLocation] = useState("");
  const location = useLocation();

  useEffect(() => {

    setCurrentLocation(location.pathname);

  }, [location])


  const handleSignOutClick = () => {
    signOut();
  }

  const StyledWrapper = styled.div`
  width: 100%;
  text-align: right;
  `;

  const styleH6 = styled.h6`
      cursor: pointer;
  `;

  return (
    <div>

      <StyledWrapper>
        {currentLocation !== "/login" && currentLocation !== "/register" &&
          <styleH6> {user.displayName}  (<a onClick={handleSignOutClick}> Log Out </a>)</styleH6>
        }
      </StyledWrapper>
    </div>
  );
}


export default Header;