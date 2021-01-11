window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const baseUrl = "https://api.coingecko.com/api/v3/";
    const PriceAndMarketCap = "https://api.coingecko.com/api/v3/https://api.coingecko.com/api/v3/";
    async function getCoinList(){
        let response = await fetch(`${baseUrl}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=60&page=1&sparkline=false`);
        let data = await response.json();
        return data;
    };
    getCoinList().then(data => {
        data.forEach((coin)=>{
            
            //selec t the table body
            let firstRow = document.querySelector('.table-body');
            // console.log(coin.image);
            //create table rows
            let firstRd = document.createElement('tr');
            firstRd.classList.add('table-rows');
            //create table data elements
            let nameTd = document.createElement('td');
            nameTd.classList.add('.name-td');
            let quantityTd = document.createElement('td');
            let purchasePriceTd = document.createElement('td');
            let PriceTd = document.createElement('td');
            let costTd = document.createElement('td');
            let marketValueTd = document.createElement('td');
            let returnTd = document.createElement('td');
            let percentageReturnTd = document.createElement('td');
            let selectBoxTd = document.createElement('td');

            //Handle the name field
            let coinImage = document.createElement('img');
            coinImage.style.width = "20px";
            coinImage.src = coin.image;
            let SpanTextTr = document.createElement('span');
            SpanTextTr.textContent = coin.name;

            //handle the quantity field
            let quantityInput = document.createElement('input')
            quantityInput.type = "text";
            quantityInput.className = "quantity-input";

            //handle purchase price field
            let purchasePriceInput = document.createElement('input');
            purchasePriceInput.type = "text";
            purchasePriceInput.className = "purchase-price-input";

            //handle current price
            PriceTd.textContent = coin.current_price;

            //handle checkbox td
            let checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.className = 'select-checkbox';



            //append data into the DOM
            //append the name field
            nameTd.appendChild(coinImage);
            nameTd.appendChild(SpanTextTr);
            firstRd.appendChild(nameTd);
            firstRow.appendChild(firstRd);
            //append the quantity field
            quantityTd.appendChild(quantityInput);
            firstRd.appendChild(quantityTd);
            firstRow.appendChild(firstRd);
            //append the purchase price field
            purchasePriceTd.appendChild(purchasePriceInput);
            firstRd.appendChild(purchasePriceTd);
            firstRow.appendChild(firstRd);
            //append current price
            firstRd.appendChild(PriceTd);
            firstRow.appendChild(firstRd);
            //append checkbox
            selectBoxTd.appendChild(checkBox);
            firstRd.appendChild(selectBoxTd);
            firstRow.appendChild(firstRd)
        })
    }).catch(err => console.log(err))
    
});