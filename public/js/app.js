console.log('Client side javascript file is loaded!');

const weatherForm=document.querySelector('form');
const searchData=document.querySelector('input');
const messegeOne=document.querySelector('#messegeOne');
const messegeTwo=document.querySelector('#messegeTwo');
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    messegeOne.textContent='Loading...';
    messegeTwo.textContent="";

    address=searchData.value;
    url="/weather?address="+address;
    fetch(url).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    messegeOne.textContent=data.error;
                }
                else{
                    messegeOne.textContent= data.place;
                    messegeTwo.textContent=data.forecast;
                }
            })
    })

})