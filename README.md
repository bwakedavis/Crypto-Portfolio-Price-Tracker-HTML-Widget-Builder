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


                    
                    
                   
                    
                    
                    
                    

                    

                
                <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test</title>
</head>
<body>
    
    <table class="table none" style="border: 1px solid black;border-collapse:colapse;width:100vw"> <thead> 
        <tr> <th>Name</th> <th>Date</th> <th>Quantity</th> <th>Purchase Price</th> <th>Price</th> <th>Cost</th> <th>Market Value</th> <th>Return</th> <th>% Return</th> </tr> 
    </thead> 
    <tbody class="table-body test-list"> 
        <tr class= 'table-rows bitcoin'> 
                <td style="text-align:center" class='name-td bitcoin'> <img src= 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579' style='width:20px'> <span>Bitcoin<span> </td> 
                <td style="text-align:center" class='bitcoin'> 02/022021 </td> 
                <td style="text-align:center" class='bitcoin'> 2 </td> 
                <td style="text-align:center" class='purchase-price bitcoin'> 30000 </td> 
                <td style="text-align:center" class='price bitcoin'>34102</td> 
                <td style="text-align:center" class='cost bitcoin'>30000</td> 
                <td style="text-align:center" class='market-value bitcoin'>34102</td> 
                <td style="text-align:center" class='return bitcoin'>4102.00</td> 
                <td style="text-align:center" class='percentage-return bitcoin'>13.67</td> 
            </tr> 
        </tbody> 
        </table>
    <script>
        window.onload = function(e){
            e.preventDefault()

            // Making the API call
            const baseUrl = "https://api.coingecko.com/api/v3/";
            let tablerows = document.querySelectorAll('.table-rows');
            tablerows.forEach((tr)=>{
                let coinId = tr.classList.value
                .slice(11)
                async function getCoinList(){
                //Select custom properties to generate the table
                
                let response = await fetch(`${baseUrl}coins/markets?vs_currency=usd&ids=${coinId}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
                let data = await response.json();
                return data;
                };

                getCoinList().then((data)=>{
                    data.forEach((coin)=>{
                        tr.childNodes[9].textContent = coin.current_price
                        
                        let price = parseFloat(coin.current_price)
                        let quantityValue = parseFloat(tr.childNodes[5].textContent);
                        let purchasePrice = parseFloat(tr.childNodes[7].textContent);
                        let cost = tr.childNodes[11];
                        cost.textContent = quantityValue * purchasePrice
                        let costValue = cost.textContent;
                        let marketValue = tr.childNodes[13];
                        marketValue.textContent = price * quantityValue;
                        mValue = marketValue.textContent
                        let returns = tr.childNodes[15];
                        returns.textContent = (parseFloat(mValue) - parseFloat(costValue)).toFixed(2);
                        let percentageReturns = tr.childNodes[17];
                        percentageReturns.textContent = ((parseFloat(mValue) - costValue)/(costValue) * 100).toFixed(2);
                        console.log(costValue)
                    })
                    
                })
                
            })


  
    
        }
    </script>
</body>
</html>