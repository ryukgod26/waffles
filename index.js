document.addEventListener('DOMContentLoaded',()=>{

    function darkModeToggle(){
        if(document.body.classList.contains('dark-mode')){
        document.body.classList.toggle('dark-mode');
        document.getElementById('toggle').textContent = 'Dark Mode';
        }
        else{
        document.body.classList.toggle('dark-mode')
        document.getElementById('toggle').textContent = 'Light Mode';
        }
        
    }
    
    document.getElementById('toggle').onclick = darkModeToggle;
    let isDrawing = false;
    const canvas =  document.getElementById("canvas");
    if(canvas.getContext){
    const ctx = canvas.getContext("2d");
    
    //  ctx.fillStyle = 'black';
    //  ctx.strokeStyle = 'black';
    canvas.addEventListener('click',(event)=>{
        console.log('Mouse is at',event.offsetX,event.offsetY)
    })

    canvas.addEventListener('mousedown',(event)=>{
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(event.offsetX,event.offsetY);

        console.log('Drawing Mode On.');
        // ctx.fillRect(50,50,50,50);
        // ctx.strokeRect(50, 50, 50, 50);
    });
    canvas.addEventListener('mousemove',(event)=>{
        if(isDrawing){
            console.log('You are Drawing');
            ctx.lineTo(event.offsetX,event.offsetY);
            // ctx.moveTo(75, 50);

            ctx.stroke();
        }    
        else{
        console.log("Your are not Drawing.");
        }
        
    });
    canvas.addEventListener('mouseup',()=>{
        isDrawing = false;
    })
}
})

