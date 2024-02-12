import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// console.log('getAuth: ', getAuth());

function Nav() {
  const initailUserData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {};

  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  // console.log('location', useLocation().pathname)
  // console.log('location', useLocation().search)
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [userData, setUserData] = useState(initailUserData);
  // console.log("userData: ", userData);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       if (pathname === "/") {
  //         navigate("/main");
  //       }
  //     } else {
  //       navigate("/");
  //     }
  //   });
  // }, [auth, navigate, pathname]);

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
    // console.log("target", e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log('result: ', result);
        // setUserData(result.user);
        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
        navigate("/");
      })
      .catch((error) => {
        // alert(error.message);
        console.log("error", error);
      });
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
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <Input
            value={searchValue}
            onChange={handleChange}
            className='nav_input'
            type='text'
            placeholder='search movie'
          />
          {/* {pathname !== "/" && ( */}
          <SignOut>
            {/* {userData.displayName} */}
            <UserImg src={userData.photoURL} alt={userData.displayName} />
            <DropDown>
              <span onClick={handleSignOut}>Sign out</span>
            </DropDown>
          </SignOut>
          {/* )} */}
        </>
      )}
    </NavWrapper>
  );
}

export default Nav;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;
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
const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  bax-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  font-size: 14px;
  padding: 10px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0;
`;
const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;
const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;
