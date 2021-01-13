window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const baseUrl = "https://api.coingecko.com/api/v3/";
    const PriceAndMarketCap = "https://api.coingecko.com/api/v3/https://api.coingecko.com/api/v3/";
    async function getCoinList(){
        let response = await fetch(`${baseUrl}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
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
            let idAsClass = coin.id;
            firstRd.classList.add(idAsClass)
            //create table data elements
            let nameTd = document.createElement('td');
            nameTd.classList.add('.name-td');
            nameTd.classList.add(idAsClass);
            let quantityTd = document.createElement('td');
            quantityTd.classList.add(idAsClass)
            let purchasePriceTd = document.createElement('td');
            purchasePriceTd.classList.add("purchase-price",idAsClass)
            let PriceTd = document.createElement('td');
            PriceTd.classList.add("price",idAsClass);
            let costTd = document.createElement('td');
            costTd.classList.add("cost",idAsClass);
            let marketValueTd = document.createElement('td');
            marketValueTd.classList.add("market-value",idAsClass)
            let returnTd = document.createElement('td');
            returnTd.classList.add("return",idAsClass);
            let percentageReturnTd = document.createElement('td');
            percentageReturnTd.classList.add("percentage-return",idAsClass);
            let selectBoxTd = document.createElement('td');
            selectBoxTd.classList.add(idAsClass)
            let addFieldBtn = document.createElement('td');
            selectBoxTd.classList.add(idAsClass)

            //Handle the name field
            let coinImage = document.createElement('img');
            coinImage.style.width = "20px";
            coinImage.src = coin.image;
            let SpanTextTr = document.createElement('span');
            SpanTextTr.textContent = coin.name;

            //handle the quantity field
            let quantityInput = document.createElement('input')
            quantityInput.type = "number";
            quantityInput.classList.add("quantity-input","form-control",idAsClass);

            //handle purchase price field
            let purchasePriceInput = document.createElement('input');
            purchasePriceInput.type = "number";
            purchasePriceInput.classList.add("purchase-price-input","form-control",idAsClass);

            //handle current price
            PriceTd.textContent = coin.current_price;

            //handle checkbox td
            let checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.className = 'select-checkbox';

            //handle add field button
            let addButton = document.createElement('input');
            addButton.type = 'button';
            addButton.value = "Add Row";
            addButton.classList.add('btn','btn-primary');



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

            //append current cost
            firstRd.appendChild(costTd);
            firstRow.appendChild(firstRd);

            //append current market value
            firstRd.appendChild(marketValueTd);
            firstRow.appendChild(firstRd);

            //append current return
            firstRd.appendChild(returnTd);
            firstRow.appendChild(firstRd);

            //append current percentage return
            firstRd.appendChild(percentageReturnTd);
            firstRow.appendChild(firstRd);


            //append checkbox
            selectBoxTd.appendChild(checkBox);
            firstRd.appendChild(selectBoxTd);
            firstRow.appendChild(firstRd)

            //append add button
            addFieldBtn.appendChild(addButton);
            firstRd.appendChild(addFieldBtn);
            firstRow.appendChild(firstRd);
        })
    }).then(e =>{
        //Handle input events
        let priceTdPlace = document.querySelector('td.price.bitcoin');
        let quantityInputPlace = document.querySelector('input.bitcoin');
        let purchasePriceInputPlace = document.querySelector('input.bitcoin.purchase-price-input');
        let costTdPlace = document.querySelector('td.cost.bitcoin');
        let marketValueTdPlace = document.querySelector('td.market-value.bitcoin');
        let returnPlace = document.querySelector('td.return.bitcoin');
        let percentageReturnPlace = document.querySelector('td.percentage-return.bitcoin');
        let quantityTdPrice = quantityInputPlace.parentNode;
        let purchasePriceTdtPlace = purchasePriceInputPlace.parentNode;

        quantityInputPlace.addEventListener('input', updateValue);
        purchasePriceInputPlace.addEventListener('input', updateValue);

        function updateValue(e) {
        if(e.target.value !== null){
           let costValue= quantityInputPlace.value * purchasePriceInputPlace.value;
           let price = parseFloat(priceTdPlace.textContent)
           let marketValue = price * quantityInputPlace.value;
           let rateOfReturn = (price - purchasePriceInputPlace.value)/purchasePriceInputPlace.value;
           let percentageRateOfReturn = ((price - purchasePriceInputPlace.value)/(purchasePriceInputPlace.value) * 100);
           console.log(price)
           costTdPlace.textContent = costValue;
           marketValueTdPlace.textContent = marketValue;
           returnPlace.textContent = rateOfReturn;
           percentageReturnPlace.textContent = percentageRateOfReturn;
        }
        }
        
    }).catch(err => console.log(err));

    

   
});