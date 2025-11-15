<<<<<<< HEAD
/* ===========================
   Xử lý đăng nhập bằng localStorage
   =========================== */

// Lấy form theo id
const loginForm = document.getElementById("loginForm")

// Khi người dùng bấm “Đăng ký tại đây”
document.getElementById("fakeRegister").addEventListener("click", function () {
    // Giả lập người dùng đăng ký
    const sampleUser = {
        username: "hocvien",
        password: "123456"
    }

    // Lưu vào localStorage (giống như database nhỏ trong trình duyệt)
    localStorage.setItem("userData", JSON.stringify(sampleUser))

    alert("Tạo tài khoản mẫu thành công!\nTên: hocvien\nMật khẩu: 123456 😎")
})


// Sự kiện khi form được submit
loginForm.addEventListener("submit", function (event) {
    // Ngăn trình duyệt tải lại trang
    event.preventDefault()

    // Lấy dữ liệu người dùng nhập
    const username = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value.trim()

    // Kiểm tra để trống
    if (username === "" && password === "") {
        alert("Vui lòng nhập tên đăng nhập và mật khẩu!")
        return
    }

    if (username === "") {
        alert("Bạn chưa nhập tên đăng nhập!")
        return
    }

    if (password === "") {
        alert("Bạn chưa nhập mật khẩu!")
        return
    }

    // Lấy tài khoản đã lưu trong localStorage (nếu có)
    const savedUser = JSON.parse(localStorage.getItem("userData"))

    // Nếu chưa đăng ký thì báo lỗi
    if (!savedUser) {
        alert("Chưa có tài khoản nào được tạo! Hãy bấm Đăng ký trước nha 😅")
        return
    }

    // So sánh thông tin nhập vào với thông tin đã lưu
    if (username === savedUser.username && password === savedUser.password) {
        alert("Đăng nhập thành công! Xin chào " + username + " 🎉")

        // Sau này có thể chuyển hướng sang trang chính:
        // window.location.href = "index.html"
    } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!")
    }
})
=======
// ===========================
// Xử lý form đăng nhập nâng cao
// ===========================

// ===========================
// Utility Functions cho localStorage (đồng bộ với Register)
// ===========================

// Lấy danh sách users từ localStorage
function getUsers() {
    const users = localStorage.getItem('lacoste_users');
    return users ? JSON.parse(users) : [];
}

// Tìm user theo username hoặc email
function findUserByUsernameOrEmail(identifier) {
    const users = getUsers();
    return users.find(user => 
        user.username.toLowerCase() === identifier.toLowerCase() || 
        user.email.toLowerCase() === identifier.toLowerCase()
    );
}

// Lưu thông tin user hiện tại đang đăng nhập
function setCurrentUser(user) {
    // Không lưu password trong current user
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem('lacoste_current_user', JSON.stringify(userWithoutPassword));
}

// Lấy thông tin user hiện tại
function getCurrentUser() {
    const user = localStorage.getItem('lacoste_current_user');
    return user ? JSON.parse(user) : null;
}

// Đăng xuất (xóa current user)
function logout() {
    localStorage.removeItem('lacoste_current_user');
}

// Đợi DOM load xong
document.addEventListener('DOMContentLoaded', function() {
// Lấy các elements
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const passwordToggle = document.getElementById("passwordToggle");
const loginButton = document.getElementById("loginButton");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");
const rememberMe = document.getElementById("rememberMe");

// Toggle hiển thị mật khẩu
if (passwordToggle) {
    passwordToggle.addEventListener("click", function() {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        
        // Thay đổi icon
        const eyeIcon = passwordToggle.querySelector(".eye-icon");
        if (type === "text") {
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

// Validation real-time (chỉ kiểm tra format, không kiểm tra tồn tại)
function validateUsername(username) {
    if (username.trim() === "") {
        return "Vui lòng nhập email hoặc tên đăng nhập";
    }
    if (username.length < 3) {
        return "Tên đăng nhập phải có ít nhất 3 ký tự";
    }
    // Kiểm tra email format nếu có @
    if (username.includes("@")) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
            return "Email không hợp lệ";
        }
    }
    return "";
}

function validatePassword(password) {
    if (password === "") {
        return "Vui lòng nhập mật khẩu";
    }
    if (password.length < 8) {
        return "Mật khẩu phải có ít nhất 8 ký tự";
    }
    return "";
}

// Real-time validation
usernameInput.addEventListener("blur", function() {
    const error = validateUsername(usernameInput.value);
    usernameError.textContent = error;
    if (error) {
        usernameInput.style.borderColor = "#e74c3c";
    } else {
        usernameInput.style.borderColor = "#e0e0e0";
    }
});

passwordInput.addEventListener("blur", function() {
    const error = validatePassword(passwordInput.value);
    passwordError.textContent = error;
    if (error) {
        passwordInput.style.borderColor = "#e74c3c";
    } else {
        passwordInput.style.borderColor = "#e0e0e0";
    }
});

// Clear errors on input
usernameInput.addEventListener("input", function() {
    if (usernameError.textContent) {
        usernameError.textContent = "";
        usernameInput.style.borderColor = "#e0e0e0";
    }
});

passwordInput.addEventListener("input", function() {
    if (passwordError.textContent) {
        passwordError.textContent = "";
        passwordInput.style.borderColor = "#e0e0e0";
    }
});

// Xử lý submit form
loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Lấy giá trị
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate
    const usernameErr = validateUsername(username);
    const passwordErr = validatePassword(password);

    // Hiển thị lỗi
    usernameError.textContent = usernameErr;
    passwordError.textContent = passwordErr;

    if (usernameErr) {
        usernameInput.style.borderColor = "#e74c3c";
        usernameInput.focus();
        return;
    } else {
        usernameInput.style.borderColor = "#e0e0e0";
    }

    if (passwordErr) {
        passwordInput.style.borderColor = "#e74c3c";
        passwordInput.focus();
        return;
    } else {
        passwordInput.style.borderColor = "#e0e0e0";
    }

    // Tìm user trong localStorage
    const user = findUserByUsernameOrEmail(username);
    
    if (!user) {
        usernameError.textContent = "Tên đăng nhập hoặc email không tồn tại";
        usernameInput.style.borderColor = "#e74c3c";
        usernameInput.focus();
        return;
    }
    
    // Kiểm tra password
    if (user.password !== password) {
        passwordError.textContent = "Mật khẩu không chính xác";
        passwordInput.style.borderColor = "#e74c3c";
        passwordInput.focus();
        return;
    }

    // Disable button và hiển thị loading
    loginButton.disabled = true;
    loginButton.classList.add("loading");

    // Simulate API call (thay thế bằng API thật)
    setTimeout(() => {
        // Lưu thông tin user hiện tại
        setCurrentUser(user);
        
        // Lưu thông tin nếu chọn "Ghi nhớ"
        if (rememberMe.checked) {
            localStorage.setItem("rememberedUsername", username);
        } else {
            localStorage.removeItem("rememberedUsername");
        }

        // Success animation
        loginButton.classList.remove("loading");
        loginButton.classList.add("success");
        loginButton.querySelector(".button-text").textContent = "Đăng nhập thành công!";

        // Hiển thị thông báo
        setTimeout(() => {
            // Có thể thay bằng modal đẹp hơn
            const displayName = user.fullname || user.username;
            alert(`Đăng nhập thành công! Xin chào ${displayName} 👋\n\nChào mừng bạn đến với Lacoste!`);

            // Chuyển hướng về trang chủ
            window.location.href = "/src/index.html";
        }, 500);
    }, 1500);
});

// Enter key để submit
usernameInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        passwordInput.focus();
    }
});

passwordInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        loginForm.dispatchEvent(new Event("submit"));
    }
});

// Load remembered username
const rememberedUsername = localStorage.getItem("rememberedUsername");
if (rememberedUsername && usernameInput) {
    usernameInput.value = rememberedUsername;
    if (rememberMe) {
        rememberMe.checked = true;
    }
}

}); // End DOMContentLoaded
>>>>>>> main
