const products = [
    { name: "Laptop ASUS", price: 15000000 },
    { name: "Chuột Logitech", price: 650000 },
    { name: "Bàn phím cơ", price: 1200000 },
    { name: "Tai nghe gaming", price: 850000 },
    { name: "Màn hình máy tính", price: 3500000 }
];

const searchInput = document.getElementById("searchInput");
const productList = document.getElementById("productList");
const message = document.getElementById("message");

function displayProducts(list) {
    if (!productList) return;

    productList.innerHTML = "";

    if (list.length === 0) {
        message.textContent = "Không tìm thấy sản phẩm!";
        return;
    }

    message.textContent = "";

    list.forEach(function(product) {
        const card = document.createElement("article");
        card.className = "product-card";

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent =
            "Giá: " + product.price.toLocaleString("vi-VN") + " VNĐ";

        card.appendChild(name);
        card.appendChild(price);
        productList.appendChild(card);
    });
}

if (searchInput) {
    searchInput.addEventListener("input", function() {
        const keyword = searchInput.value.trim().toLowerCase();

        const filteredProducts = products.filter(function(product) {
            return product.name.toLowerCase().includes(keyword);
        });

        displayProducts(filteredProducts);
    });
}


displayProducts(products);

// Bài 2: Xử lý form đăng ký
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    const registerMessage =
        document.getElementById("registerMessage");

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const fullname =
            document.getElementById("fullname").value.trim();
        const email =
            document.getElementById("email").value.trim();
        const password =
            document.getElementById("password").value;
        const agree =
            document.getElementById("agree").checked;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (fullname === "") {
            registerMessage.textContent = "Vui lòng nhập họ và tên.";
            return;
        }

        if (!emailPattern.test(email)) {
            registerMessage.textContent = "Email không hợp lệ.";
            return;
        }

        if (!passwordPattern.test(password)) {
            registerMessage.textContent =
                "Mật khẩu cần ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số.";
            return;
        }

        if (!agree) {
            registerMessage.textContent =
                "Bạn cần đồng ý với điều khoản sử dụng.";
            return;
        }

        const user = {
            fullname: fullname,
            email: email
        };

        try {
            localStorage.setItem(
                "registeredUser",
                JSON.stringify(user)
            );

            registerMessage.textContent =
                "Đăng ký thành công! Dữ liệu đã được lưu.";

            registerForm.reset();
        } catch (error) {
            registerMessage.textContent =
                "Không thể lưu dữ liệu trên trình duyệt.";
        }
    });
}


