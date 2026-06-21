const fs = require('fs');

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth(); // 0-indexed: 0 = Jan, 5 = June, etc.

// Academic Grade calculation:
// In 2026, you are in Grade 7.
// In 2025, you were in Grade 6.
// Grade transition usually happens around June (Month 5).
let grade = currentYear - 2019;
if (currentMonth < 5) {
  grade -= 1; // Prior to June, you are in the previous year's grade
}

// Age calculation:
// In 2025, you were 11.
// In 2026, you turn 12.
let age = currentYear - 2014;
if (currentMonth < 5) {
  age -= 1;
}

// Read the README.md content
let readmePath = 'README.md';
if (!fs.existsSync(readmePath)) {
  readmePath = '../README.md'; // Fallback if run from subfolder
}

if (fs.existsSync(readmePath)) {
  let readme = fs.readFileSync(readmePath, 'utf8');

  // Replace occurrences of Grade and Age
  let originalReadme = readme;
  readme = readme.replace(/Grade \d+ Master Coder/g, `Grade ${grade} Master Coder`);
  readme = readme.replace(/\d+-year-old student developer/g, `${age}-year-old student developer`);

  if (readme !== originalReadme) {
    fs.writeFileSync(readmePath, readme);
    console.log(`[✓] Automatically updated README.md: Grade ${grade}, Age ${age} for Year ${currentYear}.`);
  } else {
    console.log(`[✓] README.md is already up-to-date: Grade ${grade}, Age ${age}.`);
  }
} else {
  console.error('[!] README.md not found!');
  process.exit(1);
}
