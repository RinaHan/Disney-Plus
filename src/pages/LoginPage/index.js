import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Content>
        <Center>
          <LogoOne src='/images/cta-logo-one.svg' alt='logo-one' />
          <SignUpLink
            onClick={() => {
              navigate("/main");
            }}
          >
            Explore the site!
          </SignUpLink>
          {/* <SignUpLink>Please log in to explore the site.</SignUpLink> */}
          {/* <SignUpLink>Sign up now</SignUpLink> */}
          <Description>
            Save over 15% on your premium or Standard plan with an annual subscription
          </Description>
          <LogoTwo src='images/cta-logo-two.png' alt='logo-two' />
          <BgImage src='images/login-background.jpg' />
        </Center>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  heigth: 100vh;
`;
const Content = styled.div`
  /* background-color: #dad; */
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;
const Center = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const LogoOne = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;
`;
const SignUpLink = styled.a`
  font-weight: bold;
  color: #f9f9f9;
  background-color: #0063e5;
  margin-bottom: 12px;
  width: 100%;
  letter-spacing: 1.5px;
  font-size: 18px;
  padding: 16.5px 0;
  border: 1px solid transparent;
  border-radius: 4px;
  &:hover {
    background-color: #0483ee;
  }
`;
const Description = styled.p`
  /* color: hsla(0, 0%, 95.3%, 1); */
  font-size: 11px;
  margin: 0 0 24px;
  line-height: 1.5;
  letter-spacing: 1.5px;
`;
const LogoTwo = styled.img`
  max-width: 600px;
  margin-bottom: 20px;
  display: inline-block;
  vertical-align: bottom:
  width: 100%;
`;
const BgImage = styled.img`
  height: 100%;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  /* background-image:url('/images/login-background.jpg') */
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  /* background-color:red; */
  z-index: -1;
`;
