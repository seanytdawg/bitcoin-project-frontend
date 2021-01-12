const BACKEND = "http://localhost:5000/";



export const getBitCoinPrice = ()=>fetch(`${BACKEND}price`, {
    headers: {
        currency: "dollars"
    }
})
.then((response)=>{
    console.log("returned with a status of", response.status)
    return response.json()
})