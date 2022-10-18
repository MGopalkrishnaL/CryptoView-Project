// https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false

function loaddetail() {
  const url_string = window.location.href;
  const url_obj = new URL(url_string);
  const params = new URLSearchParams(url_obj.search);

  if (!params.has("id")) {
    window.location.href = "/";
  }

  fetch(
    `https://api.coingecko.com/api/v3/coins/${params.get(
      "id"
    )}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  )
    .then(convertTOjson)
    .then(render);
  fetch(
    `https://api.coingecko.com/api/v3/coins/${params.get(
      "id"
    )}/market_chart?vs_currency=inr&days=1&interval=hourly`
  )
    .then(convertTOjson)
    .then(renderchart);
}
function render(data) {
  // console.log(data);
  const name = `${data.name} (${data.symbol.toUpperCase()})`;
  const description = data.description.en;
  const logo = data.image.large;

  const inr = data.market_data.current_price.inr;
  const usd = data.market_data.current_price.usd;
  const eur = data.market_data.current_price.eur;
  const gbp = data.market_data.current_price.gbp;

  document.getElementById("Coin_name").innerText = name;
  document.getElementById("coin_des").innerHTML = description;
  document.getElementById("coin_logo").src = logo;
  document.getElementById("inr-price").innerText = inr;
  document.getElementById("usd-price").innerText = usd;
  document.getElementById("eur-price").innerText = eur;
  document.getElementById("gbp-price").innerText = gbp;
}

window.onload = function () {
  loaddetail();
};

function renderchart(data) {
  // console.log(data);
  const prices = data.prices;

  const timestamps = [];
  const price_inr = [];
  for (let i = 0; i < prices.length; i++) {
    const singleprice = prices[i];

    const data_obj = new Date(singleprice[0]);
    let hours = data_obj.getHours();
    if (hours < 10) {
      hours = "0" + hours;
    }
    let minu = data_obj.getMinutes();
    if (minu < 10) {
      minu = "0" + minu;
    }
    timestamps.push(`${hours}:${minu}`);
    price_inr.push(singleprice[1]);
  }
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: timestamps,
      datasets: [
        {
          label: "price (in INR)",
          data: price_inr,
          borderColor: "rgb(75,192,192)",
          tension: 0.4,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}
