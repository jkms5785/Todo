const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let delImg = new Image();
delImg.src = "Images/icon/delete.svg";

let toDos = [];

function deleteTodo(event) {
    const btn = event.target.parentNode;
    const li = btn.parentNode;
    // 부모 태그의 ID 들고오기 => console.log(event.target.dir);
    // event.target.parentNode => 이벤트 타겟의 부모 li의 아이디 값

    toDoList.removeChild(li);
    // toDoList = ul>li 중에 event.target 삭제 
    const cleanToDos = toDos.filter(function (toDo) {
        //filter = > 배열안에 있는 모든 object의 에 조건을 제외한 값만 출력.
        return toDo.id !== parseInt(li.id);
        //li.id = String 이므로 parseInt로 Number로 만들어준다.
    });
    toDos = cleanToDos
    saveToDos();
}

function makeLine(a) {
    if (a.classList.contains(`checked`)) {
        a.parentElement.classList.add(`line`);
    } else {
        a.parentElement.classList.remove(`line`);
    }
}


function paintTodo(text, check) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");

    const checkBtn = document.createElement("input");
    checkBtn.type = "checkbox";
    checkBtn.classList.add("btn-check");
    checkBtn.value = check;

    if (check == 1) {
        checkBtn.classList.add("checked");
    } else {
        checkBtn.classList.add("unchecked");
    }

    checkBtn.addEventListener("click", CheckTask);
    checkBtn.id = toDos.length + 1;
    const newId = toDos.length + 1;

    delBtn.classList.add("btn-del");

    const img = document.createElement("img");
    img.src = "Images/icon/delete.svg";
    delBtn.appendChild(img);
    delBtn.addEventListener("click", deleteTodo);

    li.classList.add("Todo");
    li.appendChild(span);
    span.innerText = text;
    span.classList.add('Todo-li');
    span.appendChild(checkBtn);
    li.appendChild(delBtn);
    li.id = newId;

    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId,
        check: check,
    };
    toDos.push(toDoObj);

    saveToDos();
    makeLine(checkBtn);
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue, 2);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintTodo(toDo.text, toDo.check);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();

function CheckTask(e) {
    let id = e.target.id - 1;
    if (e.target.value == `2`) {
        e.target.value = `1`;
        e.target.classList.remove('unchecked');
        e.target.classList.add('checked');
        toDos[id].check = 1;
    } else {
        e.target.value = '2';

        e.target.classList.remove('checked');
        e.target.classList.add('unchecked');
        toDos[id].check = 2;
    }
    saveToDos();
    makeLine(e.target);
}