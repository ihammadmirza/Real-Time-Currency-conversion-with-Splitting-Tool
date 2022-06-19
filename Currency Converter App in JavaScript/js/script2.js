const dropList = document.querySelectorAll("form select"),
    fromCurrency = document.querySelector(".from select"),
    toCurrency = document.querySelector(".to select"),
    getButton = document.querySelector("form button");
var x = '';
// console.log("var x", x);

for (let i = 0; i < dropList.length; i++) {
    for (let currency_code in country_list) {
        // selecting USD by default as FROM currency and NPR as TO currency
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "NPR" ? "selected" : "";
        // creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target); // calling loadFlag with passing target element as an argument
    });
}

function loadFlag(element) {
    for (let code in country_list) {
        if (code == element.value) { // if currency code of country list is equal to option value
            let imgTag = element.parentElement.querySelector("img"); // selecting img tag of particular drop list
            // passing country code of a selected currency code in a img url
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

window.addEventListener("load", () => {
    getExchangeRate();
});

getButton.addEventListener("click", e => {
    e.preventDefault(); //preventing form from submitting
    getExchangeRate();
    console.log('Value stored in x is', x);
    // console.log('Value stored in y is', amountVall);
});
// var z = x / y;

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value; // temporary currency code of FROM drop list
    fromCurrency.value = toCurrency.value; // passing TO currency code to FROM currency code
    toCurrency.value = tempCode; // passing temporary currency code to TO currency code
    loadFlag(fromCurrency); // calling loadFlag with passing select element (fromCurrency) of FROM
    loadFlag(toCurrency); // calling loadFlag with passing select element (toCurrency) of TO
    getExchangeRate(); // calling getExchangeRate
})
// var myHeaders = new Headers();
// myHeaders.append("apikey", "jKvXukEzSAzDyQ2sfmiHI3bXzbyGyvWv");

// var requestOptions = {
//   method: 'GET',
//   redirect: 'follow',
//   headers: myHeaders
// };
//     fetch("https://api.currencylayer.com/live?access_key=jKvXukEzSAzDyQ2sfmiHI3bXzbyGyvWv&source=EUR&currencies=USD,GBP,AUD")
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

//   var myHeaders = new Headers();
// myHeaders.append("apikey", "jKvXukEzSAzDyQ2sfmiHI3bXzbyGyvWv");

// var requestOptions = {
//   method: 'GET',
//   redirect: 'follow',
//   headers: myHeaders
// };

// fetch("https://api.apilayer.com/fixer/convert?to={to}&from={from}&amount={amount}", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));


// fetch("https://api.apilayer.com/currency_data/change?start_date={start_date}&end_date={end_date}", requestOptions)


function getExchangeRate() {
    //    var apiKey = "jKvXukEzSAzDyQ2sfmiHI3bXzbyGyvWv"
    var apiKey = "BmGVXYmhHv0EULPAjpZ6qphdbpvdTUlI"
    const amount = document.querySelector("form .inputamount");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    console.log(amountVal);
    // if user don't enter any value or enter 0 then we'll put 1 value by default in the input field
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }

    const amountt = document.querySelector("form .person");
    // const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVall = amountt.value;
    console.log('hello', amountVall);
    // if user don't enter any value or enter 0 then we'll put 1 value by default in the input field
    if (amountVall == "" || amountVall == "0") {
        amountt.value = "1";
        amountVall = 1;
    }
    // var z = x / amountVall;
    // console.log('z is', z);

    exchangeRateTxt.innerText = "Getting result...";
    // let url = `https://v6.exchangerate-api.com/v6/jKvXukEzSAzDyQ2sfmiHI3bXzbyGyvWv/latest/${fromCurrency.value}`;
    // let url = `https://api.apilayer.com/fixer/convert?to=${toCurrency.value}&from=${fromCurrency.value}&amount=${amountVal}`;
    let url = `https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency.value}&from=${fromCurrency.value}&amount=${amountVal}`;

    // let url = `https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=PHP`
    // fetching api response and returning it with parsing into js obj and in another then method receiving that obj
    // fetch(url).then(response => response.json()).then(result => {
    //     let exchangeRate = result.conversion_rates[toCurrency.value]; // getting user selected TO currency rate
    //     let totalExRate = (amountVal * exchangeRate).toFixed(2); // multiplying user entered value with selected TO currency rate
    //     exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    // }).catch(() => { // if user is offline or any other error occured while fetching data then catch function will run
    //     exchangeRateTxt.innerText = "Something went wrong";
    // });


    var myHeaders = new Headers();
    //myHeaders.append("apikey", "jKvXukEzSAzDyQ2sfmiHI3bXzbyGyvWv");
    myHeaders.append("apikey", "BmGVXYmhHv0EULPAjpZ6qphdbpvdTUlI");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        // .then(result => console.log(result))
        .then(result => x = result?.result)
        .then(result => x / amountVall)
        // .then(result => exchangeRateTxt.innerText = result?.result)
        // .then(result => exchangeRateTxt.innerText = x)
        .then(result => exchangeRateTxt.innerText = result)
        // console.log('new z is', x/amountVall)

        // .catch(error => console.log('error', error));
        .catch(() => { // if user is offline or any other error occured while fetching data then catch function will run
            exchangeRateTxt.innerText = "Something went wrong";
        });

    // fetch(url).then(response => response.json()).then(result => {
    //     let exchangeRate = result.conversion_rates[toCurrency.value]; // getting user selected TO currency rate
    //     let totalExRate = (amountVal * exchangeRate).toFixed(2); // multiplying user entered value with selected TO currency rate
    //     exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    // }).catch(() => { // if user is offline or any other error occured while fetching data then catch function will run
    //     exchangeRateTxt.innerText = "Something went wrong";
    // });


    // var y = window.prompt('Give the value');
    // var z = x / y;
    // document.write('amount is ' + z);


}