# Set variables
$Username = "Krylo-60"
$RepoName = "Krylo-60"
$TargetDir = "$PSScriptRoot"
$RepoUrl = "https://github.com/$Username/$RepoName.git"

Write-Output "=================================================="
Write-Output "   Krishiv PB README Auto-Deploy System     "
Write-Output "=================================================="
Write-Output ""

# Step 1: Initialize local git repo and link to remote
if (-not (Test-Path "$TargetDir\.git")) {
    Write-Output "Initializing local git repository..."
    git init "$TargetDir"
    git -C "$TargetDir" remote add origin $RepoUrl
    git -C "$TargetDir" checkout -b main
} else {
    $CurrentRemote = git -C "$TargetDir" remote get-url origin 2>$null
    if ($CurrentRemote -ne $RepoUrl) {
        git -C "$TargetDir" remote set-url origin $RepoUrl
    }
}

# Step 2: Fetch latest from GitHub to sync any existing history
Write-Output "Syncing with GitHub..."
git -C "$TargetDir" fetch origin main
# Pull to sync any initialized commit (like initial readme)
git -C "$TargetDir" pull origin main --rebase --strategy-option=theirs

# Step 3: Commit and Push
Write-Output "Staging profile files and assets..."
git -C "$TargetDir" add -A

Write-Output "Committing changes..."
git -C "$TargetDir" commit -m "feat: upgrade profile README and add custom cyber music player dashboard"

Write-Output "Pushing to GitHub..."
git -C "$TargetDir" push -u origin main

Write-Output ""
Write-Output "=================================================="
Write-Output "   [OK] SUCCESS: Profile README pushed to GitHub!  "
Write-Output "   Check it out: https://github.com/Krylo-60      "
Write-Output "=================================================="
