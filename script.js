const form = document.getElementById("resultForm");
const resultBody = document.getElementById("resultBody");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    errorMessage.textContent = "";

    // Get student details
    const studentId =
        document.getElementById("studentId").value.trim();

    const studentName =
        document.getElementById("studentName").value.trim();

    const department =
        document.getElementById("department").value;

    const semester =
        document.getElementById("semester").value;

    // Get marks
    const marks = [
        Number(document.getElementById("subject1").value),
        Number(document.getElementById("subject2").value),
        Number(document.getElementById("subject3").value),
        Number(document.getElementById("subject4").value),
        Number(document.getElementById("subject5").value)
    ];

    // Validate student details
    if (studentId === "") {
        showError("Please enter Student ID.");
        return;
    }

    if (studentName === "") {
        showError("Please enter Student Name.");
        return;
    }

    if (department === "") {
        showError("Please select Department.");
        return;
    }

    if (semester === "") {
        showError("Please select Semester.");
        return;
    }

    // Validate marks
    for (let i = 0; i < marks.length; i++) {

        if (
            document.getElementById(`subject${i + 1}`).value === "" ||
            marks[i] < 0 ||
            marks[i] > 100
        ) {
            showError(
                `Please enter valid marks for Subject ${i + 1} (0-100).`
            );
            return;
        }
    }

    // Calculate total
    const total = marks.reduce(
        (sum, mark) => sum + mark,
        0
    );

    // Calculate percentage
    const percentage = total / marks.length;

    // Check pass/fail
    // Minimum 40 marks required in every subject
    const passed = marks.every(mark => mark >= 40);

    // Calculate grade
    let grade;

    if (!passed) {
        grade = "F";
    }
    else if (percentage >= 90) {
        grade = "A+";
    }
    else if (percentage >= 80) {
        grade = "A";
    }
    else if (percentage >= 70) {
        grade = "B";
    }
    else if (percentage >= 60) {
        grade = "C";
    }
    else if (percentage >= 50) {
        grade = "D";
    }
    else {
        grade = "E";
    }

    const status = passed ? "PASS" : "FAIL";

    // Remove "No data" row
    const noData = document.getElementById("noData");

    if (noData) {
        noData.remove();
    }

    // Create new table row
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${studentId}</td>
        <td>${studentName}</td>
        <td>${department}</td>
        <td>${total}/500</td>
        <td>${percentage.toFixed(2)}%</td>
        <td>${grade}</td>
        <td class="${passed ? "pass" : "fail"}">
            ${status}
        </td>
    `;

    resultBody.appendChild(row);

    // Clear form for another student
    form.reset();

    // Display success message
    errorMessage.style.color = "#198754";
    errorMessage.textContent =
        "Result calculated successfully. You can enter another student.";

});


// Display validation error
function showError(message) {

    errorMessage.style.color = "#dc3545";
    errorMessage.textContent = message;
}


// Clear error message when form is reset
form.addEventListener("reset", function () {

    setTimeout(() => {
        errorMessage.textContent = "";
    }, 0);

});