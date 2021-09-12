import { APIKEY } from "./apiKey.js"

const stockName = document.getElementById("stock-name").textContent
const getPrice = async (symbol) =>{
    try{
        const priceEndpoint = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${APIKEY}`
        const response = await  fetch(priceEndpoint)

        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse.price;
        }
        else{
            throw new Error("Request failed!")
        }
    }catch(error){
        console.log(error)
    }
}
const getVolume = async (symbol) =>{
    try{
        const volumeEndpoint = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1min&apikey=${APIKEY}&source=docs`
        const response = await  fetch(volumeEndpoint)

        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse.values[0].volume;
        }
        else{
            throw new Error("Request failed!")
        }
    }catch(error){
        console.log(error)
    }
}
getVolume(stockName).then((result)=>{
    let volume = document.getElementById("volume").textContent
    volume += result
    document.getElementById("volume").innerHTML = volume
}).catch((error)=>{
    console.log(`Error: ${error}`)
})

getPrice(stockName).then((result)=>{
    let price = document.getElementById("price").textContent
    price += result
    document.getElementById("price").innerHTML = price
}).catch((error)=>{
    console.log(`Error: ${error}`)
})


