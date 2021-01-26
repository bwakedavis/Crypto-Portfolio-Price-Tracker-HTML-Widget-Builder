# Crypto Portfolio Price Tracker HTML Widget builder

Deliverable = HTML Widget builder to embed code in a bitrix24 website.

See example attached.

Functions:
- Add new rows including same Coin bought at a different date/time/price. Example BTC bought on 1/1/2020 then another row for BTC bought on 1/1/2021.
- Sort by Column
- Quantity and Price are input fields
- Change Colour/Style of table - MS Excel style.
- Currency Selection
- Search
- Pagination
- Number of Rows

Non functional:

- Realtime updates from https://www.coingecko.com/en/api
- Widget code does not require any other dependencies other than the API. Stand alone.

See Builder Example attached and samples. Would like 2 quotes, one to do all Types and Templates in the Builder and one for just the Portfolio Type.

Looking for a quick and simple widget builder.
window.addEventListener('DOMContentLoaded', (event) => {
    //Check if the dom has parsed HTML
    console.log('DOM fully loaded and parsed');
    let pageNumber = 1;
    let tb = document.querySelector('.table')
    let displayData = document.querySelectorAll('.none');
    let rows = document.querySelector('#rows');
    let next = document.querySelector('#next');
    let previous = document.querySelector('#previous');
    let color = document.querySelector('#color');
    let border = document.querySelector('#border');
    let markup = ` <table class="table none">
    <thead>
     <tr>
       <th>Name</th>
       <th>Quantity</th>
       <th>Purchase Price</th>
       <th>Price</th>
       <th>Cost</th>
       <th>Market Value</th>
       <th>Return</th>
       <th>% Return</th>
       <th>Select Coin</th>
     </tr>
   </thead>
     <tbody class="table-body test-list">
    //COPY THE CODE GENERATED HERE
     </tbody>

   </table>
   `;
   let newMarkup = document.querySelector('.markup');
   newMarkup.append(markup)
    function updateRow(e){
        rowNumber = parseInt(e.target.value);
    }
    function changeColor(e){
        tb.style.color = e.target.value;
    }
    function changeBorder(e){
        tb.style.color = e.target.value;
    }
    next.addEventListener('click',function(e){
        e.preventDefault()
        let trow = document.querySelectorAll('.table-rows');
        trow.forEach((tr)=>{
            tr.remove()
        })
        pageNumber = pageNumber + 1;
        updateAll()
    });
    previous.addEventListener('click',function(e){
        e.preventDefault();
        let trow = document.querySelectorAll('.table-rows');
        trow.forEach((tr)=>{
            tr.remove()
        })
        pageNumber = pageNumber - 1;
        updateAll()
    })
    let rowNumber = 0;
    color.addEventListener('input',changeColor);
    border.addEventListener('input',changeBorder)
    rows.addEventListener('input',updateRow)
    let preButton = document.querySelector('#pre-btn');
    preButton.addEventListener('click',updateAll);

    function updateAll(e){
        
    // Making the API call
    const baseUrl = "https://api.coingecko.com/api/v3/";
    const PriceAndMarketCap = "https://api.coingecko.com/api/v3/https://api.coingecko.com/api/v3/";
    async function getCoinList(){
         //Select custom properties to generate the table
        
        let response = await fetch(`${baseUrl}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${rowNumber}&page=${pageNumber}&sparkline=false`);
        let data = await response.json();
        return data;
    };



    
    //Getting the JSON DATA and displaying it in the DOM
    getCoinList().then(data => {
        data.forEach((coin)=>{
            displayData.forEach((d)=>{
                d.style.display = ''
            })
            //selec the table body
            let firstRow = document.querySelector('.table-body');
            //create table rows
            let firstRd = document.createElement('tr');
            firstRd.classList.add('table-rows');
            let idAsClass = coin.id;
            firstRd.classList.add(idAsClass)
            //create table data elements
            //Name td
            let nameTd = document.createElement('td');
            nameTd.classList.add('name-td');
            nameTd.classList.add(idAsClass);
            //Quantity td
            let quantityTd = document.createElement('td');
            quantityTd.classList.add(idAsClass)
            //Purchase td
            let purchasePriceTd = document.createElement('td');
            purchasePriceTd.classList.add("purchase-price",idAsClass)
            //price td
            let PriceTd = document.createElement('td');
            PriceTd.classList.add("price",idAsClass);
            //cost td
            let costTd = document.createElement('td');
            costTd.classList.add("cost",idAsClass);
            //market value td
            let marketValueTd = document.createElement('td');
            marketValueTd.classList.add("market-value",idAsClass)
            //return td
            let returnTd = document.createElement('td');
            returnTd.classList.add("return",idAsClass);
            //percentage return td
            let percentageReturnTd = document.createElement('td');
            percentageReturnTd.classList.add("percentage-return",idAsClass);
            let selectBoxTd = document.createElement('td');
            //selectbox td
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
            // let addButton = document.createElement('input');
            // addButton.type = 'button';
            // addButton.value = "Add Row";
            // addButton.classList.add('btn','btn-primary','form-control');



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

            // //append add button
            // addFieldBtn.appendChild(addButton);
            // firstRd.appendChild(addFieldBtn);
            // firstRow.appendChild(firstRd);
        })
    }).then(e =>{
        //Handle input events
        let searchField = document.getElementById('search');
        let selectAllTr = document.querySelectorAll('.table-rows')
        

        selectAllTr.forEach((tr)=>{
 
            //Select each element
            tr.parentElement.parentElement.style.color = color.value;
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
            // let addBtn = tr.childNodes[9];
            // Listen to input events and calculations
            quantityInputPlace.addEventListener('input', updateValue);
            purchasePriceInputPlace.addEventListener('input', updateValue);
            searchField.addEventListener('input',searchFilter)
            //Search functionality
            function searchFilter(e){
                let filter = e.target.value.toUpperCase();
                if(nameInputSpan.textContent.toLocaleUpperCase().indexOf(filter) > -1){
                    priceTdPlace.parentNode.style.display = '';
                }else{
                    priceTdPlace.parentNode.style.display = 'none'
                }
            }
        
            let code = document.querySelector('.btn-g')
            code.addEventListener('click', function(e) {
            let checkBox = document.querySelectorAll('.select-checkbox');
            checkBox.forEach((box)=>{
                
                    let newTbody;
                    if (box.checked == true) {
                    let duplicateRow = box.parentNode.parentNode;
                    let nameSrc = duplicateRow.childNodes[0].childNodes[0].src;
                    let nameCoin = duplicateRow.childNodes[0].childNodes[1].textContent;
                    let quantityValue = duplicateRow.childNodes[1].childNodes[0].value
                    let purchasePriceValue = duplicateRow.childNodes[2].childNodes[0].value
                    let priceText = duplicateRow.childNodes[3].textContent;
                    let costText = duplicateRow.childNodes[4].textContent;
                    let marketValueText = duplicateRow.childNodes[5].textContent;
                    let ReturnText = duplicateRow.childNodes[6].textContent;
                    let percntageReturnText = duplicateRow.childNodes[7].textContent;
                    let selectBoxClassList = duplicateRow.childNodes[8].childNodes[0].classList.value;
                    // let addButtonClassList = duplicateRow.childNodes[9].childNodes[0].classList.value;
                    newTbody = document.querySelector('.new-tbody');
                    let tr = document.createElement('tr');
                    let tdName = document.createElement('td');
                    let imgTag = document.createElement('img');
                    imgTag.src = nameSrc;
                    imgTag.style.width = '20px';
                    let spanTag = document.createElement('span');
                    spanTag.textContent = nameCoin;
                    let qtTdTag = document.createElement('td');
                    let qtInputTag= document.createElement('input');
                    qtInputTag.type = 'number';
                    qtInputTag.addEventListener('input',function(e){
                        console.log(e.target.value);
                    })
                    let ppTdTag = document.createElement('td');
                    let ppInputTag= document.createElement('input');
                    ppInputTag.type = 'number';
                    let priceTdTag = document.createElement('td');
                    priceTdTag.textContent = priceText;
                    let costTdTag = document.createElement('td');
                    costTdTag.textContent = costText;
                    let marketValueTdTag = document.createElement('td');
                    marketValueTdTag.textContent = marketValueText;
                    let returnTdTag = document.createElement('td');
                    returnTdTag.textContent = ReturnText;
                    let percntageReurnTdTag = document.createElement('td');
                    percntageReurnTdTag.textContent = percntageReturnText;
                    
                    //name
                    tdName.appendChild(imgTag);
                    tdName.appendChild(spanTag);
                    tr.appendChild(tdName);

                    //quantity
                    qtTdTag.textContent = quantityValue;
                    tr.appendChild(qtTdTag);

                    //purchase price
                    ppTdTag.textContent = purchasePriceValue;
                    tr.appendChild(ppTdTag);

                    //price
                    tr.appendChild(priceTdTag);

                    //cost
                    tr.appendChild(costTdTag);

                    //marketvalue
                    tr.appendChild(marketValueTdTag);

                    //return
                    tr.appendChild(returnTdTag);

                    //preturn
                    tr.appendChild(percntageReurnTdTag);

                    

                    newTbody.appendChild(tr);

                    

                let codeHtml = document.querySelector('.code');
                let rowClassList = duplicateRow.classList.value;
                let nameTdClassList = duplicateRow.childNodes[0].classList.value;
                let quantityTdClassList = duplicateRow.childNodes[1].classList.value;
                let quantityInputClassList = duplicateRow.childNodes[1].childNodes[0].classList.value;
                let purchasePriceTdClassList = duplicateRow.childNodes[2].classList.value;
                let purchasePriceInputClassList = duplicateRow.childNodes[2].childNodes[0].classList.value;
                let priceTdClassList = duplicateRow.childNodes[3].classList.value;
                let costTdClassList = duplicateRow.childNodes[4].classList.value;
                let marketValueTdClassList = duplicateRow.childNodes[5].classList.value;
                let ReturnTdClassList = duplicateRow.childNodes[6].classList.value;
                let percntageReturnTdClassList = duplicateRow.childNodes[7].classList.value;
                
                async function insertElements(){
                await codeHtml.append( 
                `<tr class= '${rowClassList}'>
                    <td class='${nameTdClassList}'>
                        <img src= '${nameSrc}' style='width:20px'>
                        <span>${nameCoin}<span>
                    </td>
                    <td class='${quantityTdClassList}'>
                        <input class = '${quantityInputClassList}' type="number" value='1'>
                    </td>
                    <td class='${purchasePriceTdClassList}'>
                        <input class='${purchasePriceInputClassList}' type="number">
                    </td>
                    <td class='${priceTdClassList}'>${priceText}</td>
                    <td class='${costTdClassList }'>${costText}</td>
                    <td class='${marketValueTdClassList }'>${marketValueText}</td>
                    <td class='${ReturnTdClassList}'>${ReturnText}</td>
                    <td class='${percntageReturnTdClassList}'>${percntageReturnText}</td>

                </tr> `
                );
                let br = document.createElement('hr')
                codeHtml.appendChild(br)
            }

            insertElements()


                    
                    } else if(box.checked == false){
                        // let newTbody = document.querySelector('.new-tbody');
                        // newTbody.appendChild('');
                    }
                  });

                }) 
                  
            
            // checkBox.remove(checkBox.length - 2)
            
            //function to do input calculations
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
    }
});