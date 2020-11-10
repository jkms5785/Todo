const bg = document.querySelector(".js-bg");
const IMG_NUMBER = 8;

// function handleImgLoad(){
//     console.log("Finish Loading")
// }

function paintImage(imgNumber){
    const image = new Image();
    image.src = `Images/${imgNumber + 1}.jpg`;  
    image.classList.add("bgImage");  
    bg.appendChild(image);
    // image.addEventListener("loaded", handleImgLoad);
    // local 저장소에서 불러오기때문에 .. 지금은 소용이 없다.
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    // 1. 난수 생성 0 ~ 4 
    paintImage(randomNumber);
    // 2. randomNumber을 인자로 갖는 paintImage 실행
}

init();

