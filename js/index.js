// coingecko.api trending coins
//https://api.coingecko.com/api/v3/search/trending
//CurencyConversion
//https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr

function windowloaded() {
  // alert("window loaded");
  fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr"
  )
    .then(convertTOjson)
    .then(loaddata);
}
function loaddata(data) {
  const conversonrate = data.bitcoin.inr;
  fetch("https://api.coingecko.com/api/v3/search/trending")
    .then(convertTOjson)
    .then(function (data) {
      render(data, conversonrate);
    });
  // console.log(conversonrate);
}
function render(coinData, conversonrate) {
  // console.log(coinData);
  for (let i = 0; i < coinData.coins.length; i++) {
    const singleCoin = coinData.coins[i].item;
    // console.log(singleCoin);
    const logo = singleCoin.thumb;
    const name = `${singleCoin.name}(${singleCoin.symbol})`;
    const price =
      Math.round(singleCoin.price_btc * conversonrate * 10000) / 10000;
    InsertCryptoCard(logo, name, price);
  }
}
function InsertCryptoCard(thumb, name, price) {
  const price_para = document.createElement("p");
  price_para.innerText = `₹ ${price}`;
  const name_head = document.createElement("h1");
  name_head.innerText = name;
  const right_container = document.createElement("div");
  right_container.classList.add("f-left");
  right_container.appendChild(name_head);
  right_container.appendChild(price_para);
  const image_elem = document.createElement("img");
  image_elem.src = thumb;
  image_elem.classList.add("f-left", "card-image");
  image_elem.alt = "Coin Image";
  const card_container = document.createElement("div");
  card_container.classList.add("flex-item-small", "card");
  card_container.appendChild(image_elem);
  card_container.appendChild(right_container);
  document.getElementById("coins_container").appendChild(card_container);
}

window.onload = function () {
  windowloaded();
};
