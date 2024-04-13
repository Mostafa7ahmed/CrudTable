let selctedRow = null;
let table = document.getElementById("student-list");
// Show Alert 
let showAlert = function (message, className) {
    let div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    let container = document.querySelector(".container");
    let main = document.querySelector(".main");
    container.insertBefore(div, main);
    function showTime() {
        document.querySelector(".alert").remove()
    }
    setTimeout(showTime, 3000);
}
// Deleted item
let deletedStudent = function () {
    document.querySelector("#student-list").addEventListener("click", (e) => {
        target = e.target;
        if (target.classList.contains("delete")) {
            target.parentElement.parentElement.remove();
            showAlert("student Deleted success ", "danger ");
            saveData();
        }

    });
};
// clear Input Value 
function clearInput() {
    document.getElementById("fristName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("rollNo").value = ""
}
// Add Input Value 
let addStudent = function () {
    document.getElementById("student-form").addEventListener("submit", (e) => {
        e.preventDefault();
        let fName = document.getElementById("fristName").value;
        let lName = document.getElementById("lastName").value;
        let rN = document.getElementById("rollNo").value;
        if (lName === "" || fName === "" || rN === "") {
            showAlert("Enter Name Student   ", "warning");
        }
        else {
            if (selctedRow == null) {
                let list = document.getElementById("student-list");
                let row = document.createElement("tr");
                row.innerHTML = `
                <th>${fName}</th>
                <td>${lName}</td>
                <td>${rN}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm me-3 edit">Etiding</a>
                    <a href="#" class="btn btn-danger btn-sm  delete">Deleted</a>
                </td>
                `;
                list.appendChild(row);
                selctedRow = null;
                showAlert("Add Student success `   ", "success");
                saveData();
            }
            else {
                selctedRow.children[0].textContent = fName;
                selctedRow.children[1].textContent = lName;
                selctedRow.children[2].textContent = rN;
                showAlert("Edited Student success ", "info");
                saveData();
            }
        }
        clearInput();

    });
};
// Edited Input Value 
let EditStudent = function () {
    document.getElementById("student-list").addEventListener("click", (e) => {
        target = e.target;
        if (target.classList.contains("edit")) {
            selctedRow = target.parentElement.parentElement;
            document.getElementById("fristName").value = selctedRow.children[0].textContent;
            document.getElementById("lastName").value = selctedRow.children[1].textContent;
            document.getElementById("rollNo").value = selctedRow.children[2].textContent;
            saveData();
        }
    });
};
//save Data
function saveData() {
    localStorage.setItem("table", table.innerHTML);
}
//show Data 
function showData() {
    table.innerHTML = localStorage.getItem("table");
}
// call Fucntion
addStudent();
EditStudent();
deletedStudent();
 