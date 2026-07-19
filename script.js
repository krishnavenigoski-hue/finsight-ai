function addExpense(){

    let name = document.getElementById("expenseName").value;

    let amount = document.getElementById("expenseAmount").value;

    let category = document.getElementById("expenseCategory").value;


    if(name === "" || amount === ""){
        alert("Please enter expense details");
        return;
    }


    alert(
        "✅ Expense Added\n\n" +
        "Name: " + name +
        "\nAmount: ₹" + amount +
        "\nCategory: " + category
    );

}
