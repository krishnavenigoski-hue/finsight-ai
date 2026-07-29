alert("JavaScript connected");

// ===============================
// FinSight AI - Main JavaScript
// ===============================


// Store expenses
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];


// ===============================
// SAVE USER PROFILE
// ===============================

function saveProfile(){

    alert("Save Profile clicked");

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


    window.location.href="index.html";

}





// ===============================
// ADD EXPENSE
// ===============================

function addExpense(){

    let name=document.getElementById("expenseName").value;

    let amount=Number(
        document.getElementById("expenseAmount").value
    );

    let category=document.getElementById("expenseCategory").value;



    if(name==="" || amount===""){

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


    alert("Expense Added Successfully");


}






// ===============================
// DISPLAY EXPENSE TABLE
// ===============================

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



    expenses.forEach((expense,index)=>{


        let row=table.insertRow();


        row.insertCell(0).innerHTML=index+1;

        row.insertCell(1).innerHTML=expense.name;

        row.insertCell(2).innerHTML="₹"+expense.amount;

        row.insertCell(3).innerHTML=expense.category;


    });


}







// ===============================
// GET PROFILE DATA
// ===============================

function getProfile(){

    return JSON.parse(
        localStorage.getItem("finSightProfile")
    );

}







// ===============================
// AI SUGGESTIONS
// ===============================

function generateAIAdvice(){


let profile=getProfile();


if(!profile) return "Please complete your financial profile first.";



let advice=[];



let totalFixed =
profile.rent+
profile.emi+
profile.bills;



if(totalFixed > profile.salary*0.5){

advice.push(
"⚠️ Your fixed commitments are high compared to your income."
);

}



if(profile.shopping > profile.salary*0.15){

advice.push(
"🛒 Your shopping budget is high. Try reducing unnecessary purchases."
);

}



if(profile.savingTarget < profile.salary*0.2){

advice.push(
"💰 Try increasing your monthly savings goal."
);

}



if(advice.length===0){

advice.push(
"✅ Your financial planning looks healthy. Keep maintaining your budget."
);

}



return advice.join("<br>");

}








// ===============================
// AI CHAT
// ===============================


function sendMessage(){


let input=document.getElementById("aiInput");

let chat=document.getElementById("chatMessages");


if(!input || input.value==="")
return;



let userText=input.value;


chat.innerHTML +=
"<p>👤 "+userText+"</p>";



let profile=getProfile();


let reply="";



if(profile){


if(userText.toLowerCase().includes("salary")){

reply=
"Your monthly salary is ₹"+profile.salary+
". I can help you plan your budget.";

}


else if(userText.toLowerCase().includes("save")){

reply=
"Your saving target is ₹"+
profile.savingTarget+
" per month. Try saving consistently.";

}


else if(userText.toLowerCase().includes("goal")){

reply=
"Your current goal is "+
profile.shortGoal+
" and target amount is ₹"+
profile.shortAmount;

}


else{

reply=
"I know your income, expenses and goals. Ask me about budget, savings, expenses or goals.";

}


}

else{

reply=
"Please complete your financial profile first.";

}



chat.innerHTML +=
"<p>🤖 "+reply+"</p>";



input.value="";


chat.scrollTop=chat.scrollHeight;


}







// ===============================
// AI CHAT OPEN/CLOSE
// ===============================

function openAIChat(){


let box=document.getElementById("aiChatBox");


if(box.style.display==="block"){

box.style.display="none";

}

else{

box.style.display="block";

}


}







// ===============================
// PAGE NAVIGATION
// ===============================


function openDashboard(){

window.location.href="dashboard.html";

}


function openFeature(page){

window.location.href=page;

}



// Load expenses automatically

window.onload=function(){

displayExpenses();

}
