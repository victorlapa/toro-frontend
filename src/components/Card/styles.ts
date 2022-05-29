import styled from "styled-components"

interface ITrend{
  uptrend?: boolean
}

export const Container = styled.div`
  height: 400px;
  width: 300px;
  margin-top: 50px;
  border: 1px solid #D1D5D7;
  color: #091827;

  font-size: 16px;
  display: flex;
  flex-direction: column;

  p {
    padding-top: 16px;
  }
`

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  color: #7E868E;
`

export const Price = styled.div<ITrend>`
  padding-top: 16px;
  color: ${props => props.uptrend ? '#00C853' : '#F44336'};
  font-size: 32px;
  display: flex;

  img {
    padding: 16px;
  }
`

export const StockInfo = styled.div`
  padding: 32px 40px;
`
