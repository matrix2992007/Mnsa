/* AMT Matrix - Security System v2.0
   Master Access: 2299.99.220077
   Developed for: Yousef (Matrix Admin)
*/

// 1. الكود السري للدخول للوحة التحكم
const MASTER_KEY = "2299.99.220077";

// وظيفة فتح الخزنة عند الضغط على v1.0.8 ثلاث مرات
function triggerVault() {
    let accessCode = prompt("AMT Master Access Code:");
    
    if (accessCode === MASTER_KEY) {
        alert("Welcome, Admin. Access Granted.");
        window.location.href = "admin_panel.html"; 
    } else {
        alert("Access Denied: Wrong Keys.");
    }
}

// 🛡️ 2. منع الضغط كليك يمين (الماوس)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault(); 
});

// 🛡️ 3. قفل اختصارات الكيبورد (منع الفحص وسرقة الكود)
document.onkeydown = function(e) {
    // منع F12
    if (e.keyCode == 123) {
        return false;
    }
    // منع Ctrl + Shift + I (Inspect)
    if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        return false;
    }
    // منع Ctrl + Shift + J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        return false;
    }
    // منع Ctrl + U (View Source)
    if (e.ctrlKey && e.keyCode == 85) {
        return false;
    }
    // منع Ctrl + S (Save Page)
    if (e.ctrlKey && e.keyCode == 83) {
        return false;
    }
};

// 🛡️ 4. حماية من تصوير الشاشة (PrintScreen)
document.addEventListener('keyup', (e) => {
    if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText('Security Alert: Screenshots are prohibited.');
        alert('تنبيه أمني: تم رصد محاولة تصوير الشاشة.');
    }
});

// رسالة ترحيب في الكونسول (للتمويه)
console.log("%cAMT Matrix System - Security Active", "color: #2ecc71; font-size: 20px; font-weight: bold;");
