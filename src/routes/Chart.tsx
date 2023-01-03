import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { validateHeaderValue } from "http";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      // refetchInterval: 10000,
    }
  );

  return (
    <div>
      <div>
        {isLoading ? (
          "Loading chart..."
        ) : (
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => Number(price.close)) as number[],
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                height: 500,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
                categories: data?.map((price) =>
                  new Date(price.time_close * 1000).toISOString()
                ),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
        )}
      </div>
      <div>
        {isLoading ? (
          "Loading chart..."
        ) : (
          <ApexChart
            type="candlestick"
            series={
              [
                {
                  data: data?.map((price) => {
                    return {
                      x: price.time_close,
                      y: [price.open, price.high, price.low, price.close],
                    };
                  }),
                },
              ] as any
            }
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                type: "candlestick",
                height: 350,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              stroke: {
                curve: "smooth",
                width: 2,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "#3C90EB",
                    downward: "#DF7D46",
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Chart;
