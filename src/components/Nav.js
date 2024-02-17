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
  // const { pathname } = useLocation();
  // console.log('location', useLocation().pathname)
  // console.log('location', useLocation().search)
  const [data, setData] = useState("");
  // console.log('data: ', data);
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const location = useLocation();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q");
  // console.log('searchTerm: ', searchTerm);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleDataChange = (event) => {
    setData(event.target.value);
    setTimeout(() => {
      navigate(`/search?q=${event.target.value}`);
    }, 1300);
  };

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("userData", JSON.stringify(result.user));
        navigate("/main");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // setUserData();
        localStorage.removeItem("userData");
        navigate("/");
      })
      .catch((error) => {
        // alert(error.message);
        console.log("error", error);
      });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          alt='Disney Plus Logo'
          src='/images/logo.svg'
          onClick={() => (window.location.href = "/main")}
        />
      </Logo>
      {location.pathname !== "/" && (
        <Input
          // class='search'
          // value={data}
          value={data || searchTerm}
          onChange={handleDataChange}
          className='nav_input'
          type='text'
          placeholder='Search movie..'
        />
      )}
      {initailUserData.uid ? (
        <SignOut>
          <p>{`Hello ` + initailUserData.displayName.split(" ")[0] + `!`}</p>
          <UserImg src={initailUserData.photoURL} alt={initailUserData.displayName} />
          {/* <UserImg bg={initailUserData.photoURL} src={initailUserData.photoURL} alt={initailUserData.displayName} /> */}
          <DropDown>
            <span onClick={handleSignOut}>Sign out</span>
          </DropDown>
        </SignOut>
      ) : (
        <Login onClick={handleAuth}>Log in</Login>
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
  background: #090b13;
  input::placeholder {
    color: #c2c2c2fa;
    /* opacity: 1;  */
  }
`;
const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  font-size: 14px;
  &:hover {
    background-color: #f9f9f9;
    color: #212121eb;
    border-color: transparent;
  }
`;
const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #c2c2c224;
  color: #fff;
  padding: 5px;
  border: none;
  border: 1px solid #c2c2c2fa;
  border-radius: 4px;
  box-sizing: border-box;
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
  top: 50px;
  right: 10px;
  background: #fff;
  /* background: rgb(19, 19, 19); */
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  bax-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  font-size: 14px;
  padding: 10px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0;
  /* :hover{
    opacity: 1;
      transition-duration: 1s;
  } */
`;
const SignOut = styled.div`
  position: relative;
  height: 50px;
  width: 250px;
  display: flex;
  /* justify-content:center; */
  align-items: center;
  cursor: pointer;
  /* background: pink; */
  p {
    color: #fff;
    width: 200px;
    height: 15px;
    /* background: orange; */
    text-align: end;
    font-size: 14px;
    letter-spacing: 3px;
    padding-right: 10px;
  }
  img {
    width: 45px;
    height: 45px;
    /* background: blue; */
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 0.5s;
      width: 100px;
      display: flex;
      justify-content: center;
      color: #111;
      letter-spacing: 1px;
      color: #212121eb;
      /* inset: 0px; */
    }
  }
`;
const UserImg = styled.img`
  object-fit: cover;
  border-radius: 50%;
  /* width: 100%;
  height: 100%; */
`;
/* background-image:url(bg) */
/* background-image:url('/images/login-background.jpg') */
