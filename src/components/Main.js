import { useContext, useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import axios from "axios";

import TokenContext from "../contexts/TokenContext";

import trash from "../assets/images/trash.png";

function Main() {
  const [url, setUrl] = useState({url: ''});
  const [userUrls, setUserUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(false);
  const { token } = useContext(TokenContext);
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  };

  useEffect((() => {
    setLoading(true);
    const response = axios.get('https://projeto16--shortly.herokuapp.com/users/me', config);

    response.then(r => {
      setUserUrls({ ...r.data });
      setLoading(false);
    });
    response.catch(r => {
      alert(`Erro ${r.response.status}`);
      setLoading(false);
    });
  }), [state]);

  function sendLink(e) {
    e.preventDefault();
    setLoading(true);

    const response = axios.post('https://projeto16--shortly.herokuapp.com/urls/shorten', {...url}, config);
    response.then(r => {
      setState(!state);
      setUrl({url: ''});
    });
    response.catch(r => {
      alert(`Erro ${r.response.status}`);
      setLoading(false);
    });
  }

  function deleteLink(id) {
    setLoading(true);

    const response = axios.delete(`https://projeto16--shortly.herokuapp.com/urls/${id}`, config);
    response.then(() => {
      setState(!state);
    });
    response.catch(r => {
      alert(`Erro ${r.response.status}`);
      setLoading(false);
    });
  }

  return (
    <Container loading={loading}>
      <form onSubmit={sendLink}>
        <input
          type="text"
          value={url.url}
          onChange={(e) => setUrl({...url, url: e.target.value})}
          placeholder="Links que cabem no bolso"
          disabled={loading}
          required
        />
        <button type="submit">{loading ? <ThreeDots color="#FFFFFF" width={50} height={20} /> : "Encurtar link"}</button>
      </form>
      <UserLinks loading={loading}>
        {loading ? <ThreeDots /> : 
        userUrls.shortenedUrls ?
        userUrls.shortenedUrls.map((link, index) => 
          <Link>
            <div key={index}>
              <h2>{link.url}</h2>
              <h2>{link.shortUrl}</h2>
              <h2>Quantidade de visitantes: {link.visitCount}</h2>
            </div>
            <button><img src={trash} alt="excluir" /></button>
          </Link>) : <h2>Você ainda não possui links encurtados</h2>}
      </UserLinks>
    </Container>
    
  );
}

const Container = styled.div`
  width: 100%;
  margin-top: 70px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    width: 85%;
    margin-bottom: 25px;

    display: flex;
    justify-content: space-between;

    input {
      background: #FFFFFF;
      border: 1px solid rgba(120, 177, 89, 0.25);
      box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
      border-radius: 12px;

      width: 80%;
      padding: 21px;
    }

    button {
      background: #5D9040;
      border: none;
      border-radius: 12px;
      cursor: ${({ loading }) => loading ? "initial" : "pointer"};
      color: #FFFFFF;
      font-size: 14px;

      width: 15%;
      padding: 21px;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const Link = styled.div`
  width: 100%;
  margin-bottom: 25px;
  display: flex;

  div {
    background: #80CC74;
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    border-radius: 12px 0px 0px 12px;
    color: #FFFFFF;

    width: 90%;
    padding: 25px;

    display: flex;
    justify-content: space-between;

    h2 {
      width: 30%;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    h2:first-of-type {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      width: 40%;
      justify-content: flex-start;
    }

    h2:last-of-type {
      justify-content: flex-end;
    }
  }

  button {
    background: #FFFFFF;
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    border-radius: 0px 12px 12px 0px;
    border: 1px solid #80CC74;
    cursor: ${({ loading }) => loading ? "initial" : "pointer"};

    width: 10%;
  }
`;

const UserLinks = styled.div`
  background: #FFFFFF;
  
  width: 85%;
  margin-top: 35px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Main;