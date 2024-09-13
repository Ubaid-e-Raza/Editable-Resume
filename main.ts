const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeSection = document.getElementById('resume-section') as HTMLElement;
const degreeSection = document.getElementById('degree-section') as HTMLElement;
const addDegreeButton = document.getElementById('add-degree') as HTMLButtonElement;

addDegreeButton.addEventListener('click', function() {
  const newDegreeEntry = document.createElement('div');
  newDegreeEntry.classList.add('degree-entry');

  newDegreeEntry.innerHTML = `
    <label for="degree">Degree:</label>
    <select class="degree" name="degree" required>
      <option value="">-- Select Degree --</option>
      <option value="Matriculation">Matriculation</option>
      <optgroup label="Intermediate (F.Sc)">
        <option value="F.Sc Pre-Engineering">F.Sc Pre-Engineering</option>
        <option value="F.Sc Pre-Medical">F.Sc Pre-Medical</option>
        <option value="F.Sc Computer Science">F.Sc Computer Science</option>
      </optgroup>
      <optgroup label="Bachelors">
        <option value="B.E">B.E</option>
        <option value="BS">BS</option>
        <option value="B.Tech">B.Tech</option>
        <option value="Architecture">Architecture</option>
      </optgroup>
      <option value="Masters">Masters</option>
      <option value="PhD">Ph.D</option>
    </select>

    <label for="institution">Institution:</label>
    <input type="text" class="institution" name="institution" required>

    <label for="completionYear">Completion Year:</label>
    <input type="text" class="completionYear" name="completionYear" required>

    <button type="button" class="remove-degree">Remove</button>
  `;

  degreeSection.appendChild(newDegreeEntry);

  const removeButton = newDegreeEntry.querySelector('.remove-degree') as HTMLButtonElement;
  if (removeButton) {
    removeButton.addEventListener('click', function() {
      newDegreeEntry.remove();
      saveData();
    });
  }
});

function saveData() {
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const phone = (document.getElementById('phone') as HTMLInputElement).value;

  const degreeEntries = document.querySelectorAll('.degree-entry');
  const degreeList: Array<any> = [];

  degreeEntries.forEach(entry => {
    const degree = (entry.querySelector('.degree') as HTMLSelectElement).value;
    const institution = (entry.querySelector('.institution') as HTMLInputElement).value;
    const completionYear = (entry.querySelector('.completionYear') as HTMLInputElement).value;

    degreeList.push({ degree, institution, completionYear });
  });

  const jobTitle = (document.getElementById('jobTitle') as HTMLInputElement).value;
  const company = (document.getElementById('company') as HTMLInputElement).value;
  const duration = (document.getElementById('duration') as HTMLInputElement).value;

  const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');

  const data = {
    name,
    email,
    phone,
    degreeList,
    jobTitle,
    company,
    duration,
    skills
  };

  localStorage.setItem('resumeData', JSON.stringify(data));
}

function loadData() {
  const savedData = localStorage.getItem('resumeData');
  if (savedData) {
    const data = JSON.parse(savedData);

    (document.getElementById('name') as HTMLInputElement).value = data.name;
    (document.getElementById('email') as HTMLInputElement).value = data.email;
    (document.getElementById('phone') as HTMLInputElement).value = data.phone;
    (document.getElementById('jobTitle') as HTMLInputElement).value = data.jobTitle;
    (document.getElementById('company') as HTMLInputElement).value = data.company;
    (document.getElementById('duration') as HTMLInputElement).value = data.duration;
    (document.getElementById('skills') as HTMLInputElement).value = data.skills.join(',');

    data.degreeList.forEach((degreeEntry: any) => {
      const newDegreeEntry = document.createElement('div');
      newDegreeEntry.classList.add('degree-entry');

      newDegreeEntry.innerHTML = `
        <label for="degree">Degree:</label>
        <select class="degree" name="degree" required>
          <option value="">-- Select Degree --</option>
          <option value="Matriculation" ${degreeEntry.degree === 'Matriculation' ? 'selected' : ''}>Matriculation</option>
          <optgroup label="Intermediate (F.Sc)">
            <option value="F.Sc Pre-Engineering" ${degreeEntry.degree === 'F.Sc Pre-Engineering' ? 'selected' : ''}>F.Sc Pre-Engineering</option>
            <option value="F.Sc Pre-Medical" ${degreeEntry.degree === 'F.Sc Pre-Medical' ? 'selected' : ''}>F.Sc Pre-Medical</option>
            <option value="F.Sc Computer Science" ${degreeEntry.degree === 'F.Sc Computer Science' ? 'selected' : ''}>F.Sc Computer Science</option>
          </optgroup>
          <optgroup label="Bachelors">
            <option value="B.E" ${degreeEntry.degree === 'B.E' ? 'selected' : ''}>B.E</option>
            <option value="BS" ${degreeEntry.degree === 'BS' ? 'selected' : ''}>BS</option>
            <option value="B.Tech" ${degreeEntry.degree === 'B.Tech' ? 'selected' : ''}>B.Tech</option>
            <option value="Architecture" ${degreeEntry.degree === 'Architecture' ? 'selected' : ''}>Architecture</option>
          </optgroup>
          <option value="Masters" ${degreeEntry.degree === 'Masters' ? 'selected' : ''}>Masters</option>
          <option value="PhD" ${degreeEntry.degree === 'PhD' ? 'selected' : ''}>Ph.D</option>
        </select>

        <label for="institution">Institution:</label>
        <input type="text" class="institution" name="institution" value="${degreeEntry.institution}" required>

        <label for="completionYear">Completion Year:</label>
        <input type="text" class="completionYear" name="completionYear" value="${degreeEntry.completionYear}" required>

        <button type="button" class="remove-degree">Remove</button>
      `;

      degreeSection.appendChild(newDegreeEntry);

      const removeButton = newDegreeEntry.querySelector('.remove-degree') as HTMLButtonElement;
      if (removeButton) {
        removeButton.addEventListener('click', function() {
          newDegreeEntry.remove();
          saveData();
        });
      }
    });

    displayResume();
  }
}

function displayResume() {
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const phone = (document.getElementById('phone') as HTMLInputElement).value;

  const degreeEntries = document.querySelectorAll('.degree-entry');
  let degreeList = '';

  degreeEntries.forEach(entry => {
    const degree = (entry.querySelector('.degree') as HTMLSelectElement).value;
    const institution = (entry.querySelector('.institution') as HTMLInputElement).value;
    const completionYear = (entry.querySelector('.completionYear') as HTMLInputElement).value;

    degreeList += `<p class="editable" data-type="degree" data-id="${degree}">${degree} from ${institution} (${completionYear})</p>`;
  });

  const jobTitle = (document.getElementById('jobTitle') as HTMLInputElement).value;
  const company = (document.getElementById('company') as HTMLInputElement).value;
  const duration = (document.getElementById('duration') as HTMLInputElement).value;

  const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');

  resumeSection.style.display = 'block';
  resumeSection.innerHTML = `
    <h1 class="editable" data-type="name">${name}</h1>
    <p class="editable" data-type="email">${email}</p>
        <p class="editable" data-type="phone">${phone}</p>

    <h2>Education</h2>
    ${degreeList}

    <h2>Work Experience</h2>
    <p class="editable" data-type="jobTitle">${jobTitle} at ${company} (${duration})</p>

    <h2>Skills</h2>
    <ul>${skills.map(skill => `<li class="editable" data-type="skill">${skill.trim()}</li>`).join('')}</ul>
  `;

  makeEditable();
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  saveData();
  displayResume();
});

function makeEditable() {
  const editableElements = document.querySelectorAll('.editable');
  editableElements.forEach(element => {
    element.addEventListener('click', function() {
      const currentText = element.textContent || '';
      const input = document.createElement('input');
      input.type = 'text';
      input.value = currentText;
      input.style.width = '100%';
      input.style.boxSizing = 'border-box';

      input.addEventListener('blur', function() {
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

