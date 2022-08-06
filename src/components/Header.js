import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import TokenContext from "../contexts/TokenContext";

import logo from "../assets/images/Logo.png";

export default function Header() {
  const { token, setToken } = useContext(TokenContext);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect((() => {
    if(token) {
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      };

      const response = axios.get('https://projeto16--shortly.herokuapp.com/users/me', config);

      response.then(r => {
        setName(r.data.name);
      });
      response.catch(r => {
        alert(`Erro ${r.response.status}`);
      });
    }
  }), [token]);

  function signout() {
    if (window.confirm("Tem certeza que deseja sair?")) {
      localStorage.removeItem("token");
      setToken('');
      navigate('/');
    }
  }

  return(
    <Container>
      {token ? 
      <TopBar>
        <h3>Seja bem-vind@, {name}</h3>
        <RightSide>
          <Link to={'/main'}>
            <h3>Home</h3>
          </Link>
          <Link to={'/'}>
            <h3>Ranking</h3>
          </Link>
          <h4 onClick={signout}>Sair</h4>
        </RightSide>
      </TopBar> 
      : 
      <SigninSignup>
        <Link to={'/signin'}>
          <Signin>Entrar</Signin>
        </Link>
        <Link to={'/signup'}>
          <Signup>Cadastrar-se</Signup>
        </Link>
      </SigninSignup>
      }
      <Link to={'/'}>
        <img src={logo} alt="logo" />
      </Link>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 30px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SigninSignup = styled.div`
  width: 100%;
  margin-right: 170px;
  margin-bottom: 40px;

  display: flex;
  justify-content: flex-end;

  font-size: 14px;
  font-weight: 400;
`

const Signin = styled.h2`
  color: #5D9040;
  
  margin-right: 22px;
`

const Signup = styled.h2`
  color: #9C9C9C;
`

const TopBar = styled.div`
  width: 90%;
  margin-bottom: 40px;
  
  display: flex;
  justify-content: space-between;

  h3 {
    color: #5D9040;
    font-size: 14px;
    font-weight: 400;
  }
`

const RightSide = styled.div`
  display: flex;

  h3 {
    color: #9C9C9C;
    margin-right: 10px;
  }

  h4 {
    text-decoration: underline;
    color: #9C9C9C;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
  }

`