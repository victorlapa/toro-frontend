import { useMemo } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

import * as styled from "./styles";

import stockLogo from "../../assets/placeholder-stock-logo.svg";
import uptrendArrow from "../../assets/uptrend.svg";
import downtrendArrow from "../../assets/downtrend.svg";

import { Stock } from "../../types/stock";

interface Props {
  ticker: Stock;
}

export default function Card({ ticker }: Props) {
  const { price, uptrend, values } = useMemo(() => {
    const lastPrice = ticker.prices[ticker.prices.length - 1];
    const secondLastPrice =
      ticker.prices[ticker.prices.length - 2] ?? lastPrice;

    return {
      price: lastPrice.value,
      uptrend: lastPrice.value >= secondLastPrice.value,
      values: ticker.prices,
    };
  }, [ticker]);

  return (
    <styled.Container>
      <styled.StockInfo>
        <img src={stockLogo} alt="Stock Logo" />
        <styled.Title>
          <span>{ticker.ticker}</span>
        </styled.Title>
        <p>PREÇO DO ATIVO</p>
        <styled.Price uptrend={uptrend}>
          <h3>{`R$ ${price}`}</h3>
          <img
            src={uptrend ? uptrendArrow : downtrendArrow}
            alt="Uptrend arrow"
            className="trend"
          />
        </styled.Price>
      </styled.StockInfo>
      <ResponsiveContainer width="100%" height="75%">
        <LineChart data={values}>
          <Line
            type="basis"
            name="Valor"
            dataKey="value"
            stroke="#006b83"
            fill="#00ADD2"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </styled.Container>
  );
}
