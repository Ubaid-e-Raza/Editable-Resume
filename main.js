var form = document.getElementById('resume-form');
var resumeSection = document.getElementById('resume-section');
var degreeSection = document.getElementById('degree-section');
var addDegreeButton = document.getElementById('add-degree');
addDegreeButton.addEventListener('click', function () {
    var newDegreeEntry = document.createElement('div');
    newDegreeEntry.classList.add('degree-entry');
    newDegreeEntry.innerHTML = "\n    <label for=\"degree\">Degree:</label>\n    <select class=\"degree\" name=\"degree\" required>\n      <option value=\"\">-- Select Degree --</option>\n      <option value=\"Matriculation\">Matriculation</option>\n      <optgroup label=\"Intermediate (F.Sc)\">\n        <option value=\"F.Sc Pre-Engineering\">F.Sc Pre-Engineering</option>\n        <option value=\"F.Sc Pre-Medical\">F.Sc Pre-Medical</option>\n        <option value=\"F.Sc Computer Science\">F.Sc Computer Science</option>\n      </optgroup>\n      <optgroup label=\"Bachelors\">\n        <option value=\"B.E\">B.E</option>\n        <option value=\"BS\">BS</option>\n        <option value=\"B.Tech\">B.Tech</option>\n        <option value=\"Architecture\">Architecture</option>\n      </optgroup>\n      <option value=\"Masters\">Masters</option>\n      <option value=\"PhD\">Ph.D</option>\n    </select>\n\n    <label for=\"institution\">Institution:</label>\n    <input type=\"text\" class=\"institution\" name=\"institution\" required>\n\n    <label for=\"completionYear\">Completion Year:</label>\n    <input type=\"text\" class=\"completionYear\" name=\"completionYear\" required>\n\n    <button type=\"button\" class=\"remove-degree\">Remove</button>\n  ";
    degreeSection.appendChild(newDegreeEntry);
    var removeButton = newDegreeEntry.querySelector('.remove-degree');
    if (removeButton) {
        removeButton.addEventListener('click', function () {
            newDegreeEntry.remove();
            saveData();
        });
    }
});
function saveData() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var degreeEntries = document.querySelectorAll('.degree-entry');
    var degreeList = [];
    degreeEntries.forEach(function (entry) {
        var degree = entry.querySelector('.degree').value;
        var institution = entry.querySelector('.institution').value;
        var completionYear = entry.querySelector('.completionYear').value;
        degreeList.push({ degree: degree, institution: institution, completionYear: completionYear });
    });
    var jobTitle = document.getElementById('jobTitle').value;
    var company = document.getElementById('company').value;
    var duration = document.getElementById('duration').value;
    var skills = document.getElementById('skills').value.split(',');
    var data = {
        name: name,
        email: email,
        phone: phone,
        degreeList: degreeList,
        jobTitle: jobTitle,
        company: company,
        duration: duration,
        skills: skills
    };
    localStorage.setItem('resumeData', JSON.stringify(data));
}
function loadData() {
    var savedData = localStorage.getItem('resumeData');
    if (savedData) {
        var data = JSON.parse(savedData);
        document.getElementById('name').value = data.name;
        document.getElementById('email').value = data.email;
        document.getElementById('phone').value = data.phone;
        document.getElementById('jobTitle').value = data.jobTitle;
        document.getElementById('company').value = data.company;
        document.getElementById('duration').value = data.duration;
        document.getElementById('skills').value = data.skills.join(',');
        data.degreeList.forEach(function (degreeEntry) {
            var newDegreeEntry = document.createElement('div');
            newDegreeEntry.classList.add('degree-entry');
            newDegreeEntry.innerHTML = "\n        <label for=\"degree\">Degree:</label>\n        <select class=\"degree\" name=\"degree\" required>\n          <option value=\"\">-- Select Degree --</option>\n          <option value=\"Matriculation\" ".concat(degreeEntry.degree === 'Matriculation' ? 'selected' : '', ">Matriculation</option>\n          <optgroup label=\"Intermediate (F.Sc)\">\n            <option value=\"F.Sc Pre-Engineering\" ").concat(degreeEntry.degree === 'F.Sc Pre-Engineering' ? 'selected' : '', ">F.Sc Pre-Engineering</option>\n            <option value=\"F.Sc Pre-Medical\" ").concat(degreeEntry.degree === 'F.Sc Pre-Medical' ? 'selected' : '', ">F.Sc Pre-Medical</option>\n            <option value=\"F.Sc Computer Science\" ").concat(degreeEntry.degree === 'F.Sc Computer Science' ? 'selected' : '', ">F.Sc Computer Science</option>\n          </optgroup>\n          <optgroup label=\"Bachelors\">\n            <option value=\"B.E\" ").concat(degreeEntry.degree === 'B.E' ? 'selected' : '', ">B.E</option>\n            <option value=\"BS\" ").concat(degreeEntry.degree === 'BS' ? 'selected' : '', ">BS</option>\n            <option value=\"B.Tech\" ").concat(degreeEntry.degree === 'B.Tech' ? 'selected' : '', ">B.Tech</option>\n            <option value=\"Architecture\" ").concat(degreeEntry.degree === 'Architecture' ? 'selected' : '', ">Architecture</option>\n          </optgroup>\n          <option value=\"Masters\" ").concat(degreeEntry.degree === 'Masters' ? 'selected' : '', ">Masters</option>\n          <option value=\"PhD\" ").concat(degreeEntry.degree === 'PhD' ? 'selected' : '', ">Ph.D</option>\n        </select>\n\n        <label for=\"institution\">Institution:</label>\n        <input type=\"text\" class=\"institution\" name=\"institution\" value=\"").concat(degreeEntry.institution, "\" required>\n\n        <label for=\"completionYear\">Completion Year:</label>\n        <input type=\"text\" class=\"completionYear\" name=\"completionYear\" value=\"").concat(degreeEntry.completionYear, "\" required>\n\n        <button type=\"button\" class=\"remove-degree\">Remove</button>\n      ");
            degreeSection.appendChild(newDegreeEntry);
            var removeButton = newDegreeEntry.querySelector('.remove-degree');
            if (removeButton) {
                removeButton.addEventListener('click', function () {
                    newDegreeEntry.remove();
                    saveData();
                });
            }
        });
        displayResume();
    }
}
function displayResume() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var degreeEntries = document.querySelectorAll('.degree-entry');
    var degreeList = '';
    degreeEntries.forEach(function (entry) {
        var degree = entry.querySelector('.degree').value;
        var institution = entry.querySelector('.institution').value;
        var completionYear = entry.querySelector('.completionYear').value;
        degreeList += "<p class=\"editable\" data-type=\"degree\" data-id=\"".concat(degree, "\">").concat(degree, " from ").concat(institution, " (").concat(completionYear, ")</p>");
    });
    var jobTitle = document.getElementById('jobTitle').value;
    var company = document.getElementById('company').value;
    var duration = document.getElementById('duration').value;
    var skills = document.getElementById('skills').value.split(',');
    resumeSection.style.display = 'block';
    resumeSection.innerHTML = "\n    <h1 class=\"editable\" data-type=\"name\">".concat(name, "</h1>\n    <p class=\"editable\" data-type=\"email\">").concat(email, "</p>\n        <p class=\"editable\" data-type=\"phone\">").concat(phone, "</p>\n\n    <h2>Education</h2>\n    ").concat(degreeList, "\n\n    <h2>Work Experience</h2>\n    <p class=\"editable\" data-type=\"jobTitle\">").concat(jobTitle, " at ").concat(company, " (").concat(duration, ")</p>\n\n    <h2>Skills</h2>\n    <ul>").concat(skills.map(function (skill) { return "<li class=\"editable\" data-type=\"skill\">".concat(skill.trim(), "</li>"); }).join(''), "</ul>\n  ");
    makeEditable();
}
form.addEventListener('submit', function (event) {
    event.preventDefault();
    saveData();
    displayResume();
});
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var currentText = element.textContent || '';
            var input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
            input.style.width = '100%';
            input.style.boxSizing = 'border-box';
            input.addEventListener('blur', function () {
                element.textContent = input.value;
                saveData();
            });
            element.innerHTML = '';
            element.appendChild(input);
            input.focus();
        });
    });
}
document.addEventListener('DOMContentLoaded', loadData);
