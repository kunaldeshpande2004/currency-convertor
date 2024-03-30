const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns with currency codes
for (let select of dropdowns) {
    for (let currcode in countryList) {
        let opt = document.createElement("option");
        opt.innerText = currcode;
        opt.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            opt.selected = "selected";
        } else if (select.name === "to" && currcode === "INR") {
            opt.selected = "selected";
        }
        select.append(opt);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Update flag images based on selected currency code
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = src;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("input").value;
    if (amount === "" || amount < 1) {
        amount = 1;
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amount * rate;
    msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});

// Initial flag update based on default selected currencies
updateFlag(fromCurr);
updateFlag(toCurr);
