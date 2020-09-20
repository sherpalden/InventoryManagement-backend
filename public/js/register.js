//Register new user submit form
$(document).on('submit', '#registerForm', function(e) {
    e.preventDefault();
    var FormData = {
        email: $('#email').val(),
        password: $('#password').val(),
        phoneNumber: $('#phoneNumber').val()
    }
    $.ajax({
        url: 'https://localhost:3443/user/register',
        method: 'POST',
        data: FormData,
        beforeSend: function() {
            alert("Sending...")
        },
        success: function(response) {
            console.log(response);
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);
            console.log(response.token);
            alert(response.message);
            window.location.href = "../home.html";
        },
        error: function(jqXHR, status) {
            alert('Failed to register');
        }
    });
});
