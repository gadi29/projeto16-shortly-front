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
    <Body>
      <Container>
        <h2><img src={trophy} alt="troféu" />Ranking</h2>
        <Ranking loading={loading}>
          {loading ? <ThreeDots /> : 
            <Users>
              {ranking.map((user, index) => 
                <div key={index}>
                  <h3>
                    {index+1}. {user.name}
                  </h3>
                  <h3>
                    - {user.linksCount} {user.linksCount === "1" ? "link" : "links"}
                  </h3>
                  <h3>
                    - {user.visitCount} {user.visitCount === "1" ? "visualização" : "visualizações"}
                  </h3>
                </div>)}
            </Users>
          }
        </Ranking>
        <h2>{token ? <></> : "Crie sua conta para usar nosso serviço!"}</h2>
      </Container>
    </Body>
  );
}

const Body = styled.body`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 90%;
  margin-top: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: #000000;
    font-size: 36px;
    font-weight: 700;
    text-align: center;

    margin-bottom: 30px;

    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 480px) {
    h2:last-of-type {
      font-size: 32px;
    }
  }
`

const Ranking = styled.div`
  background: #FFFFFF;
  border: 1px solid rgba(120, 177, 89, 0.25);
  box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
  border-radius: 24px 24px 0px 0px;

  width: 85%;
  padding: 20px 40px 30px 40px;
  margin-bottom: 60px;

  display: flex;
  justify-content: ${({ loading }) => loading ? "center" : "flex-start" };

  @media screen and (max-width: 480px) {
    justify-content: center;
  }
`

const Users = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    h3 {
      font-size: 22px;
      margin: 0 4px;
      margin-top: 10px;
    }
  }

  @media screen and (max-width: 720px) {
    div {
      h3:nth-child(2) {
        display: none;
      }
    }
  }

  @media screen and (max-width: 480px) {
    div {
      h3:last-of-type {
        display: none;
      }
    }
  }
`;

export default Initial;