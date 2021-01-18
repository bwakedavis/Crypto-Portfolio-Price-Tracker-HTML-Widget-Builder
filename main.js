window.addEventListener('DOMContentLoaded', (event) => {
    //Check if the dom has parsed HTML
    console.log('DOM fully loaded and parsed');
    let pageNumber = 1;
    let rows = document.querySelector('#rows');
    let next = document.querySelector('#next');
    let previous = document.querySelector('#previous');
    function updateRow(e){
        rowNumber = parseInt(e.target.value)
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
        let selectAllTr = document.querySelectorAll('.table-rows');
        selectAllTr.forEach((tr)=>{
            //Select each element
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
            let checkBox = document.querySelectorAll('.select-checkbox');
            let code = document.querySelector('.html-code')
            checkBox.forEach((box)=>{
                box.addEventListener('change', function(e) {
                    if (box.checked) {
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
                    let newTbody = document.querySelector('.new-tbody');
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

                    
                    
                    } else if(!box.checked){
                        let newTbody = document.querySelector('.new-tbody');
                        newTbody.appendChild('');
                    }
                  });
                  
            })
            checkBox.remove(checkBox.length - 2)
            // //Create new rows
            // addBtn.addEventListener('click', function(e){
                
            //     let duplicateRow = e.target.parentNode.parentNode;
            //     let rowClassList = duplicateRow.classList.value;
            //     let nameSrc = duplicateRow.childNodes[0].childNodes[0].src;
            //     let nameCoin = duplicateRow.childNodes[0].childNodes[1].textContent;
            //     let nameTdClassList = duplicateRow.childNodes[0].classList.value;
            //     let quantityTdClassList = duplicateRow.childNodes[1].classList.value;
            //     let quantityInputClassList = duplicateRow.childNodes[1].childNodes[0].classList.value;
            //     let purchasePriceTdClassList = duplicateRow.childNodes[2].classList.value;
            //     let purchasePriceInputClassList = duplicateRow.childNodes[2].childNodes[0].classList.value;
            //     let priceTdClassList = duplicateRow.childNodes[3].classList.value;
            //     let priceText = duplicateRow.childNodes[3].textContent;
            //     let costTdClassList = duplicateRow.childNodes[4].classList.value;
            //     let costText = duplicateRow.childNodes[4].textContent;
            //     let marketValueTdClassList = duplicateRow.childNodes[5].classList.value;
            //     let marketValueText = duplicateRow.childNodes[5].textContent;
            //     let ReturnTdClassList = duplicateRow.childNodes[6].classList.value;
            //     let ReturnText = duplicateRow.childNodes[6].textContent;
            //     let percntageReturnTdClassList = duplicateRow.childNodes[7].classList.value;
            //     let percntageReturnText = duplicateRow.childNodes[7].textContent;
            //     let selectBoxClassList = duplicateRow.childNodes[8].childNodes[0].classList.value;
            //     let addButtonClassList = duplicateRow.childNodes[9].childNodes[0].classList.value;
            //     async function insertElements(){
            //     await duplicateRow.insertAdjacentHTML('afterend', 
            //     `<tr class= '${rowClassList}'>
            //         <td class='${nameTdClassList}'>
            //             <img src= '${nameSrc}' style='width:20px'>
            //             <span>${nameCoin}<span>
            //         </td>
            //         <td class='${quantityTdClassList}'>
            //             <input class = '${quantityInputClassList}' type="number" value='1'>
            //         </td>
            //         <td class='${purchasePriceTdClassList}'>
            //             <input class='${purchasePriceInputClassList}' type="number">
            //         </td>
            //         <td class='${priceTdClassList}'>${priceText}</td>
            //         <td class='${costTdClassList }'>${costText}</td>
            //         <td class='${marketValueTdClassList }'>${marketValueText}</td>
            //         <td class='${ReturnTdClassList}'>${ReturnText}</td>
            //         <td class='${percntageReturnTdClassList}'>${percntageReturnText}</td>
            //         <td>
            //             <input class='${selectBoxClassList}'  type="checkbox">
            //         </td>
            //         <td>
            //             <input class='${addButtonClassList}' type="button" value='Add Row'>
            //         </td> 
            //     </tr>`
            //     );
            // }
            //   insertElements().then(()=>{
            //     setTimeout(function(){ 
            //         let allTrs = document.querySelectorAll('.table-rows')
            //         allTrs.forEach((tr)=>{
            //             // console.log(tr.childNodes[0].nextSibling.textContent)
            //             console.log(tr.childNodes[2].nextSibling)
            //         })
            //      }, 500);
                  
            //   }) 
                    
            // });
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