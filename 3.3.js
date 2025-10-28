// Bước 2 & 4: Tạo mảng lưu trữ và hàm hiển thị
let products = ["Sony Xperia", "Samsung Galaxy", "Nokia 6", "Xiaomi Redmi Note 4", "Apple iPhone 6S", "Xiaomi Mi 5s Plus", "Apple iPhone 8 Plus", "Fujitsu F-04E", "Oppo A71"];

const productListBody = document.getElementById('product-list');
const productCount = document.getElementById('product-count');
const messageElement = document.getElementById('message');

// Hàm hiển thị danh sách sản phẩm ra bảng
function displayProducts() {
    // Xóa nội dung cũ
    productListBody.innerHTML = ''; 
    productCount.textContent = products.length;

    // Sử dụng vòng lặp để hiển thị danh sách sản phẩm trên một bảng
    // Bảng có 3 cột: STT (vòng lặp), Tên sản phẩm, và 2 cột nút (Sửa/Xóa)
    products.forEach((productName, index) => {
        const row = productListBody.insertRow(); // Thêm hàng mới

        // Cột 1: STT
        row.insertCell(0).textContent = index + 1; 

        // Cột 2: Tên sản phẩm
        row.insertCell(1).textContent = productName; 

        // Cột 3: Nút Sửa (Gọi hàm sửa và truyền index)
        const editCell = row.insertCell(2);
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        // Bước 6: Gọi hàm sửa sản phẩm
        editButton.onclick = () => showEditForm(index, productName); 
        editCell.appendChild(editButton);

        // Cột 4: Nút Xóa (Gọi hàm xóa và truyền index)
        const deleteCell = row.insertCell(3);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        // Bước 7: Gọi hàm xóa sản phẩm
        deleteButton.onclick = () => deleteProduct(index); 
        deleteCell.appendChild(deleteButton);
    });
}

// Gọi hàm hiển thị lần đầu
displayProducts();
// Bước 5: Gọi hàm thêm sản phẩm
document.getElementById('product-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn chặn form gửi đi

    const newProductNameInput = document.getElementById('product-name');
    const newProductName = newProductNameInput.value.trim();

    if (newProductName) {
        // Lấy tên mới nhập và đưa vào mảng
        products.push(newProductName); 
        
        // Hiển thị lại bảng
        displayProducts(); 
        
        // Reset ô nhập và hiển thị thông báo
        newProductNameInput.value = '';
        showMessage(`Đã thêm sản phẩm: "${newProductName}" vào danh sách.`);
    } else {
        showMessage('Vui lòng nhập tên sản phẩm.', 'red');
    }
});

function showMessage(msg, color = 'green') {
    messageElement.textContent = msg;
    messageElement.style.color = color;
    setTimeout(() => {
        messageElement.textContent = '';
    }, 3000); // Xóa thông báo sau 3 giây
}
// Bước 6: Gọi hàm sửa sản phẩm
const editForm = document.getElementById('edit-form');
const editNameInput = document.getElementById('edit-product-name');
const editIdInput = document.getElementById('edit-id');
const cancelEditBtn = document.getElementById('cancel-edit-btn');

function showEditForm(index, productName) {
    // Hiển thị form sửa và điền dữ liệu
    editForm.style.display = 'block';
    editNameInput.value = productName; // Hiển thị tên cũ ở ô nhập
    editIdInput.value = index;         // Lưu vị trí (index) của sản phẩm
    document.getElementById('product-name').focus(); // Di chuyển con trỏ lên ô nhập
    showMessage(`Đang sửa sản phẩm ở vị trí STT ${index + 1}.`);
}

editForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const index = parseInt(editIdInput.value); // Lấy vị trí
    const newName = editNameInput.value.trim(); // Lấy tên mới

    if (newName) {
        // Cập nhật lại tên sản phẩm đó ở trong mảng
        products[index] = newName; 
        
        // Cập nhật lại tên mới trong mảng và hiển thị lại bảng
        displayProducts(); 
        
        // Ẩn form sửa và thông báo
        editForm.style.display = 'none';
        showMessage(`Đã sửa tên sản phẩm STT ${index + 1} thành: "${newName}"`);
    } else {
        showMessage('Tên sản phẩm không được để trống.', 'red');
    }
});

cancelEditBtn.addEventListener('click', () => {
    editForm.style.display = 'none';
    showMessage('');
});
// Bước 7: Gọi hàm xóa sản phẩm
function deleteProduct(index) {
    const productName = products[index];

    // Xác nhận trước khi xóa (tùy chọn)
    if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${productName}"?`)) {
        // Xóa sản phẩm đó trong mảng.
        // Tìm vị trí của sản phẩm trong danh sách. (index đã được truyền vào)
        // Dùng splice để xóa phần tử tại vị trí index.
        products.splice(index, 1); 
        
        // Hiển thị lại bảng
        displayProducts();
        showMessage(`Đã xóa sản phẩm: "${productName}" khỏi danh sách.`);
        editForm.style.display = 'none'; // Đảm bảo ẩn form sửa nếu đang hiển thị
    }
}