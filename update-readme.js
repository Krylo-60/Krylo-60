const fs = require('fs');

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth(); // 0-indexed: 0 = Jan, 5 = Jun, 7 = Aug

// Precise Age calculation based on birthday: July 24, 2014
const birthDate = new Date('2014-07-24');
let age = currentYear - birthDate.getFullYear();
const monthDiff = today.getMonth() - birthDate.getMonth();
const dayDiff = today.getDate() - birthDate.getDate();

// If we haven't reached the birthday month, or if we are in the birthday month but haven't reached the birthday day:
if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
  age--;
}

// School Grade calculation:
// Transition to the new grade happens in June (month index 5)
// In June 2026, you started Grade 7 (2026 - 2019 = 7)
// Prior to June 2026, you were in Grade 6
let grade = currentYear - 2019;
if (currentMonth < 5) {
  grade--;
}

// Read and update the README.md file
let readmePath = 'README.md';
if (!fs.existsSync(readmePath)) {
  readmePath = '../README.md'; // Fallback if run from a subfolder
}

if (fs.existsSync(readmePath)) {
  let readme = fs.readFileSync(readmePath, 'utf8');
  let originalReadme = readme;

  // Replace occurrences of Grade and Age
  readme = readme.replace(/Grade \d+ Master Coder/g, `Grade ${grade} Master Coder`);
  readme = readme.replace(/\d+-year-old student developer/g, `${age}-year-old student developer`);

  if (readme !== originalReadme) {
    fs.writeFileSync(readmePath, readme);
    console.log(`[✓] Updated README.md: Grade ${grade}, Age ${age} (Birthday: July 24, 2014).`);
  } else {
    console.log(`[✓] README.md is already up-to-date: Grade ${grade}, Age ${age}.`);
  }
} else {
  console.error('[!] README.md not found!');
  process.exit(1);
}

// Read and update the index.html file
let htmlPath = 'index.html';
if (!fs.existsSync(htmlPath)) {
  htmlPath = '../index.html'; // Fallback if run from a subfolder
}

if (fs.existsSync(htmlPath)) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  let originalHtml = html;

  // Replace occurrences of Grade and Age
  html = html.replace(/Grade \d+ Master Coder/g, `Grade ${grade} Master Coder`);
  html = html.replace(/\d+-year-old student developer/g, `${age}-year-old student developer`);

  if (html !== originalHtml) {
    fs.writeFileSync(htmlPath, html);
    console.log(`[✓] Updated index.html: Grade ${grade}, Age ${age}.`);
  } else {
    console.log(`[✓] index.html is already up-to-date: Grade ${grade}, Age ${age}.`);
  }
} else {
  console.warn('[!] index.html not found! Skipping html update.');
}
