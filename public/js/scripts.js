/* Our custom JS scripts */
$(document).ready(function(){
   $('#datetimepicker1').datetimepicker();

   /* SESSIONS */ 

   /* Get Values */

   function logMeIn () {
   		var name = $("input[value='name']").val();
   		var email = $("input[email']").val();
   		var password = $("input[value='password']").val();

   		// Validate Email
   		ValidateEmail(email);

   		function ValidateEmail(mail) {
			 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(myForm.emailAddr.value))
			  { return (true) }
			    alert("You have entered an invalid email address!")
			    return (false) }

			var salt = "MyWiErDSa|tValuEEE";

			// Convert Password
			var myPass = md5(password + salt);

			// MYSQL CALL
			con.connect(function(err) {
			  if (err) throw err;
			  console.log("Connected!");
			  var sql = "INSERT INTO users (name, email, password) VALUES (name, email, password)";
			  con.query(sql, function (err, result) {
			    if (err) throw err;
			    console.log("1 record inserted");
			  });
			});

			// SET COOKIE
			setCookie(email,"Valid",30);

			function setCookie(cname, cvalue, exdays) {
			  var d = new Date();
			  d.setTime(d.getTime() + (exdays*24*60*60*1000));
			  var expires = "expires="+ d.toUTCString();
			  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
			}

			// Redirect
			window.location.replace("need_correct_url_path");
   };
});