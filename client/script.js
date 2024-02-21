let server=new WebSocket('ws://localhost:5000');

const button=document.getElementById('btn-msg');
server.onopen=function(){
//   button.disabled=true;
}


button.addEventListener('click',function(){
    // button.disabled=false;
    let text= document.getElementById('inputtext').value;
    server.send(text);
    document.getElementById('inputtext').value=""
})

server.onmessage=function(event){
    let div=document.createElement('div');
    div.textContent=event.data;
    console.log(event)
    document.getElementById('message').appendChild(div);
}
