// ============================================================
// FinSight AI - Master JavaScript
// ============================================================


// ============================================================
// GLOBAL DATA
// ============================================================

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];


// ============================================================
// BASIC HELPERS
// ============================================================

function getProfile() {
    return JSON.parse(localStorage.getItem("finSightProfile"));
}


function saveProfileData(profile) {
    localStorage.setItem(
        "finSightProfile",
        JSON.stringify(profile)
    );
}


function formatMoney(amount) {
    amount = Number(amount) || 0;

    return "₹" + amount.toLocaleString("en-IN", {
        maximumFractionDigits: 0
    });
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
        Number(profile.salary || 0) +
        Number(profile.otherIncome || 0)
    );
}


function getFixedCommitments(profile) {

    if (!profile) {
        return 0;
    }

    return (
        Number(profile.rent || 0) +
        Number(profile.emi || 0) +
        Number(profile.bills || 0)
    );
}


function getPlannedSpending(profile) {

    if (!profile) {
        return 0;
    }

    return (
        Number(profile.food || 0) +
        Number(profile.travel || 0) +
        Number(profile.shopping || 0) +
        Number(profile.otherExpense || 0)
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
        (total, expense) => {
            return total + Number(expense.amount || 0);
        },
        0
    );
}


// ============================================================
// PROFILE SAVE
// ============================================================

function saveProfile() {

    const name =
        document.getElementById("userName")
            ?.value.trim() || "";


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
        "✅ Your financial profile has been saved successfully!"
    );


    window.location.href = "index.html";
}


// ============================================================
// LOAD PROFILE INTO SETUP
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


    Object.keys(fields).forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.value =
                fields[id] ?? "";
        }

    });


    const shortGoals =
        profile.shortGoals || [];


    shortGoals.forEach((goal, index) => {

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
                goal.amount || "";
        }

    });


    const longGoals =
        profile.longGoals || [];


    longGoals.forEach((goal, index) => {

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
                goal.amount || "";
        }

    });


    const saveButton =
        document.querySelector(
            'button[onclick="saveProfile()"]'
        );


    if (saveButton) {

        saveButton.innerHTML =
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

        id: Date.now(),

        name: name,

        amount: amount,

        category: category,

        date:
            new Date().toLocaleDateString("en-IN")

    };


    expenses.push(expense);


    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    nameElement.value = "";

    amountElement.value = "";


    displayExpenses();


    loadHomeData();

    loadExpenseTrackingPage();


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
            expense =>
                expense.id !== id
        );


    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );


    displayExpenses();

    loadHomeData();

    loadExpenseTrackingPage();

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
        (expense, index) => {

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
// FINANCIAL HEALTH
// ============================================================

function analyzeFinancialHealth() {

    const profile = getProfile();


    if (!profile) {

        return {

            score: 0,

            health:
                "Profile not completed",

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


    const expenseRatio =
        income > 0
            ? (expense / income) * 100
            : 100;


    let score = 100;


    const advice = [];


    // Expense ratio

    if (expenseRatio > 90) {

        score -= 35;

        advice.push(
            "🚨 Your expenses are extremely high compared with your income."
        );

    }

    else if (expenseRatio > 75) {

        score -= 25;

        advice.push(
            "⚠️ A large portion of your income is being spent."
        );

    }

    else if (expenseRatio > 60) {

        score -= 15;

        advice.push(
            "🟡 Your spending is moderate, but there is room for improvement."
        );

    }

    else {

        advice.push(
            "🟢 Your overall spending is under control."
        );

    }


    // Savings

    if (savingRate >= 30) {

        advice.push(
            "💰 Excellent! You are saving at least 30% of your income."
        );

    }

    else if (savingRate >= 20) {

        advice.push(
            "💰 Your savings rate is healthy. Try to move gradually toward 30%."
        );

    }

    else if (savingRate > 0) {

        score -= 10;

        advice.push(
            "💡 You have positive savings, but increasing them would strengthen your finances."
        );

    }

    else {

        score -= 25;

        advice.push(
            "🚨 Your expenses are currently equal to or greater than your income."
        );

    }


    // EMI

    if (
        profile.emi >
        income * 0.30
    ) {

        score -= 12;

        advice.push(
            "🏦 Your EMI is high compared with your income. Avoid unnecessary new loans."
        );

    }


    // Rent

    if (
        profile.rent >
        income * 0.30
    ) {

        score -= 8;

        advice.push(
            "🏠 Your rent takes a significant portion of your income."
        );

    }


    // Shopping

    if (
        profile.shopping >
        income * 0.15
    ) {

        score -= 8;

        advice.push(
            "🛒 Shopping expenses are relatively high. Consider setting a fixed shopping limit."
        );

    }


    // Savings target

    if (
        profile.savingTarget > 0
    ) {

        if (
            savings >=
            profile.savingTarget
        ) {

            advice.push(
                "🎯 You are currently meeting your monthly savings target."
            );

        }

        else {

            const shortage =
                profile.savingTarget -
                Math.max(savings, 0);


            advice.push(
                "🎯 You need approximately " +
                formatMoney(shortage) +
                " more to reach your monthly savings target."
            );

        }

    }


    score =
        Math.max(
            0,
            Math.min(
                100,
                score
            )
        );


    let health = "";


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


    let risk = "";


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

        score,

        health,

        income,

        expense,

        savings,

        savingRate,

        risk,

        advice

    };

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


    // Savings

    if (income > 0) {

        const idealSavings =
            income * 0.20;


        if (savings < idealSavings) {

            recommendations.push(
                "💰 Aim to save around " +
                formatMoney(idealSavings) +
                " per month, approximately 20% of your income."
            );

        }

        else {

            recommendations.push(
                "💚 Your savings are on a healthy track. Maintain this consistency."
            );

        }

    }


    // Shopping

    if (
        profile.shopping >
        income * 0.10
    ) {

        recommendations.push(
            "🛒 Your shopping budget is relatively high. Consider redirecting some of it toward savings."
        );

    }


    // Food

    if (
        profile.food >
        income * 0.15
    ) {

        recommendations.push(
            "🍱 Food spending is taking a noticeable share of your income. Planning meals may help reduce unnecessary spending."
        );

    }


    // Travel

    if (
        profile.travel >
        income * 0.10
    ) {

        recommendations.push(
            "🚗 Your travel budget is relatively high. Consider cheaper transportation options where possible."
        );

    }


    // EMI

    if (
        profile.emi >
        income * 0.30
    ) {

        recommendations.push(
            "🏦 Your EMI is above 30% of income. Avoid taking on additional debt if possible."
        );

    }


    // Goals

    const goals = [

        ...(profile.shortGoals || []),

        ...(profile.longGoals || [])

    ].filter(
        goal =>
            goal.goal &&
            Number(goal.amount) > 0
    );


    if (goals.length > 0) {

        recommendations.push(
            "🎯 Prioritize one financial goal at a time instead of spreading your savings too thin."
        );

    }


    // Emergency fund

    const monthlyExpense =
        getProfileMonthlyExpense(profile);


    if (
        profile.currentSavings <
        monthlyExpense * 3
    ) {

        recommendations.push(
            "🛡️ Consider building an emergency fund covering approximately three months of expenses."
        );

    }


    if (
        recommendations.length === 0
    ) {

        recommendations.push(
            "✅ Your financial profile currently looks balanced. Continue tracking expenses and reviewing your goals regularly."
        );

    }


    return recommendations;

}


// ============================================================
// HOME PAGE
// ============================================================

function loadHomeData() {

    const profile =
        getProfile();


    if (!profile) {
        return;
    }


    const analysis =
        analyzeFinancialHealth();


    const salaryElement =
        document.getElementById(
            "homeSalary"
        );


    if (salaryElement) {

        salaryElement.innerHTML =
            formatMoney(
                analysis.income
            );

    }


    const savingsElement =
        document.getElementById(
            "homeSavings"
        );


    if (savingsElement) {

        savingsElement.innerHTML =
            formatMoney(
                Math.max(
                    analysis.savings,
                    0
                )
            );

    }


    const expenseElement =
        document.getElementById(
            "homeExpense"
        );


    if (expenseElement) {

        expenseElement.innerHTML =
            formatMoney(
                analysis.expense
            );

    }


    const healthElement =
        document.getElementById(
            "homeHealth"
        );


    if (healthElement) {

        healthElement.innerHTML =
            analysis.score +
            "/100";

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
                    analysis.income * 0.60
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


    const currentSavings =
        Number(profile.currentSavings || 0);


    function createGoalCard(goal, icon) {

        if (
            !goal.goal &&
            Number(goal.amount) <= 0
        ) {

            return "";

        }


        const target =
            Number(goal.amount || 0);


        const progress =
            target > 0
                ? Math.min(
                    100,
                    (currentSavings / target) * 100
                )
                : 0;


        return `

            <div class="card">

                <h3>
                    ${icon} ${escapeHTML(goal.goal)}
                </h3>

                <p>
                    Target:
                    ${formatMoney(target)}
                </p>

                <p>
                    Current Savings:
                    ${formatMoney(currentSavings)}
                </p>

                <p>
                    Progress:
                    ${progress.toFixed(0)}%
                </p>

            </div>

        `;

    }


    if (shortContainer) {

        shortContainer.innerHTML =
            (profile.shortGoals || [])
                .map(goal =>
                    createGoalCard(goal, "🎯")
                )
                .join("");

    }


    if (longContainer) {

        longContainer.innerHTML =
            (profile.longGoals || [])
                .map(goal =>
                    createGoalCard(goal, "🏆")
                )
                .join("");

    }


    if (goalAI) {

        goalAI.innerHTML =
            getPersonalizedRecommendations()
                .slice(0, 4)
                .join("<br><br>");

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
                    (max, expense) =>
                        Number(expense.amount) >
                        Number(max.amount)
                            ? expense
                            : max
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
        document.getElementById(
            "commitments"
        );


    const remainingElement =
        document.getElementById(
            "remaining"
        );


    const savingElement =
        document.getElementById(
            "savingPlan"
        );


    if (commitmentsElement) {

        commitmentsElement.innerHTML =
            formatMoney(commitments);

    }


    if (remainingElement) {

        remainingElement.innerHTML =
            formatMoney(remaining);

    }


    if (savingElement) {

        savingElement.innerHTML =
            formatMoney(
                suggestedSavings
            );

    }

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
        !input.value.trim()
    ) {

        return;

    }


    const message =
        input.value.trim();


    const lower =
        message.toLowerCase();


    const profile =
        getProfile();


    chat.innerHTML += `

        <p>
            👤 ${escapeHTML(message)}
        </p>

    `;


    if (!profile) {

        chat.innerHTML += `

            <p>
                🤖 Please complete your financial profile first so I can provide personalized financial insights.
            </p>

        `;


        input.value = "";

        return;

    }


    const analysis =
        analyzeFinancialHealth();


    let reply = "";


    if (
        lower.includes("salary") ||
        lower.includes("income")
    ) {

        reply =
            "💰 Your total monthly income is " +
            formatMoney(
                analysis.income
            ) +
            ".";

    }


    else if (
        lower.includes("expense") ||
        lower.includes("spending")
    ) {

        reply =
            "💸 Your estimated monthly expenses are " +
            formatMoney(
                analysis.expense
            ) +
            ". Your tracked expenses total " +
            formatMoney(
                getTrackedExpenseTotal()
            ) +
            ".";

    }


    else if (
        lower.includes("saving") ||
        lower.includes("save")
    ) {

        reply =
            "🏦 Your estimated monthly surplus is " +
            formatMoney(
                Math.max(
                    analysis.savings,
                    0
                )
            ) +
            ". Your monthly savings target is " +
            formatMoney(
                profile.savingTarget
            ) +
            ".";

    }


    else if (
        lower.includes("goal")
    ) {

        const goals = [

            ...(profile.shortGoals || []),

            ...(profile.longGoals || [])

        ].filter(
            goal =>
                goal.goal &&
                Number(goal.amount) > 0
        );


        if (!goals.length) {

            reply =
                "🎯 You haven't added any financial goals yet.";

        }

        else {

            reply =
                "🎯 Your financial goals:<br><br>" +

                goals
                    .map(
                        goal =>
                            "• " +
                            escapeHTML(goal.goal) +
                            " — " +
                            formatMoney(
                                goal.amount
                            )
                    )
                    .join("<br>");

        }

    }


    else if (
        lower.includes("score") ||
        lower.includes("health")
    ) {

        reply =
            "❤️ Your financial health score is " +
            analysis.score +
            "/100 — " +
            analysis.health +
            ".";

    }


    else if (
        lower.includes("budget")
    ) {

        const safeLimit =
            Math.max(
                0,
                analysis.income * 0.60 -
                getFixedCommitments(profile)
            );


        reply =
            "📊 Based on your profile, try to keep discretionary spending around " +
            formatMoney(safeLimit) +
            " or below.";

    }


    else if (
        lower.includes("recommend") ||
        lower.includes("advice") ||
        lower.includes("suggest")
    ) {

        reply =
            "🧠 Here are my recommendations:<br><br>" +

            getPersonalizedRecommendations()
                .slice(0, 4)
                .join("<br><br>");

    }


    else if (
        lower.includes("help") ||
        lower.includes("what can")
    ) {

        reply =
            "🤖 I can help you analyse:<br><br>" +

            "• Income<br>" +
            "• Expenses<br>" +
            "• Savings<br>" +
            "• Financial goals<br>" +
            "• Budget<br>" +
            "• Financial health<br>" +
            "• Spending behaviour<br><br>" +

            "Try asking: <br>" +

            "How much can I save?";

    }


    else {

        reply =
            "🤖 Your current financial health score is " +
            analysis.score +
            "/100. Ask me about your income, expenses, savings, goals, budget or recommendations.";

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
        document.getElementById(
            "aiChatBox"
        );


    if (!box) {
        return;
    }


    if (
        box.style.display === "block"
    ) {

        box.style.display =
            "none";

    }

    else {

        box.style.display =
            "block";


        document.getElementById(
            "aiInput"
        )?.focus();

    }

}


// ============================================================
// NAVIGATION
// ============================================================

function openProfile() {

    window.location.href =
        "setup.html";

}


function openDashboard() {

    if (getProfile()) {

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
// PAGE INITIALIZATION
// ============================================================

function initializePage() {

    // Setup

    if (
        document.getElementById(
            "userName"
        )
    ) {

        loadProfileIntoSetup();

    }


    // Home

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


    // Expense Tracking

    if (
        document.getElementById(
            "totalTransactions"
        )
    ) {

        loadExpenseTrackingPage();

    }


    // Expense table

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
            document.activeElement?.id ===
            "aiInput"
        ) {

            sendMessage();

        }

    }
);


// ============================================================
// START
// ============================================================

window.addEventListener(
    "load",
    initializePage
);
