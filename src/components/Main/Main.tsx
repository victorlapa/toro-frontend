import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

import * as styled from "./styles";

import { Stock } from "../../types/stock";

import Button from "../Button";
import Card from "../Card/Card";

interface StockMessage {
  [key: string]: number;
  timestamp: number;
}

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL as string;
const PRICES_LIMIT = 50 as const;

export default function Main() {
  const [messageHistory, setMessageHistory] = useState<Stock[]>([]);
  const [sortDirection, setSortDirection] = useState<
    "asc" | "desc" | undefined
  >();

  const { lastJsonMessage } = useWebSocket(SOCKET_URL, {
    shouldReconnect: () => true,
  });

  useEffect(() => {
    const message = lastJsonMessage as StockMessage;

    if (message) {
      const tickerKey = Object.keys(message).find((e) => e !== "timestamp");

      if (tickerKey) {
        const found = messageHistory.find((e) => e.ticker === tickerKey);

        if (found) {
          const lastPrice = found.prices[found.prices.length - 1];
          if (lastPrice.timestamp !== message.timestamp) {
            found.prices.push({
              timestamp: message.timestamp,
              value: message[tickerKey],
            });
            if (found.prices.length > PRICES_LIMIT) {
              found.prices.shift();
            }
          }
        } else {
          messageHistory.push({
            ticker: tickerKey,
            prices: [
              { timestamp: message.timestamp, value: message[tickerKey] },
            ],
          });
        }
      }
      const sorted = messageHistory.sort((a, b) => {
        if (
          a.prices[a.prices.length - 1].value >
          b.prices[b.prices.length - 1].value
        ) {
          return sortDirection === "asc" ? -1 : 1;
        } else if (
          b.prices[b.prices.length - 1].value >
          a.prices[a.prices.length - 1].value
        ) {
          return sortDirection === "asc" ? 1 : -1;
        } else {
          return 0;
        }
      });

      setMessageHistory(
        sorted.map((e) => ({
          ticker: e.ticker,
          prices: e.prices.map((f) => ({ ...f })),
        }))
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage, sortDirection]);

  return (
    <styled.Container>
      <styled.Header>
        <div>
          <h1>Explore o mercado</h1>
        </div>
        <div>
          <span>Ordenar:</span>
          <Button
            selected={sortDirection === "asc"}
            onClick={() => setSortDirection("asc")}
          >
            Em Alta
          </Button>
          <Button
            selected={sortDirection === "desc"}
            onClick={() => setSortDirection("desc")}
          >
            Em Baixa
          </Button>
        </div>
      </styled.Header>
      <styled.CardsWrapper>
        {messageHistory.map((e, i) => (
          <div style={{ margin: "16px" }} key={String(i)}>
            <Card ticker={e} />
          </div>
        ))}
      </styled.CardsWrapper>
    </styled.Container>
  );
}
