// =====================================
// FinSight AI - Main Script (New Version)
// =====================================


// ===============================
// STORAGE
// ===============================

let expenses = JSON.parse(
    localStorage.getItem("expenses")
) || [];


// ===============================
// GET PROFILE
// ===============================

function getProfile(){

    return JSON.parse(
        localStorage.getItem("finSightProfile")
    );

}



// ===============================
// SAVE / UPDATE PROFILE
// ===============================

function saveProfile(){


    let profile = {


        name:
        document.getElementById("userName")?.value || "",


        salary:
        Number(document.getElementById("salary")?.value || 0),


        otherIncome:
        Number(document.getElementById("otherIncome")?.value || 0),



        rent:
        Number(document.getElementById("rent")?.value || 0),


        emi:
        Number(document.getElementById("emi")?.value || 0),


        bills:
        Number(document.getElementById("bills")?.value || 0),



        food:
        Number(document.getElementById("food")?.value || 0),


        travel:
        Number(document.getElementById("travel")?.value || 0),


        shopping:
        Number(document.getElementById("shopping")?.value || 0),


        otherExpense:
        Number(document.getElementById("otherExpense")?.value || 0),



        // 3 SHORT TERM GOALS

        shortGoals:[

            {
                goal:
                document.getElementById("shortGoal1")?.value || "",

                amount:
                Number(document.getElementById("shortAmount1")?.value || 0)
            },


            {
                goal:
                document.getElementById("shortGoal2")?.value || "",

                amount:
                Number(document.getElementById("shortAmount2")?.value || 0)
            },


            {
                goal:
                document.getElementById("shortGoal3")?.value || "",

                amount:
                Number(document.getElementById("shortAmount3")?.value || 0)
            }

        ],




        // 3 LONG TERM GOALS

        longGoals:[

            {
                goal:
                document.getElementById("longGoal1")?.value || "",

                amount:
                Number(document.getElementById("longAmount1")?.value || 0)
            },


            {
                goal:
                document.getElementById("longGoal2")?.value || "",

                amount:
                Number(document.getElementById("longAmount2")?.value || 0)
            },


            {
                goal:
                document.getElementById("longGoal3")?.value || "",

                amount:
                Number(document.getElementById("longAmount3")?.value || 0)
            }

        ],




        currentSavings:
        Number(document.getElementById("currentSavings")?.value || 0),



        savingTarget:
        Number(document.getElementById("savingTarget")?.value || 0)

    };



    localStorage.setItem(
        "finSightProfile",
        JSON.stringify(profile)
    );



    alert("✅ Financial Profile Saved Successfully");


    window.location.href="dashboard.html";

}





// ===============================
// LOAD PROFILE INTO EDIT PAGE
// ===============================


function loadProfileForEdit(){


    let profile=getProfile();


    if(!profile) return;



    let fields=[

        "userName",
        "salary",
        "otherIncome",
        "rent",
        "emi",
        "bills",
        "food",
        "travel",
        "shopping",
        "otherExpense",
        "currentSavings",
        "savingTarget"

    ];



    fields.forEach(function(id){


        let element=document.getElementById(id);


        if(element){

            let key=id;


            element.value=profile[key] || "";

        }


    });



    if(profile.shortGoals){


        shortGoalsToInputs(profile.shortGoals);

    }



    if(profile.longGoals){


        longGoalsToInputs(profile.longGoals);

    }



}





function shortGoalsToInputs(goals){


    goals.forEach(function(g,index){


        let number=index+1;


        let goal=document.getElementById(
            "shortGoal"+number
        );


        let amount=document.getElementById(
            "shortAmount"+number
        );


        if(goal)
        goal.value=g.goal;


        if(amount)
        amount.value=g.amount;


    });


}




function longGoalsToInputs(goals){


    goals.forEach(function(g,index){


        let number=index+1;


        let goal=document.getElementById(
            "longGoal"+number
        );


        let amount=document.getElementById(
            "longAmount"+number
        );


        if(goal)
        goal.value=g.goal;


        if(amount)
        amount.value=g.amount;

        // ===============================
// EXPENSE MANAGEMENT
// ===============================


function addExpense(){


    let name =
    document.getElementById("expenseName")?.value;


    let amount =
    Number(document.getElementById("expenseAmount")?.value);


    let category =
    document.getElementById("expenseCategory")?.value;



    if(!name || amount<=0){

        alert("Please enter valid expense details");

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




function displayExpenses(){


    let table =
    document.getElementById("expenseTable");



    if(!table)
    return;



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


        row.insertCell(1).innerHTML=
        expense.name;



        row.insertCell(2).innerHTML=
        "₹"+expense.amount;



        row.insertCell(3).innerHTML=
        expense.category;



    });



}





// ===============================
// DASHBOARD DATA DISPLAY
// ===============================


function loadDashboard(){


    let profile=getProfile();



    if(!profile)
    return;



    let elements={


        dashName:
        profile.name,


        dashSalary:
        "₹"+profile.salary,


        dashSaving:
        "₹"+profile.savingTarget,


        dashCurrentSavings:
        "₹"+profile.currentSavings


    };



    Object.keys(elements).forEach(function(id){


        let element=document.getElementById(id);


        if(element){

            element.innerHTML=elements[id];

        }


    });




    // Goals


    if(profile.shortGoals){


        let short=document.getElementById(
            "dashboardShortGoals"
        );


        if(short){


            short.innerHTML="";


            profile.shortGoals.forEach(function(goal){


                if(goal.goal){


                    short.innerHTML +=

                    `
                    <p>
                    🎯 ${goal.goal}
                    - ₹${goal.amount}
                    </p>
                    `;

                }


            });


        }


    }





    if(profile.longGoals){


        let long=document.getElementById(
            "dashboardLongGoals"
        );


        if(long){


            long.innerHTML="";


            profile.longGoals.forEach(function(goal){


                if(goal.goal){


                    long.innerHTML +=

                    `
                    <p>
                    🏡 ${goal.goal}
                    - ₹${goal.amount}
                    </p>
                    `;


                }


            });


        }


    }




}





// ===============================
// AI FINANCIAL RECOMMENDATION
// ===============================


function generateAIAdvice(){


    let profile=getProfile();



    if(!profile){

        return "Please complete your financial profile.";

    }




    let advice=[];



    let totalIncome =
    profile.salary +
    profile.otherIncome;




    let totalExpense =

    profile.rent +

    profile.emi +

    profile.bills +

    profile.food +

    profile.travel +

    profile.shopping +

    profile.otherExpense;




    let savings =
    totalIncome-totalExpense;






    if(totalExpense > totalIncome*0.7){


        advice.push(

        "⚠️ Your expenses are more than 70% of income. Try reducing unnecessary spending."

        );


    }







    if(profile.shopping > totalIncome*0.15){


        advice.push(

        "🛒 Shopping expenses are high. Consider reducing them."

        );


    }







    if(savings > totalIncome*0.3){


        advice.push(

        "🌟 Excellent! You are maintaining a strong saving habit."

        );


    }

    else if(savings>0){


        advice.push(

        "💰 Good start. Try increasing your monthly savings."

        );


    }

    else{


        advice.push(

        "🚨 Your expenses are higher than income. Create a strict budget."

        );


    }







    if(profile.shortGoals){


        advice.push(

        "🎯 Your short-term goals should be planned with monthly saving targets."

        );


    }





    if(profile.longGoals){


        advice.push(

        "🏡 Long-term goals require consistent investment and patience."

        );


    }





    return advice.join("<br><br>");

    
// ===============================
// AI CHAT POPUP
// ===============================


function openAIChat(){


    let box =
    document.getElementById("aiChatBox");



    if(!box)
    return;



    if(box.style.display==="block"){

        box.style.display="none";

    }

    else{

        box.style.display="block";

    }


}







// ===============================
// AI CHAT ASSISTANT
// ===============================


function sendMessage(){


    let input =
    document.getElementById("aiInput");


    let chat =
    document.getElementById("chatMessages");



    if(!input || input.value.trim()==="")

    return;



    let message =
    input.value;



    chat.innerHTML +=

    `
    <p>👤 ${message}</p>
    `;



    let reply =
    getAIChatReply(message);



    chat.innerHTML +=

    `
    <p>🤖 ${reply}</p>
    `;



    input.value="";



    chat.scrollTop =
    chat.scrollHeight;


}







function getAIChatReply(message){


    let profile =
    getProfile();



    if(!profile){


        return "Please complete your financial profile first.";

    }





    let text =
    message.toLowerCase();






    if(text.includes("salary") || text.includes("income")){


        return

        "Your monthly income is ₹"

        + profile.salary

        +

        ". I can help you create a better budget.";



    }







    if(text.includes("saving")){


        return

        "Your current saving target is ₹"

        +

        profile.savingTarget

        +

        ". Try saving regularly every month.";



    }







    if(text.includes("expense") || text.includes("spending")){


        let total =

        profile.rent +

        profile.emi +

        profile.bills +

        profile.food +

        profile.travel +

        profile.shopping +

        profile.otherExpense;



        return

        "Your planned monthly expenses are around ₹"

        +

        total

        +

        ". I suggest tracking unnecessary spending.";



    }







    if(text.includes("goal")){


        let goals="";



        profile.shortGoals.forEach(function(g){


            if(g.goal){

                goals +=

                "🎯 "+g.goal+

                " - ₹"+g.amount+

                "<br>";

            }


        });




        profile.longGoals.forEach(function(g){


            if(g.goal){

                goals +=

                "🏡 "+g.goal+

                " - ₹"+g.amount+

                "<br>";

            }


        });



        return goals || "No goals added yet.";

    }







    if(text.includes("advice") || text.includes("recommend")){


        return generateAIAdvice();


    }







    return

    "I can help you with income, expenses, savings, goals, budgeting and financial planning.";

}







// ===============================
// PROFILE EDIT SYSTEM
// ===============================


function editProfile(){


    window.location.href="setup.html";


}








// ===============================
// PREVENT DIRECT SETUP PAGE AFTER CREATION
// ===============================


function checkSetupAccess(){


    let profile =
    localStorage.getItem("finSightProfile");



    let currentPage =
    window.location.pathname;



    if(profile && currentPage.includes("setup.html")){


        alert(
        "Profile already created. Use Edit Profile to modify your data."
        );


        window.location.href="dashboard.html";


    }


}








// ===============================
// NAVIGATION
// ===============================


function openDashboard(){


    let profile =
    localStorage.getItem("finSightProfile");



    if(profile){


        window.location.href="dashboard.html";


    }

    else{


        window.location.href="setup.html";


    }


}






function openSetup(){


    window.location.href="setup.html";


}





function openFeature(page){


    window.location.href=page;


}








// ===============================
// PAGE LOAD
// ===============================


window.addEventListener("load",function(){



    displayExpenses();



    checkSetupAccess();



    loadDashboard();





    let profile =
    localStorage.getItem("finSightProfile");



    let button =
    document.getElementById("profileButton");



    if(profile && button){


        button.innerHTML=

        "✏️ Edit Financial Profile";


    }





    let aiBox =
    document.getElementById("dashboardAI");



    if(aiBox){


        aiBox.innerHTML =
        generateAIAdvice();


    }



});



}


    });


}
