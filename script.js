let input = document.querySelector(".input-box input");
let select1 = document.getElementById("from-select");

let select2 = document.getElementById("to-select");
let baseUrl = "https://v6.exchangerate-api.com/v6/69bd6f77ec5ba01b73fff144/latest/"
let getBtn = document.querySelector(".get-btn");
let result = document.querySelector(".result");
let mainResult = document.querySelector(".main-result");
let searchBtn = document.querySelector(".search-btn");
let fromImg = document.querySelector(".from-img");
let toImg = document.querySelector(".to-img");
let fromCurrency = document.getElementById("fromCurrency");
let toCurrency = document.getElementById("toCurrency");
let fromVal;
let toVal;

for (const element in countryList) {

    let option1 = document.createElement("option");
    let option2 = document.createElement("option");
    select1.appendChild(option1);
    select2.appendChild(option2);
    option1.value = element;
    option1.textContent = `${element} : ${countryList[element]}`;
    option2.value = element;
    option2.textContent = `${element} : ${countryList[element]}`;
}

select1.addEventListener("change", function () {
    fromVal = select1.value;
});

select2.addEventListener("change", function () {
    toVal = select2.value;
});


function getFromvalue() {
    return fromVal;
}

function getTovalue() {
    return toVal;
}



getBtn.addEventListener("click", async () => {
    getExchangeRate();
});

searchBtn.addEventListener("click", async()=>{
    getExchangeRate();
});

async function getCountrydetails(country_code) {
    // Use template literal for interpolation
    let url = `https://restcountries.com/v3.1/alpha/${country_code}`;
    try {
        let response = await fetch(url);
        if (!response.ok) {
            console.error("Sorry, can't fetch country details");
            return;
        }
        let data = await response.json();
        
        let countryName = data[0].name.common;
        let currencyCode = Object.keys(data[0].currencies)[0]; // Get the first currency code
        let currencyName = data[0].currencies[currencyCode].name; // Get the currency name
        console.log(currencyName);

        return [countryName, currencyName];
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}




async function getExchangeRate() {
    result.style.display ="none";
    mainResult.style.display = "none";
    result.innerText ="";
    mainResult.innerText="";

    let fromVal = getFromvalue();
    let fromCountry = countryList[fromVal];
    let toVal = getTovalue();
    let toCountry = countryList[toVal];

    if (!fromVal || !toVal) { // Check for empty, null, or undefined
        alert("Please select both options.");
        return;
    }

    fromImg.style.display = "flex";
    toImg.style.display = "flex";


    fromImg.src = `https://flagsapi.com/${fromCountry}/flat/64.png`;
    toImg.src = `https://flagsapi.com/${toCountry}/flat/64.png`;

    const [fromCountryName , fromcurrencyName] = await getCountrydetails(fromCountry);
    const [toCountryName , toCurrencyName] = await getCountrydetails(toCountry);
    fromImg.nextElementSibling.innerText = `${fromCountryName}`;
    fromCurrency.innerText = `${fromcurrencyName}`;

    toImg.nextElementSibling.innerText = `${toCountryName}`;
    toCurrency.innerText = `${toCurrencyName}`;

    

    
    
    let url = baseUrl.concat(fromVal);
    let response = await fetch(url);
    if (!response.ok) {
        console.log("SORRY");
    }
    let data = await response.json();
    console.log(data);

    let conversion_rate = data.conversion_rates[toVal];
    result.style.display="flex";
    result.innerText = `1 ${fromVal} = ${conversion_rate} ${toVal}`;

    if (input.value.trim() != "") {
        mainResult.style.display ="flex";
        let final_answer = conversion_rate * input.value;
        mainResult.innerHTML = `${input.value} ${fromVal} = ${final_answer} ${toVal}`;
    }


}



