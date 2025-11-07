/* ===========================
   Xử lý kiểm tra form đăng nhập
   =========================== */

// Lấy form theo id
const loginForm = document.getElementById("loginForm")

// Gắn sự kiện "submit" (khi bấm nút đăng nhập)
loginForm.addEventListener("submit", function (event) {
    // Ngăn trình duyệt tải lại trang
    event.preventDefault()

    // Lấy giá trị người dùng nhập vào
    const username = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value.trim()

    // Kiểm tra nếu để trống
    if (username === "" || password === "") {
        alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!")
        return
    }

    // Kiểm tra độ dài mật khẩu tối thiểu 6 ký tự
    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự!")
        return
    }

    // Nếu hợp lệ thì báo đăng nhập thành công
    alert("Đăng nhập thành công! Xin chào " + username + " 😎")

    // Sau này có thể chuyển hướng sang trang chính:
    // window.location.href = "index.html"
})
