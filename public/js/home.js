$(document).on('click', '#rootNode', function(e) {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    $.ajax({
        url: 'https://localhost:3443/category/createRootNode',
        method: 'POST',
        headers: {'Authorization': `Bearer ${accessToken} ${refreshToken}`},
        beforeSend: function() {
            alert("Sending")
        },
        success: function(response) {
            if(response.message == "logout") window.location.href = "../login.html";
            console.log(response.message)
            if(response.accessToken != null && response.accessToken != undefined) {
                localStorage.setItem("accessToken", response.accessToken);
            }
        },
        error: function(jqXHR, status) {
            alert('Failed!!!');
        }
    });
});

$(document).on('click', '#userProfile', function(e) {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    $.ajax({
        url: 'https://localhost:3443/user/test',
        method: 'POST',
        headers: {'Authorization': `Bearer ${accessToken} ${refreshToken}`},
        beforeSend: function() {
            alert("Sending")
        },
        success: function(response) {
            if(response.message == "logout") window.location.href = "../login.html";
            console.log(response.message)
            if(response.accessToken != null && response.accessToken != undefined) {
                localStorage.setItem("accessToken", response.accessToken);
            }
        },
        error: function(jqXHR, status) {
            alert('Failed!!!');
        }
    });
});

$(document).on('submit', '#catForm', function(e) {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    var FormData = {
        parentCategory: $('#parentCat').val(),
        newCategory: $('#catName').val(),
    }
    $.ajax({
        url: 'https://localhost:3443/category/addCategory',
        method: 'POST',
        data: FormData,
        headers: {'Authorization': `Bearer ${accessToken} ${refreshToken}`},
        beforeSend: function() {
            alert("Sending")
        },
        success: function(response) {
            if(response.message == "logout") window.location.href = "../login.html";
            console.log(response.message);
            if(response.accessToken != null && response.accessToken != undefined) {
                localStorage.setItem("accessToken", response.accessToken);
            }
        },
        error: function(jqXHR, status) {
            alert(status);
        }
    });
});

$(document).on('submit', '#productForm', function(e) {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    var FormData = {
        name: $('#productName').val(),
        categoryName: $('#categoryName').val(),
        baseUnit: $('#baseUnit').val(),
        imagePath: $('#imagePath').val(),
        description: $('#description').val()
    }
    $.ajax({
        url: 'https://localhost:3443/product/addProduct',
        method: 'POST',
        data: FormData,
        headers: {'Authorization': `Bearer ${accessToken} ${refreshToken}`},
        beforeSend: function() {
            alert("Sending")
        },
        success: function(response) {
            if(response.message == "logout") window.location.href = "../login.html";
            console.log(response.message);
            if(response.accessToken != null && response.accessToken != undefined) {
                localStorage.setItem("accessToken", response.accessToken);
            }
        },
        error: function(jqXHR, status) {
            alert(status);
        }
    });
});

$(document).on('click', '#mainCat', function(e) {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    $.ajax({
        url: 'https://localhost:3443/category/getAllData',
        method: 'GET',
        headers: {'Authorization': `Bearer ${accessToken} ${refreshToken}`},
        beforeSend: function() {
            alert("Sending")
        },
        success: function(response) {
            if(response.message == "logout") window.location.href = "../login.html";
            console.log(response.message);
            const data = response.message;
            console.log(Object.keys(data).length);
            if(response.accessToken != null && response.accessToken != undefined) {
                localStorage.setItem("accessToken", response.accessToken);
            }
            /*display tree data*/
            let rootNode = document.getElementById('mainCat');
            let dataLen = Object.keys(data).length;
            let stack = [];
            stack.push(rootNode);
            let parentNode = stack.pop();
            stack.push(parentNode);
            for(let i=0; i<dataLen; i++){
                //create Node
                let newNode = document.createElement('ul');
                newNode.appendChild(document.createTextNode(data[i].name));
                newNode.setAttribute("data-id", data[i].id);
                parentNode.appendChild(newNode);
                if(i+1 < dataLen ){
                    if(data[i].depth < data[i+1].depth){
                        stack.push(newNode);
                        stack.push(newNode);
                        parentNode = stack.pop();
                    }
                    else if(data[i].depth > data[i+1].depth){
                        stack.pop();
                        parentNode = stack.pop();
                        stack.push(parentNode);
                    }
                }
            }
            /*display tree data*/

            // window.location.href = "../index.html";
        },
        error: function(jqXHR, status) {
            alert('Failed to get data');
        }
    });
});
