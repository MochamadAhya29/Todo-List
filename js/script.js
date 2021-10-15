const inputBox = document.querySelector(".inputField input");
const addbtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todolist");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value; // untuk mendapatkan value yang sudah
    if (userEnteredValue.trim() != 0){ //mengecek value apakah sudah diinput
        addbtn.classList.add("active"); //active btn
    } else {
        addbtn.classList.remove("active"); //unactive btn
    }
}
    showTask();

    addbtn.onclick =() => {  //ketika user click button +
        let userEnteredValue = inputBox.value;  //mengambil value yang diinput
        let getLocalStorageData = localStorage.getItem("New Todo"); //get localstoragedata
        if(getLocalStorageData == null){  //mengecek apakah data kosong
            listArray = []; // membuat array kosong
        } else {
            listArray = JSON.parse(getLocalStorageData);  //mengubah json string ke json object
        }
        listArray.push(userEnteredValue); // menambahkan data value ke array
        localStorage.setItem("New Todo", JSON.stringify(listArray));
        showTask();
        addbtn.classList.remove("active");  // unactive btn
    }

    function showTask(){
        let getLocalStorageData = localStorage.getItem("New Todo");
        if(getLocalStorageData == null){
            listArray = [];
        } else {
            listArray = JSON.parse(getLocalStorageData);

        }
        const pendingTaskNumb = document.querySelector(".pendingTask");
        pendingTaskNumb.textContent = listArray.length;
        if(listArray.length > 0){
            deleteAllBtn.classList.add("active");
        } else {
            deleteAllBtn.classList.remove("active");
        }
        
        let newLiTag = "";
        listArray.forEach((element, index) => {
            newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class ="fas fa-trash"></i></span></li>`; // mengambil data yang ada pada array untuk di ulang di dalam tag <ul></ul>
        });
        todoList.innerHTML = newLiTag;
        inputBox.value= "";
    }

    function deleteTask(index){
        let getLocalStorageData = localStorage.getItem("New Todo");
        listArray = JSON.parse(getLocalStorageData);
        listArray.splice(index, 1);
        localStorage.setItem("New Todo", JSON.stringify(listArray));
        showTask();
    }

    deleteAllBtn.onclick = () => {
        let getLocalStorageData = localStorage.getItem("New Todo");
        if(getLocalStorageData == null){
            listArray = [];
        } else {
            listArray = JSON.parse(getLocalStorageData);
            listArray = [];
        }

        localStorage.setItem("New Todo", JSON.stringify(listArray));
        showTask();
    }
