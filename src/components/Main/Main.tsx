import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

import * as styled from "./styles";

import { Stock } from "../../types/stock";

import Button from "../Button";
import Card from "../Card/Card";

export default function Main() {
  const [socketUrl] = useState("ws://localhost:8080/quotes");
  const [messageHistory, setMessageHistory] = useState<Stock[]>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>();

  const { lastJsonMessage } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
  });

  useEffect(() => {
    const message = lastJsonMessage as Record<string, any>;

    if (message) {
      const ticker = Object.keys(message).find((e) => e !== "timestamp");

      if (ticker) {
        const found = messageHistory.find((e) => e.ticker === ticker);

        if (found) {
          const lastPrice = found.prices[found.prices.length - 1];
          if (lastPrice.timestamp !== message.timestamp) {
            found.prices.push({
              timestamp: message.timestamp,
              value: message[ticker],
            });
            if (found.prices.length > 50) {
              found.prices.shift();
            }
          }
        } else {
          messageHistory.push({
            ticker,
            prices: [{ timestamp: message.timestamp, value: message[ticker] }],
          });
        }
      }
      const sorted = messageHistory.sort((a, b) => {
        if (sortDirection === "asc") {
          if (
            a.prices[a.prices.length - 1].value >
            b.prices[b.prices.length - 1].value
          ) {
            return 1;
          } else if (
            b.prices[b.prices.length - 1].value >
            a.prices[a.prices.length - 1].value
          ) {
            return -1;
          } else {
            return 0;
          }
        } else {
          if (
            b.prices[b.prices.length - 1].value >
            a.prices[a.prices.length - 1].value
          ) {
            return 1;
          } else if (
            a.prices[a.prices.length - 1].value >
            b.prices[b.prices.length - 1].value
          ) {
            return -1;
          } else {
            return 0;
          }
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
  }, [lastJsonMessage]);

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
