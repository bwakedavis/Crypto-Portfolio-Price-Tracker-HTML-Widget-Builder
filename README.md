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

let selectAllTrNew = document.querySelectorAll('.table-rows');
                selectAllTrNew.forEach((tr)=>{
                    let quantityInputPlaceNew = tr.childNodes[1].childNodes[0];
                    let purchasePriceInputPlaceNew = tr.childNodes[2].childNodes[0];
                    let priceTdPlaceNew = tr.childNodes[3];
                    let costTdPlaceNew = tr.childNodes[4];
                    let marketValueTdPlaceNew = tr.childNodes[5];
                    let returnPlaceNew = tr.childNodes[6];
                    let percentageReturnPlaceNew = tr.childNodes[7];
                    quantityInputPlaceNew.addEventListener('input', updateValue);
                    purchasePriceInputPlaceNew.addEventListener('input', updateValue);

                    function updateValue(e) {
                        if(e.target.value !== null){
                           let costValue= quantityInputPlaceNew.value * purchasePriceInputPlaceNew.value;
                           let price = parseFloat(priceTdPlaceNew.textContent)
                           let marketValue = price * quantityInputPlaceNew.value;
                           let rateOfReturn = (price - purchasePriceInputPlaceNew.value)/purchasePriceInputPlaceNew.value;
                           let percentageRateOfReturn = ((price - purchasePriceInputPlaceNew.value)/(purchasePriceInputPlaceNew.value) * 100);
                           costTdPlaceNew.textContent = costValue;
                           marketValueTdPlaceNew.textContent = marketValue;
                           returnPlaceNew.textContent = rateOfReturn;
                           percentageReturnPlaceNew.textContent = percentageRateOfReturn;
                        }
                        }

                         https://s3-eu-west-1.amazonaws.com/greg.ie/colorart.zip 





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