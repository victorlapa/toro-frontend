import styled from "styled-components";

export const Container = styled.div`
  padding: 50px 80px;
  height: 100%;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  h1 {
    color: #091827;
    font-weight: 700;
    font-size: 42px;
  }
  
  span {
    font-weight: 400;
    font-size: 14px;
    color: #7E868E;
    padding-right: 18px;
    min-width: 250px;
  }

  button + button {
    margin-top: 8px;
  }
`

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`