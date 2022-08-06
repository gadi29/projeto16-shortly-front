import React, { useEffect, useState, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import axios from "axios";

import TokenContext from "../contexts/TokenContext";

import trophy from "../assets/images/Vector.png";

function Initial() {
  const [loading, setLoading] = useState(false);
  const [ranking, setRanking] = useState([]);
  const { token } = useContext(TokenContext);
  
  useEffect((() => {
    setLoading(true);
    const response = axios.get('https://projeto16--shortly.herokuapp.com/ranking');

    response.then(r => {
      setRanking([...r.data]);
      setLoading(false);
    });
    response.catch(r => {
      alert(`Erro ${r.response.status}`);
      setLoading(false);
    });
  }), []);
  
  return (
    <Container>
      <h2><img src={trophy} alt="troféu" />Ranking</h2>
      <Ranking loading={loading}>
        {loading ? <ThreeDots /> : 
          <Users>
            {ranking.map((user, index) => 
              <div key={index}>
                {index+1}. {user.name} - {user.linksCount} links - {user.visitCount} visualizações
              </div>)}
          </Users>
        }
      </Ranking>
      <h2>{token ? <></> : "Crie sua conta para usar nosso serviço!"}</h2>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: #000000;
    font-size: 36px;
    font-weight: 700;

    margin-bottom: 30px;

    display: flex;
    align-items: center;
  }
`

const Ranking = styled.div`
  background: #FFFFFF;
  border: 1px solid rgba(120, 177, 89, 0.25);
  box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
  border-radius: 24px 24px 0px 0px;

  width: 75%;
  padding-top: 20px;
  padding-left: 40px;
  padding-bottom: 30px;
  margin-bottom: 60px;

  display: flex;
  justify-content: ${({ loading }) => loading ? "center" : "flex-start" };
`

const Users = styled.div`
  display: flex;
  flex-direction: column;

  div {
    margin-top: 10px;
    font-size: 22px;
  }
`;

export default Initial;