// ============================================================
// FinSight AI - Main Script
// Complete Application Logic
// ============================================================


// ============================================================
// GLOBAL DATA
// ============================================================

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];


// ============================================================
// BASIC HELPERS
// ============================================================

function getProfile() {

    return JSON.parse(
        localStorage.getItem("finSightProfile")
    );

}


function saveProfileData(profile) {

    localStorage.setItem(
        "finSightProfile",
        JSON.stringify(profile)
    );

}


function formatMoney(amount) {

    amount = Number(amount) || 0;

    return "₹" + amount.toLocaleString("en-IN");

}


function getNumber(id) {

    const element = document.getElementById(id);

    if (!element) {
        return 0;
    }

    return Number(element.value) || 0;

}


function escapeHTML(text) {

    if (text === null || text === undefined) {
        return "";
    }

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ============================================================
// PROFILE CALCULATIONS
// ============================================================

function getTotalIncome(profile) {

    if (!profile) {
        return 0;
    }

    return (
        Number(profile.salary) +
        Number(profile.otherIncome)
    );

}


function getFixedCommitments(profile) {

    if (!profile) {
        return 0;
    }

    return (
        Number(profile.rent) +
        Number(profile.emi) +
        Number(profile.bills)
    );

}


function getPlannedSpending(profile) {

    if (!profile) {
        return 0;
    }

    return (
        Number(profile.food) +
        Number(profile.travel) +
        Number(profile.shopping) +
        Number(profile.otherExpense)
    );

}


function getProfileMonthlyExpense(profile) {

    if (!profile) {
        return 0;
    }

    return (
        getFixedCommitments(profile) +
        getPlannedSpending(profile)
    );

}


function getTrackedExpenseTotal() {

    return expenses.reduce(
        function(total, expense) {

            return total + Number(expense.amount || 0);

        },
        0
    );

}


function getAvailableMonthlyMoney(profile) {

    if (!profile) {
        return 0;
    }

    return (
        getTotalIncome(profile) -
        getProfileMonthlyExpense(profile)
    );

}


// ============================================================
// SAVE PROFILE
// ============================================================

function saveProfile() {

    const nameElement =
        document.getElementById("userName");

    const name =
        nameElement
            ? nameElement.value.trim()
            : "";

    const profile = {

        name: name,

        salary: getNumber("salary"),

        otherIncome: getNumber("otherIncome"),

        rent: getNumber("rent"),

        emi: getNumber("emi"),

        bills: getNumber("bills"),

        food: getNumber("food"),

        travel: getNumber("travel"),

        shopping: getNumber("shopping"),

        otherExpense: getNumber("otherExpense"),


        shortGoals: [

            {
                goal:
                    document.getElementById("shortGoal1")
                        ?.value.trim() || "",

                amount:
                    getNumber("shortAmount1")
            },

            {
                goal:
                    document.getElementById("shortGoal2")
                        ?.value.trim() || "",

                amount:
                    getNumber("shortAmount2")
            },

            {
                goal:
                    document.getElementById("shortGoal3")
                        ?.value.trim() || "",

                amount:
                    getNumber("shortAmount3")
            }

        ],


        longGoals: [

            {
                goal:
                    document.getElementById("longGoal1")
                        ?.value.trim() || "",

                amount:
                    getNumber("longAmount1")
            },

            {
                goal:
                    document.getElementById("longGoal2")
                        ?.value.trim() || "",

                amount:
                    getNumber("longAmount2")
            },

            {
                goal:
                    document.getElementById("longGoal3")
                        ?.value.trim() || "",

                amount:
                    getNumber("longAmount3")
            }

        ],


        currentSavings:
            getNumber("currentSavings"),


        savingTarget:
            getNumber("savingTarget"),


        updatedAt:
            new Date().toISOString()

    };


    if (!profile.name) {

        alert("Please enter your name.");

        return;

    }


    if (profile.salary <= 0) {

        alert("Please enter your monthly salary.");

        return;

    }


    saveProfileData(profile);


    alert(
        "✅ Financial profile saved successfully!"
    );


    window.location.href = "index.html";

}


// ============================================================
// EDIT PROFILE
// ============================================================

function editProfile() {

    const profile = getProfile();


    if (!profile) {

        window.location.href = "setup.html";

        return;

    }


    localStorage.setItem(
        "editingProfile",
        "true"
    );


    window.location.href = "setup.html";

}


// ============================================================
// LOAD PROFILE INTO SETUP PAGE
// ============================================================

function loadProfileIntoSetup() {

    const profile = getProfile();

    if (!profile) {
        return;
    }


    const fields = {

        userName: profile.name,

        salary: profile.salary,

        otherIncome: profile.otherIncome,

        rent: profile.rent,

        emi: profile.emi,

        bills: profile.bills,

        food: profile.food,

        travel: profile.travel,

        shopping: profile.shopping,

        otherExpense: profile.otherExpense,

        currentSavings: profile.currentSavings,

        savingTarget: profile.savingTarget

    };


    Object.keys(fields).forEach(function(id) {

        const element =
            document.getElementById(id);

        if (element) {

            element.value =
                fields[id] ?? "";

        }

    });


    const shortGoals =
        profile.shortGoals || [];

    shortGoals.forEach(function(goal, index) {

        const number = index + 1;

        const goalElement =
            document.getElementById(
                "shortGoal" + number
            );

        const amountElement =
            document.getElementById(
                "shortAmount" + number
            );


        if (goalElement) {

            goalElement.value =
                goal.goal || "";

        }


        if (amountElement) {

            amountElement.value =
                goal.amount || 0;

        }

    });


    const longGoals =
        profile.longGoals || [];

    longGoals.forEach(function(goal, index) {

        const number = index + 1;

        const goalElement =
            document.getElementById(
                "longGoal" + number
            );

        const amountElement =
            document.getElementById(
                "longAmount" + number
            );


        if (goalElement) {

            goalElement.value =
                goal.goal || "";

        }


        if (amountElement) {

            amountElement.value =
                goal.amount || 0;

        }

    });


    const button =
        document.querySelector(
            'button[onclick="saveProfile()"]'
        );


    if (button) {

        button.innerHTML =
            "💾 Update Financial Profile";

    }

}


// ============================================================
// EXPENSE MANAGEMENT
// ============================================================

function addExpense() {

    const nameElement =
        document.getElementById("expenseName");

    const amountElement =
        document.getElementById("expenseAmount");

    const categoryElement =
        document.getElementById("expenseCategory");


    if (
        !nameElement ||
        !amountElement ||
        !categoryElement
    ) {

        return;

    }


    const name =
        nameElement.value.trim();

    const amount =
        Number(amountElement.value);

    const category =
        categoryElement.value;


    if (!name || amount <= 0) {

        alert(
            "Please enter a valid expense name and amount."
        );

        return;

    }


    const expense = {

        id:
            Date.now(),

        name:
            name,

        amount:
            amount,

        category:
            category,

        date:
            new Date().toLocaleDateString("en-IN")

    };


    expenses.push(expense);


    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    displayExpenses();


    nameElement.value = "";

    amountElement.value = "";


    alert(
        "✅ Expense added successfully!"
    );

}


// ============================================================
// DELETE EXPENSE
// ============================================================

function deleteExpense(id) {

    expenses =
        expenses.filter(
            function(expense) {

                return expense.id !== id;

            }
        );


    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    displayExpenses();

}


// ============================================================
// DISPLAY EXPENSES
// ============================================================

function displayExpenses() {

    const table =
        document.getElementById("expenseTable");


    if (!table) {
        return;
    }


    table.innerHTML = `

        <tr>

            <th>S.No</th>

            <th>Date</th>

            <th>Name</th>

            <th>Amount</th>

            <th>Category</th>

            <th>Action</th>

        </tr>

    `;


    if (expenses.length === 0) {

        table.innerHTML += `

            <tr>

                <td colspan="6">

                    No expenses recorded yet.

                </td>

            </tr>

        `;

        return;

    }


    expenses.forEach(
        function(expense, index) {

            const row =
                table.insertRow();


            row.insertCell(0).innerHTML =
                index + 1;


            row.insertCell(1).innerHTML =
                escapeHTML(expense.date);


            row.insertCell(2).innerHTML =
                escapeHTML(expense.name);


            row.insertCell(3).innerHTML =
                formatMoney(expense.amount);


            row.insertCell(4).innerHTML =
                escapeHTML(expense.category);


            row.insertCell(5).innerHTML = `

                <button
                    onclick="deleteExpense(${expense.id})"
                >
                    Delete
                </button>

            `;

        }
    );

}


// ============================================================
// AI FINANCIAL ANALYSIS
// ============================================================

function analyzeFinancialHealth() {

    const profile = getProfile();


    if (!profile) {

        return {

            score: 0,

            health:
                "Please complete your financial profile.",

            income: 0,

            expense: 0,

            savings: 0,

            savingRate: 0,

            risk: "Unknown",

            advice: []

        };

    }


    const income =
        getTotalIncome(profile);


    const plannedExpense =
        getProfileMonthlyExpense(profile);


    const trackedExpense =
        getTrackedExpenseTotal();


    const expense =
        Math.max(
            plannedExpense,
            trackedExpense
        );


    const savings =
        income - expense;


    const savingRate =
        income > 0
            ? (savings / income) * 100
            : 0;


    let score = 100;

    let advice = [];


    // --------------------------------------------------------
    // EXPENSE RATIO
    // --------------------------------------------------------

    const expenseRatio =
        income > 0
            ? (expense / income) * 100
            : 100;


    if (expenseRatio > 90) {

        score -= 35;

        advice.push(
            "⚠️ Your monthly expenses are extremely high compared with your income."
        );

    }

    else if (expenseRatio > 75) {

        score -= 25;

        advice.push(
            "⚠️ A large portion of your income is going toward expenses."
        );

    }

    else if (expenseRatio > 60) {

        score -= 15;

        advice.push(
            "🟡 Your spending is moderate, but there is room to improve."
        );

    }

    else {

        advice.push(
            "🟢 Your overall expense level is under control."
        );

    }


    // --------------------------------------------------------
    // SAVINGS
    // --------------------------------------------------------

    if (savingRate >= 30) {

        score += 0;

        advice.push(
            "💰 Excellent saving behaviour. You are saving at least 30% of your income."
        );

    }

    else if (savingRate >= 20) {

        advice.push(
            "💰 Your savings rate is healthy. Try to gradually move toward 30%."
        );

    }

    else if (savingRate > 0) {

        score -= 10;

        advice.push(
            "💡 Your savings are positive, but increasing your monthly savings would strengthen your financial position."
        );

    }

    else {

        score -= 25;

        advice.push(
            "🚨 Your current expenses are equal to or greater than your income."
        );

    }


    // --------------------------------------------------------
    // SHOPPING
    // --------------------------------------------------------

    if (
        profile.shopping >
        income * 0.15
    ) {

        score -= 8;

        advice.push(
            "🛒 Shopping is taking a relatively large share of your income. Consider setting a monthly shopping limit."
        );

    }


    // --------------------------------------------------------
    // EMI
    // --------------------------------------------------------

    if (
        profile.emi >
        income * 0.30
    ) {

        score -= 12;

        advice.push(
            "🏦 Your EMI burden is high. Avoid taking on unnecessary new loans."
        );

    }


    // --------------------------------------------------------
    // RENT
    // --------------------------------------------------------

    if (
        profile.rent >
        income * 0.30
    ) {

        score -= 8;

        advice.push(
            "🏠 Your rent is taking a significant portion of your income."
        );

    }


    // --------------------------------------------------------
    // SAVING TARGET
    // --------------------------------------------------------

    if (
        profile.savingTarget > 0 &&
        savings >= profile.savingTarget
    ) {

        advice.push(
            "🎯 You are currently meeting your monthly savings target."
        );

    }

    else if (
        profile.savingTarget > 0
    ) {

        const shortage =
            profile.savingTarget -
            Math.max(savings, 0);


        advice.push(
            "🎯 You are approximately " +
            formatMoney(shortage) +
            " away from your monthly savings target."
        );

    }


    // --------------------------------------------------------
    // GOALS
    // --------------------------------------------------------

    const allGoals =
        [
            ...(profile.shortGoals || []),
            ...(profile.longGoals || [])
        ].filter(
            function(goal) {

                return (
                    goal.goal &&
                    Number(goal.amount) > 0
                );

            }
        );


    if (allGoals.length > 0) {

        const totalGoalAmount =
            allGoals.reduce(
                function(total, goal) {

                    return (
                        total +
                        Number(goal.amount)
                    );

                },
                0
            );


        advice.push(
            "🎯 You have " +
            allGoals.length +
            " active financial goal" +
            (allGoals.length > 1 ? "s" : "") +
            " with a combined target of " +
            formatMoney(totalGoalAmount) +
            "."
        );

    }


    // Keep score between 0 and 100.

    score =
        Math.max(
            0,
            Math.min(
                100,
                score
            )
        );


    let health;


    if (score >= 85) {

        health =
            "Excellent financial health";

    }

    else if (score >= 70) {

        health =
            "Good financial health";

    }

    else if (score >= 50) {

        health =
            "Needs improvement";

    }

    else {

        health =
            "High financial risk";

    }


    let risk;


    if (expenseRatio > 90) {

        risk = "Very High";

    }

    else if (expenseRatio > 75) {

        risk = "High";

    }

    else if (expenseRatio > 60) {

        risk = "Moderate";

    }

    else {

        risk = "Low";

    }


    return {

        score:
            score,

        health:
            health,

        income:
            income,

        expense:
            expense,

        savings:
            savings,

        savingRate:
            savingRate,

        risk:
            risk,

        advice:
            advice

    };

}


// ============================================================
// GENERATE AI ADVICE
// ============================================================

function generateAIAdvice() {

    const analysis =
        analyzeFinancialHealth();


    if (
        !getProfile()
    ) {

        return "Please complete your financial profile first.";

    }


    return analysis.advice.join("<br><br>");

}


// ============================================================
// PERSONALIZED AI RECOMMENDATIONS
// ============================================================

function getPersonalizedRecommendations() {

    const profile = getProfile();


    if (!profile) {

        return [
            "Please complete your financial profile to receive personalized recommendations."
        ];

    }


    const analysis =
        analyzeFinancialHealth();


    const recommendations = [];


    const income =
        analysis.income;


    const savings =
        analysis.savings;


    // --------------------------------------------------------
    // SAVINGS RECOMMENDATION
    // --------------------------------------------------------

    if (income > 0) {

        const idealSavings =
            income * 0.20;


        if (savings < idealSavings) {

            recommendations.push(
                "💰 Try to save at least " +
                formatMoney(idealSavings) +
                " per month, which is around 20% of your income."
            );

        }

        else {

            recommendations.push(
                "💚 Your current savings are on a healthy track. Try to maintain this consistency."
            );

        }

    }


    // --------------------------------------------------------
    // SHOPPING
    // --------------------------------------------------------

    if (
        profile.shopping >
        income * 0.10
    ) {

        recommendations.push(
            "🛒 Your shopping budget is relatively high. Consider reducing it and redirecting the difference toward your savings or goals."
        );

    }


    // --------------------------------------------------------
    // FOOD
    // --------------------------------------------------------

    if (
        profile.food >
        income * 0.15
    ) {

        recommendations.push(
            "🍱 Food spending is taking a noticeable share of your income. Planning meals and limiting unnecessary food purchases could help."
        );

    }


    // --------------------------------------------------------
    // TRAVEL
    // --------------------------------------------------------

    if (
        profile.travel >
        income * 0.10
    ) {

        recommendations.push(
            "🚗 Your travel spending is relatively high. Look for cheaper transport options or set a fixed monthly travel budget."
        );

    }


    // --------------------------------------------------------
    // EMI
    // --------------------------------------------------------

    if (
        profile.emi >
        income * 0.30
    ) {

        recommendations.push(
            "🏦 Your EMI is above 30% of income. Avoid additional debt until your current loan burden becomes more manageable."
        );

    }


    // --------------------------------------------------------
    // GOALS
    // --------------------------------------------------------

    const goals =
        [
            ...(profile.shortGoals || []),
            ...(profile.longGoals || [])
        ].filter(
            function(goal) {

                return (
                    goal.goal &&
                    Number(goal.amount) > 0
                );

            }
        );


    if (goals.length > 0) {

        const firstGoal =
            goals[0];


        if (savings > 0) {

            recommendations.push(
                "🎯 Based on your current surplus, prioritize your goal \"" +
                escapeHTML(firstGoal.goal) +
                "\" before spreading your savings across too many goals."
            );

        }

    }


    // --------------------------------------------------------
    // SAVING TARGET
    // --------------------------------------------------------

    if (
        profile.savingTarget > 0
    ) {

        if (
            savings >=
            profile.savingTarget
        ) {

            recommendations.push(
                "🎯 You are currently able to meet your monthly savings target of " +
                formatMoney(profile.savingTarget) +
                ". Keep the habit consistent."
            );

        }

        else {

            recommendations.push(
                "📌 Your planned savings target is " +
                formatMoney(profile.savingTarget) +
                ". Reduce discretionary spending if you want to reach this target."
            );

        }

    }


    // --------------------------------------------------------
    // EMERGENCY SAVINGS
    // --------------------------------------------------------

    if (
        profile.currentSavings <
        getProfileMonthlyExpense(profile) * 3
    ) {

        recommendations.push(
            "🛡️ Your current savings may not cover three months of planned expenses. Building an emergency fund should be one of your priorities."
        );

    }


    // --------------------------------------------------------
    // GENERAL POSITIVE MESSAGE
    // --------------------------------------------------------

    if (
        recommendations.length === 0
    ) {

        recommendations.push(
            "✅ Your financial profile currently looks balanced. Continue tracking expenses and reviewing your goals every month."
        );

    }


    return recommendations;

}


// ============================================================
// AI CHAT
// ============================================================

function sendMessage() {

    const input =
        document.getElementById("aiInput");

    const chat =
        document.getElementById("chatMessages");


    if (
        !input ||
        !chat ||
        input.value.trim() === ""
    ) {

        return;

    }


    const message =
        input.value.trim();


    const lowerMessage =
        message.toLowerCase();


    const profile =
        getProfile();


    if (!profile) {

        chat.innerHTML += `

            <p>
                👤 ${escapeHTML(message)}
            </p>

            <p>
                🤖 Please complete your financial profile first so I can give you personalized answers.
            </p>

        `;

        input.value = "";

        return;

    }


    chat.innerHTML += `

        <p>
            👤 ${escapeHTML(message)}
        </p>

    `;


    let reply = "";


    const analysis =
        analyzeFinancialHealth();


    // --------------------------------------------------------
    // SALARY
    // --------------------------------------------------------

    if (
        lowerMessage.includes("salary") ||
        lowerMessage.includes("income")
    ) {

        reply =
            "💰 Your total monthly income is " +
            formatMoney(analysis.income) +
            ".";

    }


    // --------------------------------------------------------
    // EXPENSE
    // --------------------------------------------------------

    else if (
        lowerMessage.includes("expense") ||
        lowerMessage.includes("spending")
    ) {

        reply =
            "💸 Your estimated monthly expenses are " +
            formatMoney(analysis.expense) +
            ". Your tracked expenses currently total " +
            formatMoney(getTrackedExpenseTotal()) +
            ".";

    }


    // --------------------------------------------------------
    // SAVINGS
    // --------------------------------------------------------

    else if (
        lowerMessage.includes("saving") ||
        lowerMessage.includes("save")
    ) {

        reply =
            "🏦 Your estimated monthly surplus is " +
            formatMoney(Math.max(analysis.savings, 0)) +
            ". Your monthly saving target is " +
            formatMoney(profile.savingTarget) +
            ".";

    }


    // --------------------------------------------------------
    // GOALS
    // --------------------------------------------------------

    else if (
        lowerMessage.includes("goal")
    ) {

        const goals =
            [
                ...(profile.shortGoals || []),
                ...(profile.longGoals || [])
            ].filter(
                function(goal) {

                    return (
                        goal.goal &&
                        Number(goal.amount) > 0
                    );

                }
            );


        if (goals.length === 0) {

            reply =
                "🎯 You haven't added any financial goals yet.";

        }

        else {

            reply =
                "🎯 Your current goals:<br><br>" +
                goals.map(
                    function(goal) {

                        return (
                            "• " +
                            escapeHTML(goal.goal) +
                            " — " +
                            formatMoney(goal.amount)
                        );

                    }
                ).join("<br>");

        }

    }


    // --------------------------------------------------------
    // SCORE
    // --------------------------------------------------------

    else if (
        lowerMessage.includes("score") ||
        lowerMessage.includes("health")
    ) {

        reply =
            "❤️ Your current financial health score is " +
            analysis.score +
            "/100 — " +
            analysis.health +
            ".";

    }


    // --------------------------------------------------------
    // BUDGET
    // --------------------------------------------------------

    else if (
        lowerMessage.includes("budget")
    ) {

        const safeLimit =
            Math.max(
                0,
                analysis.income * 0.60 -
                getFixedCommitments(profile)
            );


        reply =
            "📊 Based on your profile, after fixed commitments, try to keep discretionary spending around " +
            formatMoney(safeLimit) +
            " or below.";

    }


    // --------------------------------------------------------
    // RECOMMENDATION
    // --------------------------------------------------------

    else if (
        lowerMessage.includes("recommend") ||
        lowerMessage.includes("advice") ||
        lowerMessage.includes("suggest") ||
        lowerMessage.includes("what should")
    ) {

        reply =
            "🧠 Here are my recommendations based on your data:<br><br>" +
            getPersonalizedRecommendations()
                .slice(0, 4)
                .join("<br><br>");

    }


    // --------------------------------------------------------
    // HELP
    // --------------------------------------------------------

    else if (
        lowerMessage.includes("help") ||
        lowerMessage.includes("what can")
    ) {

        reply =
            "🤖 I can analyse your salary, expenses, savings, goals, budget, financial health and spending behaviour. Try asking:<br><br>" +
            "• How much do I earn?<br>" +
            "• How much am I spending?<br>" +
            "• How much can I save?<br>" +
            "• What are my goals?<br>" +
            "• How is my financial health?<br>" +
            "• Give me recommendations.";

    }


    // --------------------------------------------------------
    // DEFAULT
    // --------------------------------------------------------

    else {

        reply =
            "🤖 Based on your current profile, your financial health score is " +
            analysis.score +
            "/100. " +
            "I can analyse your income, spending, savings and goals. Ask me for a recommendation if you'd like personalized advice.";

    }


    chat.innerHTML += `

        <p>
            🤖 ${reply}
        </p>

    `;


    chat.scrollTop =
        chat.scrollHeight;


    input.value = "";

}


// ============================================================
// AI CHAT POPUP
// ============================================================

function openAIChat() {

    const box =
        document.getElementById("aiChatBox");


    if (!box) {
        return;
    }


    if (
        box.style.display === "block"
    ) {

        box.style.display = "none";

    }

    else {

        box.style.display = "block";

        const input =
            document.getElementById("aiInput");

        if (input) {

            input.focus();

        }

    }

}


// ============================================================
// BUDGET CALCULATOR
// ============================================================

function calculateBudget() {

    const salary =
        getNumber("salary");


    const rent =
        getNumber("rent");


    const food =
        getNumber("food");


    const travel =
        getNumber("travel");


    const emi =
        getNumber("emi");


    const other =
        getNumber("other");


    const commitments =
        rent +
        food +
        travel +
        emi +
        other;


    const remaining =
        salary -
        commitments;


    const suggestedSavings =
        Math.max(
            0,
            salary * 0.20
        );


    const commitmentsElement =
        document.getElementById("commitments");


    const remainingElement =
        document.getElementById("remaining");


    const savingPlanElement =
        document.getElementById("savingPlan");


    if (commitmentsElement) {

        commitmentsElement.innerHTML =
            formatMoney(commitments);

    }


    if (remainingElement) {

        remainingElement.innerHTML =
            formatMoney(remaining);

    }


    if (savingPlanElement) {

        savingPlanElement.innerHTML =
            formatMoney(suggestedSavings);

    }

}


// ============================================================
// NAVIGATION
// ============================================================

function openDashboard() {

    const profile =
        localStorage.getItem(
            "finSightProfile"
        );


    if (profile) {

        // dashboard.html is not required.
        // The main financial page is index.html.

        window.location.href =
            "index.html";

    }

    else {

        alert(
            "Please complete your financial profile first."
        );

        window.location.href =
            "setup.html";

    }

}


function openSetup() {

    window.location.href =
        "setup.html";

}


function openFeature(page) {

    window.location.href =
        page;

}


// ============================================================
// HOME PAGE DATA
// ============================================================

function loadHomeData() {

    const profile =
        getProfile();


    if (!profile) {
        return;
    }


    const income =
        getTotalIncome(profile);


    const expense =
        getProfileMonthlyExpense(profile);


    const trackedExpense =
        getTrackedExpenseTotal();


    const actualExpense =
        Math.max(
            expense,
            trackedExpense
        );


    const savings =
        income -
        actualExpense;


    const analysis =
        analyzeFinancialHealth();


    const salaryElement =
        document.getElementById(
            "homeSalary"
        );


    const savingsElement =
        document.getElementById(
            "homeSavings"
        );


    if (salaryElement) {

        salaryElement.innerHTML =
            formatMoney(income);

    }


    if (savingsElement) {

        savingsElement.innerHTML =
            formatMoney(
                Math.max(savings, 0)
            );

    }


    // Update static overview cards
    // when matching IDs are added later.

    const homeHealth =
        document.getElementById(
            "homeHealth"
        );


    if (homeHealth) {

        homeHealth.innerHTML =
            analysis.score + "/100";

    }


    const homeExpense =
        document.getElementById(
            "homeExpense"
        );


    if (homeExpense) {

        homeExpense.innerHTML =
            formatMoney(actualExpense);

    }


    const safeLimit =
        document.getElementById(
            "safeSpendingLimit"
        );


    if (safeLimit) {

        safeLimit.innerHTML =
            formatMoney(
                Math.max(
                    0,
                    income * 0.60
                )
            );

    }


    const aiCoach =
        document.getElementById(
            "homeAIAdvice"
        );


    if (aiCoach) {

        aiCoach.innerHTML =
            getPersonalizedRecommendations()
                .slice(0, 3)
                .join("<br><br>");

    }

}


// ============================================================
// GOALS PAGE
// ============================================================

function loadGoalsPage() {

    const profile =
        getProfile();


    const shortContainer =
        document.getElementById(
            "shortGoalsContainer"
        );


    const longContainer =
        document.getElementById(
            "longGoalsContainer"
        );


    const welcome =
        document.getElementById(
            "goalWelcome"
        );


    const goalAI =
        document.getElementById(
            "goalAI"
        );


    if (!profile) {

        if (goalAI) {

            goalAI.innerHTML =
                "Please complete your financial profile first.";

        }

        return;

    }


    if (welcome) {

        welcome.innerHTML =
            "Welcome " +
            escapeHTML(profile.name) +
            " 👋 Track your financial dreams";

    }


    if (shortContainer) {

        shortContainer.innerHTML = "";


        (profile.shortGoals || []).forEach(
            function(goal, index) {

                if (
                    !goal.goal &&
                    Number(goal.amount) <= 0
                ) {

                    return;

                }


                shortContainer.innerHTML += `

                    <div class="card">

                        <h3>
                            🎯 ${escapeHTML(goal.goal)}
                        </h3>

                        <p>
                            Target Amount:
                            ${formatMoney(goal.amount)}
                        </p>

                        <p>
                            Current Savings:
                            ${formatMoney(profile.currentSavings)}
                        </p>

                    </div>

                `;

            }
        );

    }


    if (longContainer) {

        longContainer.innerHTML = "";


        (profile.longGoals || []).forEach(
            function(goal, index) {

                if (
                    !goal.goal &&
                    Number(goal.amount) <= 0
                ) {

                    return;

                }


                longContainer.innerHTML += `

                    <div class="card">

                        <h3>
                            🏆 ${escapeHTML(goal.goal)}
                        </h3>

                        <p>
                            Target Amount:
                            ${formatMoney(goal.amount)}
                        </p>

                        <p>
                            Current Savings:
                            ${formatMoney(profile.currentSavings)}
                        </p>

                    </div>

                `;

            }
        );

    }


    if (goalAI) {

        const recommendations =
            getPersonalizedRecommendations();


        goalAI.innerHTML =
            recommendations
                .slice(0, 4)
                .join("<br><br>");

    }

}


// ============================================================
// AI INSIGHTS PAGE
// ============================================================

function loadAIInsightsPage() {

    const profile =
        getProfile();


    if (!profile) {

        const aiAdvice =
            document.getElementById(
                "aiAdvice"
            );


        if (aiAdvice) {

            aiAdvice.innerHTML =
                "Please complete your financial profile first.";

        }

        return;

    }


    const analysis =
        analyzeFinancialHealth();


    const welcome =
        document.getElementById(
            "welcomeAI"
        );


    if (welcome) {

        welcome.innerHTML =
            "Welcome " +
            escapeHTML(profile.name) +
            " 👋";

    }


    const score =
        document.getElementById(
            "score"
        );


    if (score) {

        score.innerHTML =
            analysis.score +
            "/100";

    }


    const healthText =
        document.getElementById(
            "healthText"
        );


    if (healthText) {

        healthText.innerHTML =
            analysis.health +
            " based on your current financial data.";

    }


    const savingAdvice =
        document.getElementById(
            "savingAdvice"
        );


    if (savingAdvice) {

        savingAdvice.innerHTML =
            "Your estimated monthly surplus is " +
            formatMoney(
                Math.max(
                    analysis.savings,
                    0
                )
            ) +
            ". Your target is " +
            formatMoney(
                profile.savingTarget
            ) +
            ".";

    }


    const riskAdvice =
        document.getElementById(
            "riskAdvice"
        );


    if (riskAdvice) {

        riskAdvice.innerHTML =
            analysis.risk +
            " spending risk.";

    }


    const aiAdvice =
        document.getElementById(
            "aiAdvice"
        );


    if (aiAdvice) {

        aiAdvice.innerHTML =
            getPersonalizedRecommendations()
                .join("<br><br>");

    }


    const incomeReport =
        document.getElementById(
            "incomeReport"
        );


    const expenseReport =
        document.getElementById(
            "expenseReport"
        );


    const savingReport =
        document.getElementById(
            "savingReport"
        );


    const actionReport =
        document.getElementById(
            "actionReport"
        );


    if (incomeReport) {

        incomeReport.innerHTML =
            "Total Income: " +
            formatMoney(
                analysis.income
            );

    }


    if (expenseReport) {

        expenseReport.innerHTML =
            "Total Expenses: " +
            formatMoney(
                analysis.expense
            );

    }


    if (savingReport) {

        savingReport.innerHTML =
            "Potential Savings: " +
            formatMoney(
                Math.max(
                    analysis.savings,
                    0
                )
            );

    }


    if (actionReport) {

        actionReport.innerHTML =
            "Next Action: " +
            getPersonalizedRecommendations()[0];

    }

}


// ============================================================
// EXPENSE TRACKING PAGE
// ============================================================

function loadExpenseTrackingPage() {

    const totalTransactions =
        document.getElementById(
            "totalTransactions"
        );


    const highestExpense =
        document.getElementById(
            "highestExpense"
        );


    const dailyAverage =
        document.getElementById(
            "dailyAverage"
        );


    if (totalTransactions) {

        totalTransactions.innerHTML =
            expenses.length;

    }


    if (highestExpense) {

        if (expenses.length === 0) {

            highestExpense.innerHTML =
                "₹0";

        }

        else {

            const highest =
                expenses.reduce(
                    function(max, expense) {

                        return Number(expense.amount) >
                            Number(max.amount)
                            ? expense
                            : max;

                    }
                );


            highestExpense.innerHTML =
                formatMoney(
                    highest.amount
                );

        }

    }


    if (dailyAverage) {

        const total =
            getTrackedExpenseTotal();


        dailyAverage.innerHTML =
            formatMoney(
                total / 30
            );

    }


    displayExpenses();

}


// ============================================================
// ANALYTICS DATA
// ============================================================

function getCategoryTotals() {

    const categories = {};


    expenses.forEach(
        function(expense) {

            const category =
                expense.category ||
                "Other";


            if (!categories[category]) {

                categories[category] =
                    0;

            }


            categories[category] +=
                Number(expense.amount) || 0;

        }
    );


    return categories;

}


// ============================================================
// GLOBAL PAGE INITIALIZATION
// ============================================================

function initializePage() {

    // Setup page

    if (
        document.getElementById("userName")
    ) {

        loadProfileIntoSetup();

    }


    // Home / index

    loadHomeData();


    // Goals

    if (
        document.getElementById(
            "shortGoalsContainer"
        ) ||
        document.getElementById(
            "longGoalsContainer"
        )
    ) {

        loadGoalsPage();

    }


    // AI Insights

    if (
        document.getElementById(
            "aiAdvice"
        ) ||
        document.getElementById(
            "score"
        )
    ) {

        loadAIInsightsPage();

    }


    // Expense tracking

    if (
        document.getElementById(
            "totalTransactions"
        )
    ) {

        loadExpenseTrackingPage();

    }


    // Normal expense table

    displayExpenses();


    // Profile button

    const profileButton =
        document.getElementById(
            "profileButton"
        );


    if (
        profileButton &&
        getProfile()
    ) {

        profileButton.innerHTML =
            "✏️ Update Financial Profile";

    }

}


// ============================================================
// ENTER KEY FOR AI CHAT
// ============================================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            document.activeElement &&
            document.activeElement.id ===
                "aiInput"
        ) {

            sendMessage();

        }

    }
);


// ============================================================
// START APPLICATION
// ============================================================

window.addEventListener(
    "load",
    initializePage
);
