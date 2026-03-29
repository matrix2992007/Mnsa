/* AMT MATRIX - GLOBAL SECURITY PROTOCOL v3.5
   Developed by: Yousef (Matrix Admin)
   Features: Layered Encryption, 10-Tap Trigger, Strong Regex Validation
*/

const MASTER_KEY = "2299.99.220077";
const CRYPTO_SALT = "AMT_V3_SECURE_SALT_2026"; // مفتاح تشفير البيانات

let tapCount = 0;
let lastTap = 0;

// 1. 🛡️ محرك التشفير المتقدم (Matrix Encryption Engine)
// يقوم بتشفير النصوص لمنع القراءة المباشرة من قاعدة البيانات
const MatrixCrypto = {
    encrypt: (text) => {
        try {
            // تشفير Base64 مزدوج مع "ملح" وعكس النص لزيادة التعقيد
            const salted = text + CRYPTO_SALT;
            const b64 = btoa(unescape(encodeURIComponent(salted)));
            return b64.split('').reverse().join(''); 
        } catch (e) { return "ENC_ERR"; }
    },
    decrypt: (cipher) => {
        try {
            const reversed = cipher.split('').reverse().join('');
            const decoded = decodeURIComponent(escape(atob(reversed)));
            return decoded.replace(CRYPTO_SALT, '');
        } catch (e) { return "DEC_ERR"; }
    }
};

// 2.  م (Developer Mode)
function triggerVault() {
    const now = Date.now();
    // تغطاثانيةانية بين كل ضغطة)
    if (now - lastTap > 800) tapCount = 0; 
    
    tapCount++;
    lastTap = now;

    if (tapCount === 10) {
        tapCount = 0;
        let accessCode = prompt("AMT PROTOCOL: Enter Security Master Key");
        if (accessCode === MASTER_KEY) {
            alert("Identity Confirmed. Accessing Matrix Vault...");
            window.location.href = "admin_panel.html";
        } else {
            alert("Security Breach: Access Denied.");
        }
    }
}

// 3. 🛡️ فحص قوة كلمة السر (Complex Validation)
// يفرض 8 خانات، حرف كبير، حرف صغير، رقم، ورمز خاص
function isPasswordStrong(pass) {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return strongRegex.test(pass);
}

// 4. 🆔 مولد المعرف الفريد (UID Generator)
function generateUID() {
    return 'AMT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// 5. 🚫 حماية الواجهة (Anti-Inspection)
document.addEventListener('contextmenu', e => e.preventDefault());
document.onkeydown = e => {
    // منع F12، Ctrl+Shift+I، Ctrl+U
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) || (e.ctrlKey && e.keyCode == 85)) {
        return false;
    }
};

// 6. 🧹 تنظيف المدخلات من الأكواد الخبيثة (Anti-XSS)
function sanitizeInput(text) {
    const temp = document.createElement('div');
    temp.textContent = text;
    return temp.innerHTML;
}

console.log("%cAMT SECURITY ACTIVE", "color: #10b981; font-weight: bold; font-size: 15px;");
