window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const baseUrl = "https://api.coingecko.com/api/v3/";
    const PriceAndMarketCap = "https://api.coingecko.com/api/v3/https://api.coingecko.com/api/v3/";
    async function getCoinList(){
        let response = await fetch(`${baseUrl}coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6000&page=1&sparkline=false`);
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
            let marketPriceTd = document.createElement('td');
            let costTd = document.createElement('td');
            let marketValueTd = document.createElement('td');
            let returnTd = document.createElement('td');
            let percentageReturnTd = document.createElement('td');

            //Handle the name field
            let coinImage = document.createElement('img');
            coinImage.style.width = "20px";
            coinImage.src = coin.image;
            let SpanTextTr = document.createElement('span');
            SpanTextTr.textContent = coin.name;

            //append data into the DOM
            nameTd.appendChild(coinImage);
            nameTd.appendChild(SpanTextTr);
            firstRd.appendChild(nameTd);
            firstRow.appendChild(firstRd);
            
        })
    }).catch(err => console.log(err))
    
});