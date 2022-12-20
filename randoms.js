const resp = {};
process.on('message', number =>{
    const cant = parseInt(number);
    console.log(cant)
    for(let i=0; i < cant ; i++){
        const randomNUmber = Math.floor(Math.random()*1000);
        if(resp[randomNUmber]){
            resp[randomNUmber] += 1;
        }else{
            resp[randomNUmber] = 1;
        }
    }
    process.send(resp);
})