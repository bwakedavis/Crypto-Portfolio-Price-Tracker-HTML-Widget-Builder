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
    let appendJs = document.querySelector('.js');
    appendJs.style.display = 'none';
    let coinId;
    appendJs.append(
      `
      <script>
        window.onload = function(e){ \
            e.preventDefault(); 

            let tablerows = document.querySelectorAll('.table-rows'); 
            tablerows.forEach((tr)=>{ 

                let coinId = tr.classList.value.slice(11); 
                async function getCoinList(){  
               
                
                let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" + ${coinId} + "&order=market_cap_desc&per_page=100&page=1&sparkline=false");
                let data = await response.json();
                return data;
                };

                getCoinList().then((data)=>{
                    data.forEach((coin)=>{
                        tr.childNodes[9].textContent = coin.current_price;
                        
                        let price = parseFloat(coin.current_price);
                        let quantityValue = parseFloat(tr.childNodes[5].textContent);
                        let purchasePrice = parseFloat(tr.childNodes[7].textContent);
                        let cost = tr.childNodes[11];
                        cost.textContent = quantityValue * purchasePrice;
                        let costValue = cost.textContent;
                        let marketValue = tr.childNodes[13];
                        marketValue.textContent = price * quantityValue;
                        mValue = marketValue.textContent;
                        let returns = tr.childNodes[15];
                        returns.textContent = (parseFloat(mValue) - parseFloat(costValue)).toFixed(2);
                        let percentageReturns = tr.childNodes[17];
                        percentageReturns.textContent = ((parseFloat(mValue) - costValue)/(costValue) * 100).toFixed(2);
                        
                    })
                    
                })
                
            })


  
    
        }
    < /script>
      `
    )
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
            //Date td
            let dateTd = document.createElement('td');
            dateTd.classList.add(idAsClass)
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

            //handle the date field
            let dateInput = document.createElement('input')
            dateInput.type = "text";
            dateInput.placeholder = 'eg.01/01/2021'
            dateInput.classList.add("quantity-input","form-control",idAsClass);

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
            //append the date field
            dateTd.appendChild(dateInput);
            firstRd.appendChild(dateTd);
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
        let pre = document.querySelector('.pre');
        let post = document.querySelector('.post');
        pre.style.display = 'none';
        post.style.display = 'none';
        pre.append(`
        <table class="table none" style="border: 1px solid black;border-collapse:colapse;width:100vw">
                    <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Quantity</th>
                      <th>Purchase Price (&#36;) </th>
                      <th>Price (&#36;) </th>
                      <th>Cost (&#36;) </th>
                      <th>Market Value (&#36;) </th>
                      <th>Return (&#36;) </th>
                      <th>Return (&#37;) </th>
                    </tr>
                  </thead>
                    <tbody class="table-body test-list">
        `)
        post.append(`
            </tbody>

      </table>
        `)
        selectAllTr.forEach((tr)=>{
 
            //Select each element
            tr.parentElement.parentElement.style.color = color.value;
            let nameInputImage = tr.childNodes[0].childNodes[0];
            let nameInputSpan = tr.childNodes[0].childNodes[1];
            let dateInputPlace = tr.childNodes[1].childNodes[0];
            let quantityInputPlace = tr.childNodes[2].childNodes[0];
            let purchasePriceInputPlace = tr.childNodes[3].childNodes[0];
            let priceTdPlace = tr.childNodes[4];
            let costTdPlace = tr.childNodes[5];
            let marketValueTdPlace = tr.childNodes[6];
            let returnPlace = tr.childNodes[7];
            let percentageReturnPlace = tr.childNodes[8];
            let checkBoxStatus = tr.childNodes[9];
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
        
            // let code = document.querySelectorAll('.select-checkbox')
            // code.forEach((c)=>{
            // c.addEventListener('change', function(e) {
            // let newRows = document.querySelectorAll('.table-rows');
            // newRows.forEach((box)=>{
                
            //         let newTbody;
                    
            //       });

            //     }) 
            // })

            let generate= document.querySelector('#generate');

            generate.addEventListener('click',(e)=>{
              e.preventDefault();
              appendJs.style.display = '';
              pre.style.display = '';
              post.style.display = '';
              let newTbody;
              if(tr.childNodes[9].childNodes[0].checked){
                newTbody = document.querySelector('.new-tbody');
                let nameSrc = tr.childNodes[0].childNodes[0].src;
                let nameCoin = tr.childNodes[0].childNodes[1].textContent;
                let dateValue = tr.childNodes[1].childNodes[0].value
                let quantityValue = tr.childNodes[2].childNodes[0].value
                let purchasePriceValue = tr.childNodes[3].childNodes[0].value
                let priceText = tr.childNodes[4].textContent;
                let costText = tr.childNodes[5].textContent;
                let marketValueText = tr.childNodes[6].textContent;
                let ReturnText = tr.childNodes[7].textContent;
                let percntageReturnText = tr.childNodes[8].textContent;
                let selectBoxClassList = tr.childNodes[9].childNodes[0].classList.value;

                let newTr = document.createElement('tr');
                let tdName = document.createElement('td');
                let imgTag = document.createElement('img');
                imgTag.src = nameSrc;
                imgTag.style.width = '20px';
                let spanTag = document.createElement('span');
                spanTag.textContent = nameCoin;
                let dateTdTag = document.createElement('td');
                let dateInputTag= document.createElement('input');
                dateInputTag.type = 'text';
                let qtTdTag = document.createElement('td');
                let qtInputTag= document.createElement('input');
                qtInputTag.type = 'number';
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
                newTr.appendChild(tdName);

                //quantity
                dateTdTag.textContent = dateValue;
                newTr.appendChild(dateTdTag);

                //quantity
                qtTdTag.textContent = quantityValue;
                newTr.appendChild(qtTdTag);
                //purchase price
                ppTdTag.textContent = purchasePriceValue;
                newTr.appendChild(ppTdTag);

                //price
                newTr.appendChild(priceTdTag);

                //cost
                newTr.appendChild(costTdTag);

                //marketvalue
                newTr.appendChild(marketValueTdTag);

                //return
                newTr.appendChild(returnTdTag);

                //preturn
                newTr.appendChild(percntageReurnTdTag);

            
                newTbody.appendChild(newTr);


                let codeHtml = document.querySelector('.code');
                let rowClassList = tr.classList.value;
                let nameTdClassList = tr.childNodes[0].classList.value;
                let dateTdClassList = tr.childNodes[1].classList.value;
                let dateInputClassList = tr.childNodes[1].childNodes[0].value;
                let quantityTdClassList = tr.childNodes[2].classList.value;
                let quantityInputClassList = tr.childNodes[2].childNodes[0].value;
                let purchasePriceTdClassList = tr.childNodes[3].classList.value;
                let purchasePriceInputClassList = tr.childNodes[3].childNodes[0].value;
                let priceTdClassList = tr.childNodes[4].classList.value;
                let costTdClassList = tr.childNodes[5].classList.value;
                let marketValueTdClassList = tr.childNodes[6].classList.value;
                let ReturnTdClassList = tr.childNodes[7].classList.value;
                let percntageReturnTdClassList = tr.childNodes[8].classList.value;

                async function insertElements(){
                await codeHtml.append( 
                `
                
                    

                      <tr class= '${rowClassList}' style="text-align:left">
                    <td style="text-align:left" class='${nameTdClassList}'>
                        <img src= '${nameSrc}' style='width:20px'>
                        <span>${nameCoin}<span>
                    </td>
                    <td style="text-align:left" class='${dateTdClassList}'>
                        ${dateInputClassList}
                    </td>
                    <td style="text-align:left" class='${quantityTdClassList}'>
                       ${quantityInputClassList}
                    </td>
                    <td style="text-align:left" class='${purchasePriceTdClassList}'>
                    ${purchasePriceInputClassList}
                    </td>
                    <td style="text-align:left" class='${priceTdClassList}'> ${priceText}</td>
                    <td style="text-align:left" class='${costTdClassList }'> ${costText}</td>
                    <td style="text-align:left" class='${marketValueTdClassList }'> ${marketValueText}</td>
                    <td style="text-align:left" class='${ReturnTdClassList}'> ${ReturnText}</td>
                    <td style="text-align:left" class='${percntageReturnTdClassList}'>${percntageReturnText} </td>

                </tr>

                   

                `
                );

            }

            insertElements()

                console.log(percntageReturnTdClassList);
              } else if(tr.checked == false){
                        
                        newTbody.appendChild('');
                    }


            })
            
            
            // checkBox.remove(checkBox.length - 2)
            
            //function to do input calculations
            function updateValue(e) {
                if(e.target.value !== null){
                   let costValue= quantityInputPlace.value * purchasePriceInputPlace.value;
                   let price = parseFloat(priceTdPlace.textContent)
                   let marketValue = price * quantityInputPlace.value;
                   let rateOfReturn = (marketValue - costValue).toFixed(2);
                   let percentageRateOfReturn = ((marketValue - costValue)/(costValue) * 100).toFixed(2);
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