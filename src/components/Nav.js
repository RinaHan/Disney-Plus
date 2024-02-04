import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

function Nav() {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  // console.log('location', useLocation().pathname)
  // console.log('location', useLocation().search)
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    console.log("target", e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <NavWrapper show2={show}>
      <Logo>
        <img
          alt='Disney Plus Logo'
          src='/images/logo.svg'
          onClick={() => (window.location.href = "/")}
        />
      </Logo>
      {pathname === "/" ? (
        <Login>Login</Login>
      ) : (
        <Input
          value={searchValue}
          onChange={handleChange}
          className='nav_input'
          type='text'
          placeholder='search movie'
        />
      )}
    </NavWrapper>
  );
}

export default Nav;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`;
const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  /* background-color: #111; */
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  /* border: #fff 5px solid; */
  color: white;
  padding: 5px;
  border: none;
`;
const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  /* ${(props) => (props.show2 ? `backgroundColor:#dad` : `backgroundColor:#999`)}; */
  /* background-color: ${(props) => (props.show2 ? "#090b13" : "transparent")}; */
  background-color: ${(props) => (props.show2 ? "#090b13" : "transparent")};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;
const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;
