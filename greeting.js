const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOIWING_CN = "showing";
    // .showing = display

function saveName(text){
    localStorage.setItem(USER_LS, text);
    // 1-6-2. localStorage 의 USER_LS 값을 text(= currentValue)로 하여라 
}

function handleSubmit(event){
    event.preventDefault();
    // 1-3. handleSubmit 함수는 event를 인자로 가지고 preventDefault()한다 => submit시 새로고침 방지.
    const currentValue = input.value;
    // 1-4. currentValue = input에 입력된 값이다.
    paintGreeting(currentValue);
    // 1-5-1. paintGreeting(currentValue) 를 실행하여라.
    saveName(currentValue);
    // 1-6-1. saveName(currentValue) 를 실행하여라.
}

function askForName(){
    form.classList.add(SHOIWING_CN);
    // 1-1. form을 보여줘라
    form.addEventListener("submit", handleSubmit);
    // 1-2. form 을 제출하면 handleSubmit 함수를 실행해라.
}

function paintGreeting(text){
    form.classList.remove(SHOIWING_CN);
    // 1-5-2. form 안보이게 
    greeting.classList.add(SHOIWING_CN);
    // 1-5-3. greeting을 보이게 
    greeting.innerText = `Hello `
    let name = document.createElement("span");
    name.innerText = `${text}`;
    name.classList.add("bold");
    greeting.appendChild(name);
    // 1-5-4. greeting 안의 Text를 Hello 와 text( = currentValue)
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
    // 1. 만약 localStorage의 USER_LS = null 이면.. => 이름 넣기
        askForName();
    }else{
    // 2. 만약 localStorage의 USER_LS = something 이면..
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
    // 0. loadName 함수 실행
}

init();