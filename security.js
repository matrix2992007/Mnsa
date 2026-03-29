/* Project: AMT INVESTMENT
   Role: Security Core & Admin Vault
   Description: Protects the site, logs IPs to Firebase, and handles the 12-word secret access.
*/

// 1. Firebase Initialization (Connecting to your engine)
const firebaseConfig = {
  apiKey: "AIzaSyAkz8kGNDOJ5caCIbdoXpvJBZgUbigjT5g",
  authDomain: "matrix-c2.firebaseapp.com",
  databaseURL: "https://matrix-c2-default-rtdb.firebaseio.com",
  projectId: "matrix-c2",
  storageBucket: "matrix-c2.firebasestorage.app",
  messagingSenderId: "778033605872",
  appId: "1:778033605872:web:a27df427bcf066adf42635"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// 2. The 12 Words Vault (The Secret Key)
const VAULT_KEYS = [
    "Apple", "River", "Bright", "Shadow", "Future", "Mountain", 
    "Silver", "Electric", "Cloud", "portal", "Forest", "Vision"
];

// 3. Anti-Theft Logic (Disables Right-Click, F12, and View Source)
document.addEventListener('contextmenu', e => e.preventDefault());
document.onkeydown = function(e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0))) || (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
        console.warn("AMT Security: Action Blocked.");
        return false;
    }
};

// 4. Silent IP Logger (Logs every visitor to Firebase)
async function logVisitorIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const userIP = data.ip;
        const cleanIP = userIP.replace(/\./g, '_'); // Firebase keys can't have dots
        
        const logRef = firebase.database().ref('visitor_logs/' + cleanIP);
        logRef.update({
            last_seen: new Date().toLocaleString(),
            status: "Active"
        });
    } catch (err) {
        // Silently fail to not alert the user
    }
}
logVisitorIP();

// 5. Hidden Trigger Logic (Opens Admin Vault after 3 clicks)
let secretClicks = 0;
function triggerVault() {
    secretClicks++;
    if (secretClicks === 3) {
        secretClicks = 0;
        openMatrixVault();
    }
}

function openMatrixVault() {
    // Ask for 3 specific words from your list to verify identity
    let w1 = prompt("Secret Word #1:");
    let w5 = prompt("Secret Word #5:");
    let w12 = prompt("Secret Word #12:");

    if (w1 === VAULT_KEYS[0] && w5 === VAULT_KEYS[4] && w12 === VAULT_KEYS[11]) {
        alert("Identity Verified. Welcome back, Matrix.");
        window.location.href = "admin_panel.html"; // Your secret dashboard
    } else {
        alert("Access Denied: Wrong Keys.");
    }
}
