const request=require('request')

const url1="https://api.mapbox.com/geocoding/v5/mapbox.places/"
const url2=".json?access_token=pk.eyJ1IjoicHJha2hhcjA4MjgiLCJhIjoiY2s3OTRrZTdsMG14bDNscGZqN2NnMmNydiJ9.YbmLR2EdnBAG3yJwbPQu4Q"
const geocoding=(address,callback)=>{
    request({url:url1+address+url2,json:true}, (error,{body})=>{

    if(error){
        callback('Unable to fetch data',undefined)
    }

    else if(body.features.length==0){
        callback('Search results not found. Try another search',undefined)
        }

    else{
        data={
            longitude:body.features[0].center[0],
            latitude:body.features[0].center[1],
            place:body.features[0].place_name
        }
        callback(undefined,data)
        }
})
}


module.exports=geocoding