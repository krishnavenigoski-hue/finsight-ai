let expenses = [];


// ADD EXPENSE

function addExpense(){

    let name = document.getElementById("expenseName").value;
    let amount = document.getElementById("expenseAmount").value;
    let category = document.getElementById("expenseCategory").value;


    if(name === "" || amount === ""){
        alert("Please enter expense details");
        return;
    }


    let expense = {

        name:name,
        amount:Number(amount),
        category:category

    };


    expenses.push(expense);


    displayExpenses();


    alert("✅ Expense Added Successfully");


    document.getElementById("expenseName").value="";
    document.getElementById("expenseAmount").value="";

}





// DISPLAY EXPENSES

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





// OPEN DASHBOARD

function openDashboard(){

window.location.href="dashboard.html";

}





// OPEN FEATURE PAGES

function openFeature(page){

window.location.href=page;

}







// BUDGET CALCULATOR

function calculateBudget(){


let salary=
Number(document.getElementById("salary").value);


let rent=
Number(document.getElementById("rent").value);


let food=
Number(document.getElementById("food").value);


let travel=
Number(document.getElementById("travel").value);


let emi=
Number(document.getElementById("emi").value);


let other=
Number(document.getElementById("other").value);



let commitments =
rent+food+travel+emi+other;



let remaining =
salary-commitments;



let savings =
remaining*0.5;



document.getElementById("commitments").innerHTML=
"₹"+commitments;



document.getElementById("remaining").innerHTML=
"₹"+remaining;



document.getElementById("savingPlan").innerHTML=
"₹"+savings;


}







// AI CHAT

function sendMessage(){


let input=document.getElementById("aiInput");

let message=input.value.toLowerCase();


let chat=document.getElementById("chatMessages");



let userMessage=document.createElement("p");

userMessage.innerHTML=
"👤 "+input.value;


chat.appendChild(userMessage);





let reply="";


if(message.includes("save")){

reply="💰 Try saving at least 20-30% of your income every month.";

}

else if(message.includes("budget")){

reply="📊 Your budget should balance commitments, savings and daily expenses.";

}

else if(message.includes("expense")){

reply="💸 Track your major expense categories and reduce unnecessary spending.";

}

else if(message.includes("laptop")){

reply="💻 Create a goal and save a fixed amount every month for your laptop.";

}

else{

reply="🤖 I can help you with budget, expenses, savings and financial goals.";

}



let aiReply=document.createElement("p");

aiReply.innerHTML=
"🤖 "+reply;


chat.appendChild(aiReply);



input.value="";

    function openAIChat(){

let box=document.getElementById("aiChatBox");

if(box.style.display==="block"){

box.style.display="none";

}

else{

box.style.display="block";

}

    }


}
