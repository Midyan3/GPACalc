function addRow() {
    var rowCon = document.getElementById("rows-container");

    var newRow = document.createElement("div");
    newRow.classList.add("row");


    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("include-row");
    newRow.appendChild(checkbox);


    var courseInput = document.createElement("input");
    courseInput.type = "text";
    courseInput.classList.add("course");
    courseInput.placeholder = "Course (Optional)";
    newRow.appendChild(courseInput);

    var gradeSelect = document.createElement("select");
    gradeSelect.classList.add("grade");

    var grades = ["", "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
    grades.forEach(function (grade) {
        var option = document.createElement("option");
        option.value = grade;
        option.textContent = grade || "Grade";
        gradeSelect.appendChild(option);
    });

    newRow.appendChild(gradeSelect);

    var creditsInput = document.createElement("input");
    creditsInput.type = "number";
    creditsInput.classList.add("credits");
    creditsInput.placeholder = "Credits";
    creditsInput.min = "0";
    creditsInput.step = "0.5";
    newRow.appendChild(creditsInput);

    var deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-row");
    deleteButton.innerHTML = '<i class="fas fa-times"></i>';
    deleteButton.addEventListener("click", function (e) {
        deleteRow(e);
    });

    newRow.appendChild(deleteButton);

    rowCon.appendChild(newRow);
}

function resetForm() {
    var rfind = document.getElementById("rows-container");
    var gpaRes = document.getElementById("gpa-result");
    gpaRes.innerHTML = "";
    rfind.innerHTML = `
    <div class="row">
        <input type="checkbox" class="include-row">
        <input type="text" class="course" placeholder="Course (Optional)">
        <select class="grade">
            <option value="">Grade</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B-</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="C-">C-</option>
            <option value="D+">D+</option>
            <option value="D">D</option>
            <option value="D-">D-</option>
            <option value="F">F</option>
        </select>
        <input type="number" class="credits" placeholder="Credits" min="0" step="0.5">
        <button type="button" class="delete-row" onclick="deleteRow(event)"><i class="fas fa-times"></i></button>
    </div>
    `;

}

function deleteRow(e){
    e.target.closest(".row").remove();
}

function calculateGPA() {
    var rows = document.querySelectorAll(".row");
    var totalCredits = 0;
    var totalGradePoints = 0;

    for (var i = 0; i < rows.length; i++) {
        var includeRow = rows[i].querySelector(".include-row").checked;
        
        if (includeRow) {
            var grade = rows[i].querySelector(".grade").value;
            var credits = parseFloat(rows[i].querySelector(".credits").value);
            
            if (grade !== "" && credits > 0) {
                totalCredits += credits;
                totalGradePoints += getGradePoints(grade) * credits;
            }
        }
    }

    if (totalCredits > 0) {
        var gpa = totalGradePoints / totalCredits;
        document.getElementById("gpa-result").innerText = `Your GPA is: ${gpa.toFixed(2)}`;
    } else {
        document.getElementById("gpa-result").innerText = "Please select courses by clicking checkbox and enter credits to calculate GPA.";
    }
}

function getGradePoints(grade) {
    switch (grade) {
        case "A+":
        case "A":
            return 4.0;
        case "A-":
            return 3.7;
        case "B+":
            return 3.3;
        case "B":
            return 3.0;
        case "B-":
            return 2.7;
        case "C+":
            return 2.3;
        case "C":
            return 2.0;
        case "C-":
            return 1.7;
        case "D+":
            return 1.3;
        case "D":
            return 1.0;
        case "D-":
            return 0.7;
        case "F":
            return 0.0;
        default:
            return 0.0;
    }
}
