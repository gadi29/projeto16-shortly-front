import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import TokenContext from "../contexts/TokenContext";

function Signin() {
  const [user, setUser] = useState({email: '', password: ''});
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  async function handleSignin(e) {
    e.preventDefault();

    setLoading(true);
    try{
      const { data: token } = await axios.post('https://projeto16--shortly.herokuapp.com/signin', {...user});
      localStorage.setItem("token", JSON.stringify(token));
      setToken(token);
      setLoading(false);
      navigate('/main');
    } catch (error) {
      alert('E-mail ou senha incorretos!');
      setLoading(false);
    }
  }

  return (
    <Container loading={loading}>
      <form onSubmit={handleSignin}>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})}
          placeholder="E-mail"
          disabled={loading}
          required
        />
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({...user, password: e.target.value})}
          placeholder="Senha"
          disabled={loading}
          required
        />
        <button type="submit">{loading ? <ThreeDots color="#FFFFFF" width={50} height={20} /> : "Entrar"}</button>
      </form>
    </Container>
  );
}

const Container = styled.div`
    margin-top: 70px;

    display: flex;
    justify-content: center;
    align-items: center;

  form {
    width: 55%;
    margin-bottom: 30px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input {
      background: #FFFFFF;
      border: 1px solid rgba(120, 177, 89, 0.25);
      box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
      border-radius: 12px;

      width: 100%;
      padding: 21px;
      margin-bottom: 25px;
    }

    button {
      background: #5D9040;
      border: none;
      color: #FFFFFF;
      font-size: 14px;
      cursor: ${({ loading }) => loading ? "initial" : "pointer"};

      width: 30%;
      border-radius: 12px;
      padding: 21px;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media screen and (max-width: 720px) {
    form {
      width: 65%;
    }
  }

  @media screen and (max-width: 480px) {
    margin-top: 45px;

    form {
      width: 75%;
      button {
        font-size: 12px;
      }
    }
  }
`

export default Signin;