/*
Just draw a border round the document.body.
*/
function addMonthlyPrices() {
  const root = document.documentElement;
  const houses = root.querySelectorAll("article.ads__unit");

  const capital = 800_000;
  const years = 25;
  const rente = 2.0;
  const terminCost = 50;

  houses.forEach(x => {

    let mothlyExpences = 0;
    let content = x.querySelector("div.ads__unit__content");
    let price = parseInt(content.children[content.children.length - 2].innerText.split("\n")[1].replace("kr", "").replace(/\s/g, ''))
    let loan = price - capital;

    let i = rente / 100.0 / 12;
    let n = years * 12;
    let denominator = 1 - Math.pow(1 + i, -n);
    let monthlyLoanCost = ((i / denominator) * loan) + terminCost;
    if (x.textContent.includes("Fellesutg")) {
      mothlyExpences = parseInt((x.textContent.split("Fellesutg.:")[1].split("kr")[0]).replace(/\s/g, ''))
    }
    let monthlyTotalCostDiv = document.createElement("div");
    let monthlyTotalCost = Math.round(monthlyLoanCost + mothlyExpences, 0).toString();
    let monthlyTotalCostText = document.createTextNode(monthlyTotalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " kr");
    monthlyTotalCostDiv.appendChild(monthlyTotalCostText)
    content.children[content.children.length - 2].appendChild(monthlyTotalCostDiv)
  });
}

setTimeout(addMonthlyPrices, 1500);
