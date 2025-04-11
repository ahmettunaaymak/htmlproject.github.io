 let gameFinished = false;
        let character = document.getElementById("character");
        let score = 0;
        character.style.backgroundImage = 'url("pics/rabbit.png")'

        

        const keys = {
            w: false,
            a: false,
            s: false,
            d: false,
        }

        let positionX = 50;
        let positionY = 50;


        let egg = document.getElementById("egg");
        let eggX = 1000;
        let eggY = 500;
        let direction = Math.random() * Math.PI * 2 
        let speed = 10;
        let caught = false;
        let dx = Math.cos(direction) * speed;
        let dy = Math.sin(direction) * speed;


        function eggMove(){
            if (gameFinished)return;
            if (caught) return;
            eggX += dx;
            eggY += dy;
            let maxX = window.innerWidth - egg.clientWidth - 40;
            let maxY = window.innerHeight - egg.clientHeight - 40;
            if (eggX <= 10 || eggX >= maxX) dx = -dx;
            if (eggY <= 10 || eggY >= maxY) dy = -dy;
            egg.style.left = eggX + "px";
            egg.style.top = eggY + "px";
        }
       

        document.addEventListener('keydown', (event) => {
            const key = event.key.toLowerCase();
            if(key in keys){
            keys[key]=true;
            }
        })

        document.addEventListener('keyup', (event) => {
            const key = event.key.toLowerCase();
            if(key in keys){
            keys[key]=false;
            }
        })
        let seconds = 20;
        document.getElementById("second").innerHTML = seconds;
        setInterval(()=>{
            if (gameFinished)return;
            seconds -= 1;
            if(seconds==0)endGame();
            document.getElementById("second").innerHTML = seconds;
        },1000)

        setInterval(() => {
    let target = isGrouped ? document.getElementById("group") : character;

    if (!target) return; // Safety check
    if (gameFinished)return;

    let x = parseInt(target.style.left) || positionX;
    let y = parseInt(target.style.top) || positionY;

    if (keys.w && y > 0) y -= 10;
    if (keys.a && x > 0) x -= 10;
    if (keys.s && y < 805) y += 10;
    if (keys.d && x < 1810) x += 10;

    target.style.left = x + "px";
    target.style.top = y + "px";

    if (!isGrouped) {
        positionX = x;
        positionY = y;
    }

    eggMove();

    if (overlapCheck(character, egg)) end(1);
    if (isGrouped && overlapCheck(character, document.getElementById("nest"))) {
        depositEgg();
    }
   
}, 15);



function depositEgg() {
    if (gameFinished)return;
    if (isGrouped) {
        
        let group = document.getElementById("group");
        if (isGrouped) {
    let group = document.getElementById("group");
    if (group) {
       
        let rabbitRect = character.getBoundingClientRect();
        
       
        document.body.appendChild(character);
        group.remove(); // Delete the group div
        
        
        character.style.position = "absolute";
        character.style.left = rabbitRect.left + "px";
        character.style.top = rabbitRect.top + "px";
    }
}


        isGrouped = false;
        caught = false;
        score++;
        document.getElementById("result").innerHTML = "Score: " + score;

      
        egg.remove();
        
       
        setTimeout(spawnNewEgg, 200); 
    }
}



let eggIndex = 2;

function spawnNewEgg() {
    if (gameFinished)return;
    speed+=5;
    egg = document.createElement("div");
    egg.id = "egg";
    egg.style.position = "absolute";
    egg.style.width = "85px";
    egg.style.height = "110px";
    
    egg.style.background = `url('pics/${eggIndex}.png')`;
    eggIndex++;
    if(eggIndex == 5) eggIndex = 1;
    
    egg.style.backgroundSize = "cover";
    
    let newX, newY;
    do {
        newX = Math.floor(Math.random() * (window.innerWidth - 250));
        newY = Math.floor(Math.random() * (window.innerHeight - 250));
    } while (Math.abs(newX - 1000) < 200 && Math.abs(newY - 100) < 200); 

    egg.style.left = newX + "px";
    egg.style.top = newY + "px";

    document.body.appendChild(egg); 

    caught = false; 
}



        
        function overlapCheck(element1, element2){
            const rect1 = element1.getBoundingClientRect();
            const rect2 = element2.getBoundingClientRect();
            return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top ||  rect1.top > rect2.bottom);
        }

        function end(sonuc) {
        if (gameFinished)return;
    if (sonuc == 1) {
        if (!isGrouped) { 
            isGrouped = true;

            
            let charX = character.offsetLeft;
            let charY = character.offsetTop;

        
            const group = document.createElement("div");
            group.id = "group";
            group.style.position = "absolute"; 
            group.style.left = charX + "px"; 
            group.style.top = charY + "px"; 
            document.body.appendChild(group);
            group.appendChild(character);
            group.appendChild(egg);
            character.style.position = "relative";
            character.style.left = "0px";
            character.style.top = "0px";
            egg.style.position = "relative";
            egg.style.left = "0px";
            egg.style.top = "0px";
            caught = true;
        }
       
        
        return;
    }

    
    
}


        let isGrouped = false;
        function toggleGroup() {
     if (gameFinished)return;
    if (!isGrouped) {
        
        const group = document.createElement("div");
        group.id = "group";
        group.style.position = "absolute";
        group.style.left = character.style.left; 
        group.style.top = character.style.top;
        document.body.appendChild(group);
        group.appendChild(egg);
        group.appendChild(character);
        
        isGrouped = true;
        caught = true;
    } else{


    }
}

function endGame(){
    if (gameFinished)return;
    gameFinished = true
    character.style.display = "none";
    egg.style.display = "none";
    document.getElementById('nest').style.display = 'none';
    document.getElementById('second').style.display = 'none';
    let finalscore = score;
    let finalText = document.getElementById('result');
    finalText.style.fontSize = '50px';
    finalText.innerHTML = 'Game Over! Score: ' + finalscore;
    document.getElementById('bitir').style.display = "block"
    finalText.style.position = 'absolute';
    finalText.style.left = '40%';
    
                                                                                                                                            
}
