const socketClient = io();

const user = prompt("Ingrese su nombre")
socketClient.emit('homemessage', ("Se conecto ", user))
const bnv = document.querySelector('.bienvenida')
bnv.innerHTML = `Bienvenido ${user}`

const chatbox = document.querySelector('.chatbox')

socketClient.on('livechat', async (data) =>{
    try {
        let messages = ""
        console.log(data);
        await data.map((msg) => {
        messages += `${msg.user} = ${msg.message}<br/>`
        });
        chatbox.innerHTML = messages
    }catch (err){
        console.log(err);
    }
  
})

const placeHolder = document.querySelector('#chatinput')

placeHolder.addEventListener('keyup', (e) => {
    if(e.key === "Enter") {
        if(!placeHolder.value){
            alert("Debes completar el campo")
        }else{
            const msg = {
                user: user,
                message: placeHolder.value
            }
            placeHolder.value = ""
            socketClient.emit('livechatServer', msg)
        }
    
    }
})