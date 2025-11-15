// ===========================
// Xử lý form đăng ký nâng cao
// ===========================

// ===========================
// Utility Functions cho localStorage
// ===========================

// Lấy danh sách users từ localStorage
function getUsers() {
    const users = localStorage.getItem('lacoste_users');
    return users ? JSON.parse(users) : [];
}

// Lưu danh sách users vào localStorage
function saveUsers(users) {
    localStorage.setItem('lacoste_users', JSON.stringify(users));
}

// Kiểm tra username đã tồn tại chưa
function isUsernameExists(username) {
    const users = getUsers();
    return users.some(user => user.username.toLowerCase() === username.toLowerCase());
}

// Kiểm tra email đã tồn tại chưa
function isEmailExists(email) {
    const users = getUsers();
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

// Thêm user mới vào localStorage
function addUser(userData) {
    const users = getUsers();
    
    // Kiểm tra username và email đã tồn tại
    if (isUsernameExists(userData.username)) {
        return { success: false, message: 'Tên đăng nhập đã tồn tại' };
    }
    
    if (isEmailExists(userData.email)) {
        return { success: false, message: 'Email đã được sử dụng' };
    }
    
    // Thêm user mới
    const newUser = {
        ...userData,
        createdAt: new Date().toISOString(),
        id: Date.now().toString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return { success: true, user: newUser };
}

// Đợi DOM load xong
document.addEventListener('DOMContentLoaded', function() {
// Lấy các elements
const form = document.getElementById('registerForm');
const password = document.getElementById('password');
const togglePw = document.getElementById('togglePw');
const registerButton = document.getElementById('registerButton');

// Regex yêu cầu mật khẩu mạnh:
// - ≥ 1 chữ thường
// - ≥ 1 chữ hoa
// - ≥ 1 số
// - ≥ 1 ký tự đặc biệt
// - ≥ 8 ký tự
const strongPwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

// Toggle hiển thị mật khẩu
if (togglePw) {
    togglePw.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        
        // Thay đổi icon
        const eyeIcon = togglePw.querySelector('.eye-icon');
        if (type === 'text') {
            eyeIcon.innerHTML = `
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            `;
        } else {
            eyeIcon.innerHTML = `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            `;
        }
    });
}

// Kiểm tra password requirements
function checkPasswordRequirements(pw) {
    const checks = {
        length: pw.length >= 8,
        lowercase: /[a-z]/.test(pw),
        uppercase: /[A-Z]/.test(pw),
        number: /[0-9]/.test(pw),
        special: /[^A-Za-z0-9]/.test(pw)
    };

    // Update UI
    updatePasswordCheck('pw-length', checks.length);
    updatePasswordCheck('pw-lowercase', checks.lowercase);
    updatePasswordCheck('pw-uppercase', checks.uppercase);
    updatePasswordCheck('pw-number', checks.number);
    updatePasswordCheck('pw-special', checks.special);

    // Update strength indicator
    const score = Object.values(checks).filter(Boolean).length;
    const strengthLabels = ['', 'Yếu', 'Trung bình', 'Tốt', 'Rất tốt', 'Mạnh'];
    const strengthColors = ['', '#e74c3c', '#f39c12', '#3498db', '#27ae60', '#2ecc71'];
    
    const pwStrength = document.getElementById('pw-strength');
    if (pw) {
        pwStrength.textContent = `Độ mạnh: ${strengthLabels[score] || 'Yếu'}`;
        pwStrength.style.color = strengthColors[score] || '#e74c3c';
    } else {
        pwStrength.textContent = '';
    }

    return checks;
}

function updatePasswordCheck(id, isValid) {
    const item = document.getElementById(id);
    if (item) {
        if (isValid) {
            item.classList.add('valid');
        } else {
            item.classList.remove('valid');
        }
    }
}

// Real-time password validation
password.addEventListener('input', function() {
    const pw = password.value;
    checkPasswordRequirements(pw);
});

// Validation functions
function validateFullname(fullname) {
    if (!fullname || fullname.trim() === '') {
        return 'Vui lòng nhập họ và tên';
    }
    if (fullname.trim().length < 2) {
        return 'Họ và tên phải có ít nhất 2 ký tự';
    }
    return '';
}

// Validation chỉ kiểm tra format (dùng cho blur)
function validateUsernameFormat(username) {
    if (!username || username.trim() === '') {
        return 'Vui lòng nhập tên tài khoản';
    }
    if (username.trim().length < 3) {
        return 'Tên tài khoản phải có ít nhất 3 ký tự';
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return 'Tên tài khoản chỉ được chứa chữ cái, số và dấu gạch dưới';
    }
    return '';
}

// Validation đầy đủ (format + tồn tại) - dùng cho submit
function validateUsername(username) {
    const formatError = validateUsernameFormat(username);
    if (formatError) {
        return formatError;
    }
    // Kiểm tra username đã tồn tại
    if (isUsernameExists(username)) {
        return 'Tên đăng nhập đã tồn tại, vui lòng chọn tên khác';
    }
    return '';
}

// Validation chỉ kiểm tra format (dùng cho blur)
function validateEmailFormat(email) {
    if (!email || email.trim() === '') {
        return 'Vui lòng nhập email';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Email không hợp lệ, vui lòng nhập đúng định dạng';
    }
    return '';
}

// Validation đầy đủ (format + tồn tại) - dùng cho submit
function validateEmail(email) {
    const formatError = validateEmailFormat(email);
    if (formatError) {
        return formatError;
    }
    // Kiểm tra email đã tồn tại
    if (isEmailExists(email)) {
        return 'Email đã được sử dụng, vui lòng sử dụng email khác';
    }
    return '';
}

function validatePassword(pw) {
    if (!pw || pw === '') {
        return 'Vui lòng nhập mật khẩu';
    }
    if (pw.length < 8) {
        return 'Mật khẩu phải có ít nhất 8 ký tự';
    }
    if (!strongPwRegex.test(pw)) {
        return 'Mật khẩu phải có: chữ thường, chữ in hoa, số và ký tự đặc biệt';
    }
    return '';
}

function validatePhone(phone) {
    if (!phone || phone.trim() === '') {
        return 'Vui lòng nhập số điện thoại';
    }
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!phoneRegex.test(phone)) {
        return 'Số điện thoại không hợp lệ';
    }
    return '';
}

function validateGender(gender) {
    if (!gender || gender === '') {
        return 'Vui lòng chọn giới tính';
    }
    return '';
}

function validateTerms(terms) {
    if (!terms) {
        return 'Vui lòng đồng ý với điều khoản sử dụng';
    }
    return '';
}

// Show error function
function showError(id, msg) {
    const errorEl = document.getElementById('err-' + id);
    if (errorEl) {
        errorEl.textContent = msg || '';
    }
}

// Clear all errors
function clearAllErrors() {
    ['fullname', 'username', 'email', 'password', 'phone', 'gender', 'terms'].forEach(id => {
        showError(id, '');
    });
}

// Real-time validation on blur
document.getElementById('fullname').addEventListener('blur', function() {
    const error = validateFullname(this.value);
    showError('fullname', error);
    this.style.borderColor = error ? '#e74c3c' : '#e0e0e0';
});

document.getElementById('username').addEventListener('blur', function() {
    const error = validateUsernameFormat(this.value);
    showError('username', error);
    this.style.borderColor = error ? '#e74c3c' : '#e0e0e0';
});

document.getElementById('email').addEventListener('blur', function() {
    const error = validateEmailFormat(this.value);
    showError('email', error);
    this.style.borderColor = error ? '#e74c3c' : '#e0e0e0';
});

password.addEventListener('blur', function() {
    const error = validatePassword(this.value);
    showError('password', error);
    this.style.borderColor = error ? '#e74c3c' : '#e0e0e0';
});

document.getElementById('phone').addEventListener('blur', function() {
    const error = validatePhone(this.value);
    showError('phone', error);
    this.style.borderColor = error ? '#e74c3c' : '#e0e0e0';
});

document.getElementById('gender').addEventListener('change', function() {
    const error = validateGender(this.value);
    showError('gender', error);
    this.style.borderColor = error ? '#e74c3c' : '#e0e0e0';
});

document.getElementById('terms').addEventListener('change', function() {
    const error = validateTerms(this.checked);
    showError('terms', error);
});

// Clear errors on input
['fullname', 'username', 'email', 'password', 'phone'].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(231, 76, 60)') {
                this.style.borderColor = '#e0e0e0';
            }
            const errorEl = document.getElementById('err-' + id);
            if (errorEl && errorEl.textContent) {
                errorEl.textContent = '';
            }
        });
    }
});

// Form submit
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearAllErrors();
    
    // Get values
    const fullname = form.fullname.value.trim();
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const gender = form.gender.value;
    const pw = form.password.value;
    const terms = form.terms.checked;
    
    
    // Validate all fields
    let isValid = true;
    
    const fullnameError = validateFullname(fullname);
    if (fullnameError) {
        showError('fullname', fullnameError);
        form.fullname.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    const usernameError = validateUsername(username);
    if (usernameError) {
        showError('username', usernameError);
        form.username.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    const emailError = validateEmail(email);
    if (emailError) {
        showError('email', emailError);
        form.email.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    const passwordError = validatePassword(pw);
    if (passwordError) {
        showError('password', passwordError);
        password.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    const phoneError = validatePhone(phone);
    if (phoneError) {
        showError('phone', phoneError);
        form.phone.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    const genderError = validateGender(gender);
    if (genderError) {
        showError('gender', genderError);
        form.gender.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    const termsError = validateTerms(terms);
    if (termsError) {
        showError('terms', termsError);
        isValid = false;
    }
    
    if (!isValid) {
        // Scroll to first error
        const firstError = form.querySelector('.input-error:not(:empty)');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // Disable button và hiển thị loading
    registerButton.disabled = true;
    registerButton.classList.add('loading');
    
    // Lưu user vào localStorage
    const userData = {
        fullname,
        username,
        email,
        phone,
        gender,
        password: pw // Lưu password (trong thực tế nên hash password)
    };
    
    const result = addUser(userData);
    
    // Simulate API call delay
    setTimeout(() => {
        if (!result.success) {
            // Hiển thị lỗi nếu username/email đã tồn tại
            if (result.message.includes('Tên đăng nhập')) {
                showError('username', result.message);
                form.username.style.borderColor = '#e74c3c';
            } else if (result.message.includes('Email')) {
                showError('email', result.message);
                form.email.style.borderColor = '#e74c3c';
            }
            
            registerButton.disabled = false;
            registerButton.classList.remove('loading');
            return;
        }
        
        console.log('Đăng ký thành công! User đã được lưu:', result.user);
        
        // Success animation
        registerButton.classList.remove('loading');
        registerButton.classList.add('success');
        registerButton.querySelector('.button-text').textContent = 'Đăng ký thành công!';
        
        // Show success message
        setTimeout(() => {
            alert(`Đăng ký thành công! 🎉\n\nChào mừng ${fullname} đến với Lacoste!\n\nBạn có thể đăng nhập ngay bây giờ.`);
            
            // Redirect to login page
            window.location.href = '/Login/login.html';
        }, 500);
    }, 1500);
});

// Reset button
const resetBtn = document.querySelector('button[type="button"]');
if (resetBtn && resetBtn.textContent.includes('Đặt lại')) {
    resetBtn.addEventListener('click', function() {
        form.reset();
        clearAllErrors();
        document.getElementById('pw-strength').textContent = '';
        
        // Reset password checks
        ['pw-length', 'pw-lowercase', 'pw-uppercase', 'pw-number', 'pw-special'].forEach(id => {
            const item = document.getElementById(id);
            if (item) {
                item.classList.remove('valid');
            }
        });
        
        // Reset border colors
        form.querySelectorAll('.input-field').forEach(input => {
            input.style.borderColor = '#e0e0e0';
        });
    });
}

}); // End DOMContentLoaded

