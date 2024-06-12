import React, { useEffect, useState } from "react";
import { Container, Text, VStack, Spinner } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { fetchCryptoPrices } from "../api/coincap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Index = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchCryptoPrices();
        setPrices(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    getData();
    const interval = setInterval(getData, 60000); // Fetch data every minute

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Container>
    );
  }

  const data = {
    labels: prices.map((price) => price.name),
    datasets: [
      {
        label: "Price in USD",
        data: prices.map((price) => parseFloat(price.priceUsd)),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Cryptocurrency Prices</Text>
        <Line data={data} />
      </VStack>
    </Container>
  );
};

export default Index;