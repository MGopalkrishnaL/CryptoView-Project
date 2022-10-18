function searchdata() {
  const currentURL = window.location.href;
  const url_obj = new URL(currentURL);
  const params = new URLSearchParams(url_obj.search);
  if (!params.has("q")) {
    return;
  }
  document.getElementsByName("q")[0].value = params.get("q");
  fetch("https://api.coingecko.com/api/v3/search?query=" + params.get("q"))
    .then(convertTOjson)
    .then(render);
}
function render(data) {
  //   console.log(data.coins);
  for (let i = 0; i < data.coins.length; i++) {
    const singlecoin = data.coins[i];
    console.log(singlecoin);
    const index = i + 1;
    const logo = singlecoin.thumb;
    const name = singlecoin.name;
    const symbol = singlecoin.symbol;
    const coinid = singlecoin.id;
    creatsinglecard(index, logo, name, symbol, coinid);
  }
}
function creatsinglecard(index, logo, name, symbol, coinid) {
  const id_elem = document.createElement("p");
  if (index < 10) {
    index = index + "&nbsp;&nbsp;";
  }
  id_elem.innerHTML = index;

  const logo_ele = document.createElement("img");
  logo_ele.src = logo;
  logo_ele.alt = "Coin Logo";
  const name_ele = document.createElement("h3");
  name_ele.innerText = name;
  const symbol_ele = document.createElement("h3");
  symbol_ele.innerText = symbol;
  const anchor_ele = document.createElement("a");
  anchor_ele.innerText = "More Info";
  anchor_ele.href = "/Details.html?id=" + coinid;

  const container_ele = document.createElement("div");
  container_ele.classList.add("single-search-result", "card");
  container_ele.appendChild(id_elem);
  container_ele.appendChild(logo_ele);
  container_ele.appendChild(name_ele);
  container_ele.appendChild(symbol_ele);
  container_ele.appendChild(anchor_ele);
  document.getElementById("search-res").appendChild(container_ele);
}
window.onload = function () {
  searchdata();
};
