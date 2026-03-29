/* AMT GLOBAL - SECURITY PROTOCOL v4.6 */

const MatrixCrypto = {
    // مفتاح التشفير الخاص بك (يمكنك تغييره لزيادة الأمان)
    _key: "AMT_GHOST_2026_X",

    // دالة التشفير (تحويل النصوص لشفرات غير مفهومة في الفايربيز)
    encrypt: function(text) {
        if (!text) return "";
        let result = "";
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(text.charCodeAt(i) ^ this._key.charCodeAt(i % this._key.length));
        }
        return btoa(result); // تحويلها لـ Base64 لسهولة التخزين
    },

    // دالة فك التشفير (تستخدمها أنت فقط في لوحة التحكم)
    decrypt: function(encodedText) {
        if (!encodedText) return "";
        let text = atob(encodedText);
        let result = "";
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(text.charCodeAt(i) ^ this._key.charCodeAt(i % this._key.length));
        }
        return result;
    }
};

// نظام الحماية من "الدخول العشوائي"
const AuthGuard = {
    checkAuth: function() {
        const user = localStorage.getItem('userPhone');
        if (!user && !window.location.href.includes('login.html') && !window.location.href.includes('index.html')) {
            window.location.href = 'login.html';
        }
    },
    logout: function() {
        localStorage.removeItem('userPhone');
        window.location.href = 'login.html';
    }
};

// تفعيل الحماية فور تحميل الصفحة
window.onload = () => { AuthGuard.checkAuth(); };

// دالة توليد معرف فريد للمستثمر (ID)
function generateInvestorID() {
    return 'AMT-' + Math.floor(100000 + Math.random() * 900000);
}
