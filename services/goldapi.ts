export const fetchGoldPrice = async () => {
  try {
    console.log("Fetching gold price from metals.live...");
    const res = await fetch("https://api.metals.live/v1/spot/gold");
    const json = await res.json();
    console.log("API Response:", json);

    if (json && Array.isArray(json) && json.length > 0) {
      // The API returns price in USD/oz usually, let's just use the value as a number
      // In a real app, you'd convert this to THB/Baht weight
      return {
        price: json[0].price,
        updated: new Date().toLocaleTimeString('th-TH'),
      };
    }
    return null;
  } catch (err) {
    console.log("API Error details:", err);
    return null;
  }
};
