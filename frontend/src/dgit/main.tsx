import { ipcMain } from "electron";
import fs from "fs";
import path from "path-browserify";
require("dotenv").config(); // Load .env file

// Define the working directory (default to current directory if not provided)
const WORKING_DIR = process.env.WORKING_DIR || process.cwd();

// Define paths relative to the working directory
const VCS_DIR = path.join(WORKING_DIR, ".dgit");
const STAGE_FILE = path.join(VCS_DIR, "stage.json");
const LOG_FILE = path.join(VCS_DIR, "log.json");
const FILES_DIR = path.join(VCS_DIR, "files");

// Initialize a repository
function init() {
  if (fs.existsSync(VCS_DIR)) {
    console.log("Repository already initialized.");
    return;
  }
  fs.mkdirSync(VCS_DIR);
  fs.writeFileSync(STAGE_FILE, JSON.stringify([]));
  fs.writeFileSync(LOG_FILE, JSON.stringify([]));
  console.log("Initialized empty repository.");
}

// Stage files for commit
export function add(file) {
  const filePath = path.resolve(WORKING_DIR, file);
  if (!fs.existsSync(filePath)) {
    console.error(`File "${file}" does not exist.`);
    return;
  }
  const stage = JSON.parse(fs.readFileSync(STAGE_FILE, 'utf-8'));
  if (!stage.includes(file)) {
    stage.push(file);
    fs.writeFileSync(STAGE_FILE, JSON.stringify(stage));
    console.log(`Added "${file}" to staging.`);
  } else {
    console.log(`"${file}" is already staged.`);
  }
}

function copyFileToCommitDir(file, commitDir) {
  const filePath = path.resolve(WORKING_DIR, file);
  const destPath = path.join(commitDir, path.basename(filePath));
  fs.copyFileSync(filePath, destPath);
}

// Commit staged files
export function commit(message) {
  if (!isUserAllowed()) {
    return; // Exit if the user is not allowed
  }

  const stage = JSON.parse(fs.readFileSync(STAGE_FILE, 'utf-8'));
  if (stage.length === 0) {
    console.log("No files to commit.");
    return;
  }

  const user = process.env.USER || "unknown";
  const userEmail = process.env.USER_EMAIL || "unknown@example.com";

  const log = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
  const commitId = log.length + 1;

  const commitDir = path.join(FILES_DIR, String(commitId));
  fs.mkdirSync(commitDir, { recursive: true });

  stage.forEach((file) => {
    copyFileToCommitDir(file, commitDir);
  });

  const commit = {
    id: commitId,
    message,
    files: stage,
    user,
    userEmail,
    timestamp: new Date().toISOString(),
  };

  log.push(commit);
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
  fs.writeFileSync(STAGE_FILE, JSON.stringify([]));
  console.log(`Committed with message: "${message}"`);
}

ipcMain.handle("commit", (_, message) => commit(message));

function isUserAllowed() {
  const userEmail = process.env.USER_EMAIL || "unknown@example.com"; // Ensure fallback value
  const allowedEmails = (process.env.ALLOWED_EMAILS || "").split(",");

  if (!allowedEmails.includes(userEmail)) {
    console.log(
      `Operation rejected. User email "${userEmail}" is not allowed.`
    );
    return false;
  }
  return true;
}

console.log("USER_EMAIL:", process.env.USER_EMAIL);
console.log("ALLOWED_EMAILS:", process.env.ALLOWED_EMAILS);

export function push() {
  if (!isUserAllowed()) {
    return; 
  }

  const syncDir = path.join(VCS_DIR, "../../syncdir", "sync");
  const syncLogFile = path.join(syncDir, "log.json");

  const currentLog = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
  const currentCommitCount = currentLog.length;

  let syncCommitCount = 0;
  if (fs.existsSync(syncLogFile)) {
    const syncLog = JSON.parse(fs.readFileSync(syncLogFile, 'utf-8'));
    syncCommitCount = syncLog.length;
  }

  if (syncCommitCount >= currentCommitCount) {
    console.log("No new commits to push. Sync directory is up to date.");
    return;
  }

  if (fs.existsSync(syncDir)) {
    fs.rmSync(syncDir, { recursive: true, force: true });
  }

  fs.mkdirSync(syncDir, { recursive: true });

  const copyRecursive = (src, dest) => {
    const entries = fs.readdirSync(src, { withFileTypes: true });
    entries.forEach((entry) => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  };

  copyRecursive(VCS_DIR, syncDir);
  console.log("Pushed changes to sync directory.");
}

ipcMain.handle("push", () => push());

ipcMain.handle("sync-changes", () => {
  console.log("Sync Changes button pressed. Running pull and push...");
  pull(); 
  push(); 
});


export function pull() {
  console.log("Pulling changes here..."); 
  if (!isUserAllowed()) {
    return; 
  }

  const syncDir = path.join(VCS_DIR, "../../syncdir", "sync");
  const syncLogFile = path.join(syncDir, "log.json");

  if (!fs.existsSync(syncDir)) {
    console.log("Sync directory does not exist. Nothing to pull.");
    return;
  }

  const currentLog = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
  const currentCommitCount = currentLog.length;

  let syncCommitCount = 0;
  if (fs.existsSync(syncLogFile)) {
    const syncLog = JSON.parse(fs.readFileSync(syncLogFile, 'utf-8'));
    syncCommitCount = syncLog.length;
  }

  if (syncCommitCount <= currentCommitCount) {
    console.log("No new commits to pull. Local repository is up to date.");
    return;
  }

  if (fs.existsSync(VCS_DIR)) {
    fs.rmSync(VCS_DIR, { recursive: true, force: true });
  }

  fs.mkdirSync(VCS_DIR, { recursive: true });

  const copyRecursive = (src, dest) => {
    const entries = fs.readdirSync(src, { withFileTypes: true });
    entries.forEach((entry) => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  };

  copyRecursive(syncDir, VCS_DIR);
  console.log("Pulled changes from sync directory.");
  console.log("Now merging changes...");
  merge();
}

ipcMain.handle("pull", () => pull());



function logHistory() {
  const log = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
  if (log.length === 0) {
    console.log("No commits yet.");
    return;
  }
  log.forEach((commit) => {
    console.log(`Commit ${commit.id}: ${commit.message}`);
    console.log(`  Files: ${commit.files.join(", ")}`);
    console.log(`  Date: ${commit.timestamp}`);
  });
}

function merge() {
  if (!isUserAllowed()) {
    return;
  }

  const localLog = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
  if (localLog.length === 0) {
    console.log("No commits available to merge.");
    return;
  }

  const latestCommit = localLog[localLog.length - 1];
  const latestCommitDir = path.join(FILES_DIR, String(latestCommit.id));

  if (!fs.existsSync(latestCommitDir)) {
    console.log("Latest commit files are missing. Cannot merge.");
    return;
  }

  const copyRecursive = (src, dest) => {
    const entries = fs.readdirSync(src, { withFileTypes: true });
    entries.forEach((entry) => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  };

  copyRecursive(latestCommitDir, WORKING_DIR);

  console.log(
    `Merged latest commit (Commit ID: ${latestCommit.id}) into the current working directory.`
  );
}

// CLI command handling
const [, , command, ...args] = process.argv;

switch (command) {
  case "init":
    init();
    break;
  case "add":
    add(args[0]);
    break;
  case "commit":
    commit(args.join(" "));
    break;
  case "log":
    logHistory();
    break;
  case "push":
    push();
    break;
  case "pull":
    pull();
    break;
  default:
    console.log("Usage: vcs <command> [args]");
    console.log("Commands: init, add <file>, commit <message>, log");
}