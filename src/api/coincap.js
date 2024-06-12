export const fetchCryptoPrices = async () => {
  const response = await fetch("https://api.coincap.io/v2/assets");
  if (!response.ok) {
    throw new Error("Failed to fetch crypto prices");
  }
  const data = await response.json();
  return data.data;
};