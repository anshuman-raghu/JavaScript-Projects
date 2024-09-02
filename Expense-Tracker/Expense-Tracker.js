document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expenseForm");
    const ExpenseNameInput = document.getElementById("ExpenseName");
    const AmountInput = document.getElementById("Amount");
    const expenseList = document.getElementById("expenseList");
    const totelAmountDisplay = document.getElementById("totelAmount");

    let expense = JSON.parse(localStorage.getItem("expense")) || [];

    updateTotel();
    updateDisplay();

    function updateDisplay() {
        expenseList.innerHTML = ``;
        expense.forEach((element) => {
            displayExpense(element);
        });
    }

    function displayTotel(totel) {
        totelAmountDisplay.textContent = totel.toFixed(2);
    }

    function saveExpense() {
        localStorage.setItem("expense", JSON.stringify(expense));
    }

    function calculateTotel() {
        return expense.reduce((sum, expense) => sum + expense.Amount, 0);
    }

    function updateTotel() {
        const totel = calculateTotel();

        displayTotel(totel);
    }
    function displayExpense(ExpenseElement) {
        const li = document.createElement("li");

        li.innerHTML = `
            ${ExpenseElement.Name} -  $${ExpenseElement.Amount}
            <button id ="${ExpenseElement.id}">Delete</button>
        `;
        expenseList.appendChild(li);
    }
    expenseList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const element = expense.findIndex((ans) => ans.id == e.target.id);
            expense.splice(element, 1);
            saveExpense();
            updateTotel();
            updateDisplay();
        }
    });
    document.addEventListener("submit", (e) => {
        e.preventDefault();
        let expenseName = ExpenseNameInput.value.trim();
        let Amount = parseInt(AmountInput.value.trim());

        if (expenseName != "" && !isNaN(Amount) && Amount > 0) {
            const newExpense = {
                id: Date.now(),
                Name: expenseName,
                Amount: Amount,
            };
            expense.push(newExpense);
            saveExpense();
            updateTotel();
            displayExpense(newExpense);

            ExpenseNameInput.value = "";
            AmountInput.value = "";
        }
    });
});
