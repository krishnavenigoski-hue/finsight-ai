// =====================================
// FinSight AI - Main Script
// =====================================


// Store expenses
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];



// =====================================
// SAVE PROFILE FROM SETUP PAGE
// =====================================

function saveProfile(){

    alert("Button working");

    let profile = {

        name: document.getElementById("userName").value,

        salary: Number(document.getElementById("salary").value),

        otherIncome: Number(document.getElementById("otherIncome").value),

        rent: Number(document.getElementById("rent").value),

        emi: Number(document.getElementById("emi").value),

        bills: Number(document.getElementById("bills").value),

        food: Number(document.getElementById("food").value),

        travel: Number(document.getElementById("travel").value),

        shopping: Number(document.getElementById("shopping").value),

        otherExpense: Number(document.getElementById("otherExpense").value),

        shortGoal: document.getElementById("shortGoal").value,

        shortAmount: Number(document.getElementById("shortAmount").value),

        longGoal: document.getElementById("longGoal").value,

        longAmount: Number(document.getElementById("longAmount").value),

        currentSavings: Number(document.getElementById("currentSavings").value),

        savingTarget: Number(document.getElementById("savingTarget").value)

    };


    localStorage.setItem(
        "finSightProfile",
        JSON.stringify(profile)
    );


    alert("✅ Financial Profile Created Successfully");


    window.location.href = "index.html";

}






// =====================================
// ADD EXPENSE
// =====================================

function addExpense(){

    let name = document.getElementById("expenseName").value;

    let amount = Number(
        document.getElementById("expenseAmount").value
    );

    let category = document.getElementById("expenseCategory").value;



    if(name === "" || amount <= 0){

        alert("Please enter expense details");

        return;

    }



    let expense = {

        name:name,

        amount:amount,

        category:category,

        date:new Date().toLocaleDateString()

    };


    expenses.push(expense);


    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    displayExpenses();


    alert("✅ Expense Added Successfully");

}






// =====================================
// DISPLAY EXPENSES
// =====================================

function displayExpenses(){

    let table = document.getElementById("expenseTable");


    if(!table) return;



    table.innerHTML = `

    <tr>
    <th>S.No</th>
    <th>Name</th>
    <th>Amount</th>
    <th>Category</th>
    </tr>

    `;



    expenses.forEach(function(expense,index){


        let row = table.insertRow();


        row.insertCell(0).innerHTML = index + 1;

        row.insertCell(1).innerHTML = expense.name;

        row.insertCell(2).innerHTML = "₹" + expense.amount;

        row.insertCell(3).innerHTML = expense.category;


    });

}






// =====================================
// GET PROFILE
// =====================================

function getProfile(){

    return JSON.parse(
        localStorage.getItem("finSightProfile")
    );

}






// =====================================
// AI SUGGESTIONS
// =====================================

function generateAIAdvice(){


    let profile = getProfile();


    if(!profile){

        return "Please complete your financial profile.";

    }



    let advice = [];



    let totalExpense =
    profile.rent +
    profile.emi +
    profile.bills +
    profile.food +
    profile.travel +
    profile.shopping +
    profile.otherExpense;



    if(totalExpense > profile.salary * 0.7){

        advice.push(
        "⚠️ You are spending more than 70% of your income."
        );

    }



    if(profile.shopping > profile.salary * 0.15){

        advice.push(
        "🛒 Reduce shopping expenses to improve savings."
        );

    }



    if(profile.savingTarget < profile.salary * 0.2){

        advice.push(
        "💰 Try saving at least 20% of your income."
        );

    }



    if(advice.length === 0){

        advice.push(
        "✅ Your financial planning looks healthy."
        );

    }


    return advice.join("<br>");

}






// =====================================
// AI CHAT
// =====================================

function sendMessage(){


    let input = document.getElementById("aiInput");

    let chat = document.getElementById("chatMessages");


    if(!input || input.value.trim() === ""){

        return;

    }



    let message = input.value;


    chat.innerHTML += 
    "<p>👤 " + message + "</p>";



    let profile = getProfile();


    let reply;



    if(profile){


        if(message.toLowerCase().includes("salary")){

            reply =
            "Your salary is ₹" + profile.salary +
            ". I can help you plan your budget.";

        }


        else if(message.toLowerCase().includes("goal")){

            reply =
            "Your short-term goal is " +
            profile.shortGoal +
            " and target is ₹" +
            profile.shortAmount;

        }


        else if(message.toLowerCase().includes("save")){

            reply =
            "Your monthly saving target is ₹" +
            profile.savingTarget;

        }


        else{

            reply =
            "I can help you with salary, budget, expenses, savings and goals.";

        }


    }

    else{

        reply =
        "Please complete your financial profile first.";

    }



    chat.innerHTML +=
    "<p>🤖 " + reply + "</p>";



    input.value = "";

}






// =====================================
// OPEN / CLOSE AI CHAT
// =====================================

function openAIChat(){


    let box = document.getElementById("aiChatBox");


    if(!box) return;



    if(box.style.display === "block"){

        box.style.display = "none";

    }

    else{

        box.style.display = "block";

    }

}






// =====================================
// NAVIGATION
// =====================================

function openDashboard(){

    window.location.href = "dashboard.html";

}



function openFeature(page){

    window.location.href = page;

}






// Load expenses

window.onload = function(){

    displayExpenses();

};
