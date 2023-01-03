import { useQuery } from "react-query";
import { fetchCoinTickers } from "./api";
import { useParams } from "react-router-dom";
import styled from "styled-components";
interface RouteParams {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Container = styled.div`
  display: block;
`;
const PriceDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin-bottom: 3%;
  width: 100%;
  height: 50px;
  h3 {
    width: 50%;
  }
  div {
    width: 48%;
    color: white;
    h3 {
      color: #4cd137;
    }
  }
`;

function Price() {
  const { coinId } = useParams<RouteParams>();
  const { isLoading, data } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <Container>
          <PriceDiv>
            <h3>현재 가격</h3>
            <div>
              <h3>`${data?.quotes.USD.price?.toFixed(3)}`</h3>
            </div>
          </PriceDiv>
          <PriceDiv>
            <h3>15분전 대비</h3>
            <div>
              <h3>{data?.quotes.USD.percent_change_15m}%</h3>
            </div>
          </PriceDiv>
          <PriceDiv>
            <h3>30분전 대비</h3>
            <div>
              <h3>{data?.quotes.USD.percent_change_30m}%</h3>
            </div>
          </PriceDiv>
          <PriceDiv>
            <h3>1시간전 대비</h3>
            <div>
              <h3>{data?.quotes.USD.percent_change_1h}%</h3>
            </div>
          </PriceDiv>
        </Container>
      )}
    </div>
  );
}

export default Price;
