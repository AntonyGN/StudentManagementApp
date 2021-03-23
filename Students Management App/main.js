function validateForm(){
    let form = document.forms['studentForm'];
    let name = form["name"].value
    let course = form["course"].value
    let fee = form["fee"].value


    if(name == "")
    {
        document.getElementById("name").style.border = "1px solid red";
        document.getElementById("textErrorName").style.display = "block"
        document.getElementById("textErrorName").innerHTML = "The name field is required"
    }else
    {
        document.getElementById("name").style.border = "2px solid green";
        document.getElementById("textErrorName").style.display = "none"
    }

    
    if(course == "")
    {
        document.getElementById("course").style.border = "1px solid red";
        document.getElementById("textErrorCourse").style.display = "block"
        document.getElementById("textErrorCourse").innerHTML = "The fee field is required"
    }else
    {
        document.getElementById("course").style.border = "2px solid green";
        document.getElementById("textErrorCourse").style.display = "none"
    } 
    
    if(fee == "")
    {
        document.getElementById("fee").style.border = "1px solid red";
        document.getElementById("textErrorFee").style.display = "block"
        document.getElementById("textErrorFee").innerHTML = "The course field is required"
    }else
    {
        document.getElementById("fee").style.border = "2px solid green";
        document.getElementById("textErrorFee").style.display = "none"
    }


    if(name=="" || fee=="" || course=="")
    {
        return false
    }else{

        student = {studentName: name, studentCourse: course, studentFee: fee}
        form.reset();
        return student 
    }
}


let btn = document.getElementById("addbtn");
var studentDatabase= [];
const fullFee = 45000

btn.addEventListener("click", ()=>{

    let studentObject = validateForm();

    if(studentObject !== false)
    {
        studentDatabase.push(studentObject)

        for(let pos = 0; pos < studentDatabase.length; pos++)
        {
            let name = studentDatabase[pos].studentName
            let course = studentDatabase[pos].studentCourse
            let fee =  studentDatabase[pos].studentFee
            let balance = fullFee - fee
            displayRecords(name, course, fee, balance, pos+1)
            studentDatabase.pop()
        }
    }

});

function displayRecords(name,course,fee,balance,rowPosition)
{
    let table = document.getElementById("studentsTable");
    let row = table.insertRow(rowPosition);

    let nameField = row.insertCell(0);
    let courseField = row.insertCell(1);
    let feeField = row.insertCell(2);
    let balanceField = row.insertCell(3);
    let deleteField = row.insertCell(4);

    nameField.innerHTML = name;
    courseField.innerHTML = course;
    feeField.innerHTML = fee;
    balanceField.innerHTML = balance;
    createButton(deleteField)
}

function createButton(cell)
{
    let button = document.createElement('input')
    button.setAttribute("type", "button")
    button.setAttribute("value", "Delete")
    button.setAttribute("id", "removeRow")
    button.setAttribute("onclick", "deleteRecord(this)")

    cell.appendChild(button);
}

function deleteRecord(x)
{

    let userConfirmation = confirm("Are you sure you want to delete this record")

    if (userConfirmation){
        let table = document.getElementById("studentsTable");
        let recordID = x.parentNode.parentNode.rowIndex
        table.deleteRow(recordID);
        alert("Record "+ recordID+" was deleted")        
    }
}