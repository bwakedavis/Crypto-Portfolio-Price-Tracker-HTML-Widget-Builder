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