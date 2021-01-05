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
            console.log(coin.id)
        })
    }).catch(err => console.log(err))
    
});