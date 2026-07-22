let expenses = [];


function addExpense(){

    let name = document.getElementById("expenseName").value;

    let amount = document.getElementById("expenseAmount").value;

    let category = document.getElementById("expenseCategory").value;


    if(name === "" || amount === ""){
        alert("Please enter expense details");
        return;
    }


    let expense = {

        name: name,
        amount: amount,
        category: category

    };


    expenses.push(expense);


    displayExpenses();


    alert("✅ Expense Added Successfully");


    document.getElementById("expenseName").value = "";

    document.getElementById("expenseAmount").value = "";

}




function displayExpenses(){

    let table = document.getElementById("expenseTable");


    table.innerHTML = `

    <tr>
    <th>S.No</th>
    <th>Name</th>
    <th>Amount</th>
    <th>Category</th>
    </tr>

    `;


    expenses.forEach(function(expense, index){


        let row = table.insertRow();


        row.insertCell(0).innerHTML = index + 1;

        row.insertCell(1).innerHTML = expense.name;

        row.insertCell(2).innerHTML = "₹" + expense.amount;

        row.insertCell(3).innerHTML = expense.category;


    });

}





function openDashboard(){

    window.location.href = "dashboard.html";

}





function showFeature(feature){

    alert(feature + " module opened 🚀");

}





function openFeature(page){

    window.location.href = page;

}
