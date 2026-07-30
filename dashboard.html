// =====================================
// FinSight AI - Main Script
// =====================================


// Store expenses
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];



// =====================================
// SAVE PROFILE FROM SETUP PAGE
// =====================================

function saveProfile(){

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



        // NEW 3 SHORT TERM GOALS

        shortGoals:[
            {
                goal: document.getElementById("shortGoal1").value,
                amount: Number(document.getElementById("shortAmount1").value)
            },

            {
                goal: document.getElementById("shortGoal2").value,
                amount: Number(document.getElementById("shortAmount2").value)
            },

            {
                goal: document.getElementById("shortGoal3").value,
                amount: Number(document.getElementById("shortAmount3").value)
            }
        ],



        // NEW 3 LONG TERM GOALS

        longGoals:[
            {
                goal: document.getElementById("longGoal1").value,
                amount: Number(document.getElementById("longAmount1").value)
            },

            {
                goal: document.getElementById("longGoal2").value,
                amount: Number(document.getElementById("longAmount2").value)
            },

            {
                goal: document.getElementById("longGoal3").value,
                amount: Number(document.getElementById("longAmount3").value)
            }
        ],



        currentSavings:
        Number(document.getElementById("currentSavings").value),


        savingTarget:
        Number(document.getElementById("savingTarget").value)

    };



    localStorage.setItem(
        "finSightProfile",
        JSON.stringify(profile)
    );


    alert("✅ Financial Profile Created Successfully");


    window.location.href="dashboard.html";

}






// =====================================
// ADD EXPENSE
// =====================================

function addExpense(){

    let name=document.getElementById("expenseName").value;

    let amount=Number(
        document.getElementById("expenseAmount").value
    );

    let category=document.getElementById("expenseCategory").value;



    if(name==="" || amount<=0){

        alert("Please enter expense details");

        return;

    }



    let expense={

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

    let table=document.getElementById("expenseTable");


    if(!table) return;



    table.innerHTML=`

    <tr>
    <th>S.No</th>
    <th>Name</th>
    <th>Amount</th>
    <th>Category</th>
    </tr>

    `;



    expenses.forEach(function(expense,index){


        let row=table.insertRow();


        row.insertCell(0).innerHTML=index+1;

        row.insertCell(1).innerHTML=expense.name;

        row.insertCell(2).innerHTML="₹"+expense.amount;

        row.insertCell(3).innerHTML=expense.category;


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

    let profile=getProfile();


    if(!profile){

        return "Please complete your financial profile.";

    }


    let advice=[];


    let totalExpense =
    profile.rent+
    profile.emi+
    profile.bills+
    profile.food+
    profile.travel+
    profile.shopping+
    profile.otherExpense;



    if(totalExpense > profile.salary*0.7){

        advice.push(
        "⚠️ Your expenses are above 70% of income."
        );

    }



    if(profile.shopping > profile.salary*0.15){

        advice.push(
        "🛒 Reduce shopping expenses."
        );

    }



    if(advice.length===0){

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


    let input=document.getElementById("aiInput");

    let chat=document.getElementById("chatMessages");


    if(!input || input.value.trim()==="") return;



    let message=input.value;


    chat.innerHTML +=
    "<p>👤 "+message+"</p>";



    let profile=getProfile();

    let reply;



    if(message.toLowerCase().includes("salary")){

        reply="Your salary is ₹"+profile.salary;

    }


    else if(message.toLowerCase().includes("goal")){


        reply="Your goals are: ";

        profile.shortGoals.forEach(g=>{

            reply += g.goal+" - ₹"+g.amount+"<br>";

        });

    }


    else if(message.toLowerCase().includes("save")){

        reply="Your saving target is ₹"+profile.savingTarget;

    }


    else{

        reply="I can help you with salary, savings, goals, expenses and budgeting.";

    }



    chat.innerHTML +=
    "<p>🤖 "+reply+"</p>";



    input.value="";

}






// =====================================
// AI CHAT POPUP
// =====================================

function openAIChat(){

    let box=document.getElementById("aiChatBox");


    if(!box) return;



    if(box.style.display==="block"){

        box.style.display="none";

    }

    else{

        box.style.display="block";

    }

}






// =====================================
// NAVIGATION
// =====================================

function openDashboard(){

    let profile=
    localStorage.getItem("finSightProfile");


    if(profile){

        window.location.href="dashboard.html";

    }

    else{

        alert("Please complete your financial profile first.");

        window.location.href="setup.html";

    }

}



function openSetup(){

    window.location.href="setup.html";

}



function openFeature(page){

    window.location.href=page;

}






// =====================================
// LOAD
// =====================================

window.onload=function(){

    displayExpenses();


    let profile=
    localStorage.getItem("finSightProfile");


    let btn=document.getElementById("profileBtn");


    if(profile && btn){

        btn.style.display="none";

    }

};
