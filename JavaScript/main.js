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
            nameTd.classList.add('name-td');
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
            SpanTextTr.classList.add('span-name')
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
            checkBox.classList.add('select-checkbox');

            //handle add field button
            let addButton = document.createElement('input');
            addButton.type = 'button';
            addButton.value = "Add Row";
            addButton.classList.add('btn','btn-primary','form-control');



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
        let searchField = document.getElementById('search');
        let selectAllTr = document.querySelectorAll('.table-rows');
        selectAllTr.forEach((tr)=>{
            let nameInputImage = tr.childNodes[0].childNodes[0];
            let nameInputSpan = tr.childNodes[0].childNodes[1];
            let quantityInputPlace = tr.childNodes[1].childNodes[0];
            let purchasePriceInputPlace = tr.childNodes[2].childNodes[0];
            let priceTdPlace = tr.childNodes[3];
            let costTdPlace = tr.childNodes[4];
            let marketValueTdPlace = tr.childNodes[5];
            let returnPlace = tr.childNodes[6];
            let percentageReturnPlace = tr.childNodes[7];
            let checkBoxStatus = tr.childNodes[8];
            let addBtn = tr.childNodes[9];
            quantityInputPlace.addEventListener('input', updateValue);
            purchasePriceInputPlace.addEventListener('input', updateValue);
            searchField.addEventListener('input',searchFilter)
            function searchFilter(e){
                let filter = e.target.value.toUpperCase();
                if(nameInputSpan.textContent.toLocaleUpperCase().indexOf(filter) > -1){
                    addBtn.parentNode.style.display = '';
                }else{
                    addBtn.parentNode.style.display = 'none'
                }
            }
            addBtn.addEventListener('click', function(e){
                
                let duplicateRow = e.target.parentNode.parentNode;
                let rowClassList = duplicateRow.classList.value;
                let nameSrc = duplicateRow.childNodes[0].childNodes[0].src;
                let nameCoin = duplicateRow.childNodes[0].childNodes[1].textContent;
                let nameTdClassList = duplicateRow.childNodes[0].classList.value;
                let quantityTdClassList = duplicateRow.childNodes[1].classList.value;
                let quantityInputClassList = duplicateRow.childNodes[1].childNodes[0].classList.value;
                let purchasePriceTdClassList = duplicateRow.childNodes[2].classList.value;
                let purchasePriceInputClassList = duplicateRow.childNodes[2].childNodes[0].classList.value;
                let priceTdClassList = duplicateRow.childNodes[3].classList.value;
                let priceText = duplicateRow.childNodes[3].textContent;
                let costTdClassList = duplicateRow.childNodes[4].classList.value;
                let costText = duplicateRow.childNodes[4].textContent;
                let marketValueTdClassList = duplicateRow.childNodes[5].classList.value;
                let marketValueText = duplicateRow.childNodes[5].textContent;
                let ReturnTdClassList = duplicateRow.childNodes[6].classList.value;
                let ReturnText = duplicateRow.childNodes[6].textContent;
                let percntageReturnTdClassList = duplicateRow.childNodes[7].classList.value;
                let percntageReturnText = duplicateRow.childNodes[7].textContent;
                let selectBoxClassList = duplicateRow.childNodes[8].childNodes[0].classList.value;
                let addButtonClassList = duplicateRow.childNodes[9].childNodes[0].classList.value;
                console.log(nameSrc)
                duplicateRow.insertAdjacentHTML('afterend', 
                `<tr class= '${rowClassList}'>
                    <td class='${nameTdClassList}'>
                        <img src= '${nameSrc}' style='width:20px'>
                        <span>${nameCoin}<span>
                    </td>
                    <td class='${quantityTdClassList}'>
                        <input class = '${quantityInputClassList}' type="number">
                    </td>
                    <td class='${purchasePriceTdClassList}'>
                        <input class='${purchasePriceInputClassList}' type="number">
                    </td>
                    <td class='${priceTdClassList}'>${priceText}</td>
                    <td class='${costTdClassList }'>${costText}</td>
                    <td class='${marketValueTdClassList }'>${marketValueText}</td>
                    <td class='${ReturnTdClassList}'>${ReturnText}</td>
                    <td class='${percntageReturnTdClassList}'>${percntageReturnText}</td>
                    <td>
                        <input class='${selectBoxClassList}'  type="checkbox">
                    </td>
                    <td>
                        <input class='${addButtonClassList}' type="text" value='Add Row'>
                    </td> 
                </tr>`
                );
                
                
                

                
            });

            function updateValue(e) {
                if(e.target.value !== null){
                   let costValue= quantityInputPlace.value * purchasePriceInputPlace.value;
                   let price = parseFloat(priceTdPlace.textContent)
                   let marketValue = price * quantityInputPlace.value;
                   let rateOfReturn = (price - purchasePriceInputPlace.value)/purchasePriceInputPlace.value;
                   let percentageRateOfReturn = ((price - purchasePriceInputPlace.value)/(purchasePriceInputPlace.value) * 100);
                   costTdPlace.textContent = costValue;
                   marketValueTdPlace.textContent = marketValue;
                   returnPlace.textContent = rateOfReturn;
                   percentageReturnPlace.textContent = percentageRateOfReturn;
                }
                }
        })
        
        
    }).then(()=>{
        let selectAllTr = document.querySelectorAll('.table-rows');
        selectAllTr.forEach((tr)=>{
            let nameInputImage = tr.childNodes[0].childNodes[0];
            let nameInputSpan = tr.childNodes[0].childNodes[1];
            let quantityInputPlace = tr.childNodes[1].childNodes[0];
            let purchasePriceInputPlace = tr.childNodes[2].childNodes[0];
            let priceTdPlace = tr.childNodes[3];
            let costTdPlace = tr.childNodes[4];
            let marketValueTdPlace = tr.childNodes[5];
            let returnPlace = tr.childNodes[6];
            let percentageReturnPlace = tr.childNodes[7];
            let checkBoxStatus = tr.childNodes[8];
            let addBtn = tr.childNodes[9];
            quantityInputPlace.addEventListener('input', updateValue);
            purchasePriceInputPlace.addEventListener('input', updateValue);
            function updateValue(e) {
                if(e.target.value !== null){
                   let costValue= quantityInputPlace.value * purchasePriceInputPlace.value;
                   let price = parseFloat(priceTdPlace.textContent)
                   let marketValue = price * quantityInputPlace.value;
                   let rateOfReturn = (price - purchasePriceInputPlace.value)/purchasePriceInputPlace.value;
                   let percentageRateOfReturn = ((price - purchasePriceInputPlace.value)/(purchasePriceInputPlace.value) * 100);
                   costTdPlace.textContent = costValue;
                   marketValueTdPlace.textContent = marketValue;
                   returnPlace.textContent = rateOfReturn;
                   percentageReturnPlace.textContent = percentageRateOfReturn;
                }
                }
    })

    }).catch(err => console.log(err));
});