/* AMT GLOBAL - SECURITY PROTOCOL v5.0.2 */

const MatrixCrypto = {
    // مفتاح التشفير الخاص بك (سري للغاية)
    _key: "AMT_GHOST_2299_99_X",

    // دالة التشفير: تحويل النصوص لشفرات قبل الإرسال للفايربيز
    encrypt: function(text) {
        if (!text) return "";
        let result = "";
        for (let i = 0; i < text.length; i++) {
            // عملية XOR مع المفتاح لزيادة التعقيد
            result += String.fromCharCode(text.charCodeAt(i) ^ this._key.charCodeAt(i % this._key.length));
        }
        return btoa(result); // تحويلها لـ Base64 لسهولة التخزين
    },

    // دالة فك التشفير: تستخدمها أنت فقط في لوحة التحكم (Admin)
    decrypt: function(encodedText) {
        if (!encodedText) return "";
        try {
            let text = atob(encodedText);
            let result = "";
            for (let i = 0; i < text.length; i++) {
                result += String.fromCharCode(text.charCodeAt(i) ^ this._key.charCodeAt(i % this._key.length));
            }
            return result;
        } catch (e) {
            return "Error Decoding";
        }
    }
};

// نظام الحماية من "الدخول العشوائي" (Auth Guard)
const AuthGuard = {
    checkAuth: function() {
        const user = localStorage.getItem('userPhone');
        // لو مفيش مستخدم مسجل، يرجعه لصفحة الدخول فوراً (إلا لو كان في صفحات الدخول)
        const isAuthPage = window.location.href.includes('login.html') || window.location.href.includes('index.html');
        if (!user && !isAuthPage) {
            window.location.href = 'login.html';
        }
    },
    logout: function() {
        localStorage.removeItem('userPhone');
        window.location.href = 'login.html';
    }
};

// تفعيل حماية المسارات فور تحميل الصفحة
window.onload = () => { 
    if (typeof AuthGuard !== 'undefined') AuthGuard.checkAuth(); 
};

// دالة توليد معرف فريد للمستثمر (Investor ID)
function generateInvestorID() {
    return 'AMT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}
