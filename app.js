const mockStocks = [
  { ticker: "ABCD", name: "Alpha Bio Corp", price: 1.12, volume: 520000, momentum: 4.8 },
  { ticker: "NVRX", name: "NovaRx Labs", price: 2.95, volume: 275000, momentum: 2.4 },
  { ticker: "GREN", name: "GreenVolt Energy", price: 0.88, volume: 760000, momentum: 5.5 },
  { ticker: "CLOU", name: "CloudPeak Tech", price: 4.15, volume: 140000, momentum: -0.8 },
  { ticker: "MINE", name: "Minera Metals", price: 3.4, volume: 485000, momentum: 1.7 },
  { ticker: "VITA", name: "VitaWell Health", price: 1.76, volume: 320000, momentum: 3.3 },
  { ticker: "SEAS", name: "SeaStone Marine", price: 0.64, volume: 910000, momentum: 6.1 },
  { ticker: "URBX", name: "UrbanX Mobility", price: 2.21, volume: 190000, momentum: 0.4 }
];

const tableBody = document.getElementById("stockTableBody");
const watchlistItems = document.getElementById("watchlistItems");
const maxPriceInput = document.getElementById("maxPrice");
const minVolumeInput = document.getElementById("minVolume");

const watchlist = new Set();

function calculateScore(stock) {
  const priceScore = Math.max(0, 6 - stock.price) * 15;
  const volumeScore = Math.min(stock.volume / 10000, 80);
  const momentumScore = (stock.momentum + 10) * 5;
  return Math.round(priceScore + volumeScore + momentumScore);
}

function filteredRankedStocks() {
  const maxPrice = Number(maxPriceInput.value) || 0;
  const minVolume = Number(minVolumeInput.value) || 0;

  return mockStocks
    .filter((stock) => stock.price <= maxPrice && stock.volume >= minVolume)
    .map((stock) => ({ ...stock, score: calculateScore(stock) }))
    .sort((a, b) => b.score - a.score);
}

function formatVolume(volume) {
  return volume.toLocaleString("en-US");
}

function renderTable() {
  const rows = filteredRankedStocks();

  if (!rows.length) {
    tableBody.innerHTML = `<tr><td colspan="8">No stocks match your filters.</td></tr>`;
    return;
  }

  tableBody.innerHTML = rows
    .map(
      (stock, index) => `
      <tr>
        <td>${index + 1}</td>
        <td><strong>${stock.ticker}</strong></td>
        <td>${stock.name}</td>
        <td>$${stock.price.toFixed(2)}</td>
        <td>${formatVolume(stock.volume)}</td>
        <td>${stock.momentum.toFixed(1)}%</td>
        <td>${stock.score}</td>
        <td>
          <button data-ticker="${stock.ticker}">
            ${watchlist.has(stock.ticker) ? "Saved" : "Save"}
          </button>
        </td>
      </tr>
    `
    )
    .join("");
}

function renderWatchlist() {
  if (!watchlist.size) {
    watchlistItems.innerHTML = "<li>No favorites saved yet.</li>";
    return;
  }

  const entries = [...watchlist]
    .map((ticker) => {
      const stock = mockStocks.find((item) => item.ticker === ticker);
      return `<li>${ticker} - ${stock?.name ?? "Unknown"}</li>`;
    })
    .join("");

  watchlistItems.innerHTML = entries;
}

maxPriceInput.addEventListener("input", renderTable);
minVolumeInput.addEventListener("input", renderTable);

tableBody.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  const ticker = target.dataset.ticker;
  if (!ticker) {
    return;
  }

  watchlist.add(ticker);
  renderTable();
  renderWatchlist();
});

renderTable();
renderWatchlist();
