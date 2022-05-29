export interface Stock {
  ticker: string,
  prices: {
    value: number,
    timestamp: number
  }[]
}