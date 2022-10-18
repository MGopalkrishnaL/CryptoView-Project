function convertTOjson(response) {
  return response.json();
}
document
  .getElementById("nav-search-button")
  .addEventListener("click", function () {
    window.location.href = "/Search.html";
  });

document.getElementById("main-title").addEventListener("click", function () {
  window.location.href = "/Index.html";
});
