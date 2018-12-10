$(document).ready(function() {
	// Fill in the placeholder values with the original ones
	$.ajax({
		url : "/users/account",
		headers: {'x-auth': window.localStorage.getItem("authToken")},
		type : "GET",
		responseType: "json",
		success: accountInfoSuccess,
		error : accountInfoError
	});
	// Password check can be preformed whent he password is enetered, focus, blur
	console.log("Inside ready")
	$("#update").click(sendUpdate); 
})

function accountInfoSuccess(data, textStatus, jqXHR) {
	// Add values to the placeholders
	console.log("Account Info Success");
	console.log(data)
	$("#email").val(data.email);
	$("#fullName").val(data.fullName);
	$("#deviceId").val(data.devices[0].deviceId);

}

function accountInfoError(jqXHR, textStatus, errorThrown) {
  // If authentication error, delete the authToken 
  // redirect user to sign-in page (which is index.html)
	console.log("Account Info Error");
	console.log(jqXHR);
	if (jqXHR.status === 401) {
		console.log("Authentication failed in Account Info");
		window.localStorage.removeItem("authToken");
		window.location.replace("signin.html");
	} 
	else {
		console.log("jqXHR");
		console.log(jqXHR);
		$("#error").html("Error: " + jqXHR.responseJSON.message);
		$("#error").show();
	}
}
// ----------------------------------------- //
function sendUpdate() {
	console.log("Send update request to server");
	var putData = {
		fullName: 		$("#fullName").val(),
		email: 				$("#email").val(),
		oldPassword: 	$("#oldPassword").val(),
		newPassword: 	$("#newPassword").val(),
		deviceId: 		$("#deviceId").val()
	}

	$.ajax({
		url: "/users/updateInfo",
		headers: {'x-auth': window.localStorage.getItem("authToken")},
		data: putData,
		type: "PUT",
		dataType: "json",
		success: updateSucces,
		error: updateError
	})
}

function updateSucces(data, textStatus, jqXHR) {
	console.log("Successfully updated info");
	console.log(data);
	// We need to send the token with success
	console.log("Inside success function");
	window.localStorage.setItem("authToken", data.token);
	console.log("Updated token to ");
	console.log(data.token);
	console.log("Take them to home page after this");
	window.location = "home.html";
}

function updateError(jqXHR, textStatus, errorThrown) {
	console.log("Error during update");
	console.log(jqXHR);
}

// ----------------------------------------- //
