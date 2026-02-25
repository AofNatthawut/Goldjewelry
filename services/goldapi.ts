export const fetchGoldPrice = async () => {
  try {
    console.log("Fetching Thai gold prices...");

    // Fetch Thai Gold Prices (directly in THB)
    const goldRes = await fetch("https://api.chnwt.dev/thai-gold-api/latest");
    const goldJson = await goldRes.json();

    if (goldJson?.status === "success" && goldJson?.response?.price) {
      const priceData = goldJson.response.price;

      // Parse sell prices (format: "76,200.00")
      const barSell = parseFloat(priceData.gold_bar.sell.replace(/,/g, ''));
      const goldSell = parseFloat(priceData.gold.sell.replace(/,/g, ''));

      // We still need spotUsd and usdThb for compatibility, or fetching them separately
      // For now, we'll fetch exchange rate to provide complete data
      try {
        const fxRes = await fetch("https://open.er-api.com/v6/latest/USD");
        const fxJson = await fxRes.json();
        const usdThb = fxJson?.rates?.THB || 35; // Fallback to 35 if FX fails

        return {
          price: barSell,
          jewelryPrice: goldSell,
          spotUsd: Math.round((barSell / 0.965) / 0.4901 / usdThb), // Derived spot price
          usdThb: usdThb,
          updated: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        };
      } catch (fxErr) {
        console.warn("FX fetch failed, returning price only:", fxErr);
        return {
          price: barSell,
          jewelryPrice: goldSell,
          spotUsd: 0,
          usdThb: 0,
          updated: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        };
      }
    }
    return null;
  } catch (err) {
    console.error("API Error details:", err);
    return null;
  }
};
