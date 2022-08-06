import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({name:'', email:'', password:'', confirmPassword:''});
  const navigate = useNavigate();
  
  async function handleSignup(e) {
    e.preventDefault();

    setLoading(true);
    try{
      await axios.post('https://projeto16--shortly.herokuapp.com/signup', {...newUser});
      setLoading(false);
      alert('Usuário cadastrado com sucesso!')
      navigate('/signin');
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  }

  return (
    <Container loading={loading}>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
          placeholder="Nome"
          disabled={loading}
          required
        />
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
          placeholder="E-mail"
          disabled={loading}
          required
        />
        <input
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({...newUser, password: e.target.value})}
          placeholder="Senha"
          disabled={loading}
          required
        />
        <input
          type="password"
          value={newUser.confirmPassword}
          onChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})}
          placeholder="Confirmar senha"
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
`;

export default Signup;