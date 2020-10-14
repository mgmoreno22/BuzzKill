require('dotenv').config()

/* Our custom JS scripts */
$(document).ready(function(){
   $('#datetimepicker1').datetimepicker();

   // CONFIG
   var dashboard_path = "Need_to_set_correct_path";

   /* PAGE NAVIGATION */
   // login and register forms
   $('#loginBtn').click(() => {
      // Html blocks must have correct d-none classes
      window.location = "./login.html"
   })

   $('#registerBtn').click(() => {
      window.location = "./signup.html"
   })

   // $('#close-report').click(() => {
   //    $('#report-data').addClass("d-none");
   //    $('#covid-data').removeClass("d-none");
   // })


   /* SESSIONS */ 

   /* Get Values + REGISTRATION*/

   function registerMe () {
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

			var salt = process.env.password_salt;

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
			setCookie(email,"Valid",30); // Adjustments

			function setCookie(cname, cvalue, exdays) {
			  var d = new Date();
			  d.setTime(d.getTime() + (exdays*24*60*60*1000));
			  var expires = "expires="+ d.toUTCString();
			  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
			}

			// Redirect
			window.location.replace(dashboard_path);
   };


   // LOGIN FUNCTION
   function logMeIn () {
      var email = $("input['email']").val();
      var password = $(md5("input[value='password']").val()+salt);

      con.connect(function(err) {
         if (err) throw err;
         con.query("SELECT * FROM users WHERE email = '"+email+"' && password = '"+password+"'", function (err, result, fields) {
            if (err) throw err;

            if (result.length == 0) {
            // SHOW ERROR & REDIRECT



            }

            // SET COOKIE
            setCookie(email,"Valid",30);

            function setCookie(cname, cvalue, exdays) {
               var d = new Date();
               d.setTime(d.getTime() + (exdays*24*60*60*1000));
               var expires = "expires="+ d.toUTCString();
               document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            }

            // Redirect
            window.location.replace(dashboard_path);
         });
      });

		
		// LOGOUT FUNCTION
		function clearAllCookies () {
			for (var it in $.cookie()) $.removeCookie(it);

		// REDIRECT TO LOGIN SCREEN
	
      };
   }

});