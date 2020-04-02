const path=require('path')
const Forecasting=require('./utils/Forecasting.js')
const Geocoding=require('./utils/Geocoding.js')
const express=require('express')
const hbs=require('hbs')
const app=express()
const port=300

//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewDirectoryPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')     
app.set('views',viewDirectoryPath)    //Required when the dynamic serving directory is not named views
hbs.registerPartials(partialPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        'title':'Weather',
        'name':'Prakhar Bafna'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Prakhar'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        name:'weather'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:"No address provided"
        })
    }
    Geocoding(req.query.address,(error,{latitude,longitude,place}={})=>{
        if(error){
            return res.send({error})
        }
        Forecasting(latitude,longitude,(error,summary)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                place,
                address:req.query.address,
                forecast:summary
            })
        })

    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        Name:"Prakhar Bafna",
        errorMessage:"Help article not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        Name:"Prakhar Bafna",
        errorMessage:"Page Not found"
    })
})

// app.get('/about',(req,res)=>{
//     res.send('About')
// })

app.get('/contact',(req,res)=>{
    res.send('Contact')
})

app.listen(port,()=>{
    console.log('Server is listening on port'+' '+port)
})

//If the console shows the error:Cannot set headers after they are sent to the client, it means
//you are sending multiple responses back to the browser,i.e(multiple res.send)