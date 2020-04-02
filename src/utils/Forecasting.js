//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request=require('request')

const forecasting=(latitude,longitude,callback)=>{
    request({url:'https://api.darksky.net/forecast/a7a9beca93b90e47a59e1536c643d36b/'+latitude+','+longitude+'?units=si',json:true},(error,{body})=>{
        if(error){
            callback('Unable to fetch data',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            data=body.daily.data[0].summary;
            callback(undefined,data)
        }
    })
}

module.exports=forecasting