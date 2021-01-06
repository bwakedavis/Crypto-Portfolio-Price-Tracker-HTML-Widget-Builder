window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const baseUrl = "https://api.coingecko.com/api/v3/";
    async function getCoinList(){
        let response = await fetch(`${baseUrl}coins/list`);
        let data = await response.json();
        return data;
    };
    getCoinList().then(data => {
        data.forEach((coin)=>{
            
            let firstRow = document.querySelector('.first-column');
            console.log(coin);
            let firstTd = document.createElement('tr');
            firstTd.textContent = coin.name;
            firstRow.appendChild(firstTd);
        })
    }).catch(err => console.log(err))
    
});