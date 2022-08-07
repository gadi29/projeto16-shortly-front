import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import TokenContext from "../contexts/TokenContext";

import logo from "../assets/images/logo.png";

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
          <h3>Entrar</h3>
        </Link>
        <Link to={'/signup'}>
          <h4>Cadastrar-se</h4>
        </Link>
      </SigninSignup>
      }
      <Link to={'/'}>
        <Logo>
          <h1>Shortly</h1>
          <img src={logo} alt="short verde" />
        </Logo>
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

const Logo = styled.div`
  display: flex;

  h1 {
    font-size: 64px;
    font-weight: 200;
    color: #000000;
  }
  img {
    width: 100px;
  }

  @media screen and (max-width: 480px) {
    h1 {
      font-size: 55px;
    }
    img {
      width: 80px;
    }
  }
`;

const SigninSignup = styled.div`
  width: 90%;
  margin-bottom: 40px;

  display: flex;
  justify-content: flex-end;

  font-size: 14px;
  font-weight: 400;

  h3 {
    color: #5D9040;
    margin-right: 22px;
  }

  h4 {
    color: #9C9C9C;
  }
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
    text-align: center;

    margin-right: 25px;
  }

  @media screen and (max-width: 480px) {
    h3 h4 {
      font-size: 13px;
    }
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