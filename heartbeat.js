const fs = require('fs');
const path = require('path');

// Helper to format date in UTC: YYYY-MM-DD HH:mm:ss UTC
function getUTCTimestamp() {
  const d = new Date();
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const hours = String(d.getUTCHours()).padStart(2, '0');
  const minutes = String(d.getUTCMinutes()).padStart(2, '0');
  const seconds = String(d.getUTCSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`;
}

const timestamp = getUTCTimestamp();
const filesToUpdate = ['README.md', 'index.html'];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const regex = /(<!--HEARTBEAT_STATUS-->)(.*?)(<!--HEARTBEAT_STATUS_END-->)/g;
    
    if (regex.test(content)) {
      content = content.replace(regex, `$1Online (Last sync: ${timestamp})$3`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`[✓] Successfully updated heartbeat in ${file} to: ${timestamp}`);
    } else {
      console.warn(`[!] Heartbeat placeholder not found in ${file}`);
    }
  } else {
    console.error(`[!] File not found: ${filePath}`);
  }
});
