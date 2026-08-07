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


    });


}
