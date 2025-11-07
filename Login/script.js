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