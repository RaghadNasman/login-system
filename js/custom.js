

//regester
var regesterName = document.querySelector("#name");
var regesterEmail = document.querySelector("#email");
var regesterPassword = document.querySelector("#password");
var regesterErrorMessage = document.querySelector("#errorMessage");
var regesterButton = document.querySelector("#regester");

//login
var loginEmail = document.querySelector("#loginEmail");
var loginPassword = document.querySelector("#loginPassword");
var loginButton = document.querySelector("#login");
var loginErrorMessage = document.querySelector("#loginErr");

//home
var displayedName = document.querySelector("#name");
var nameContent;




var userInfo = JSON.parse(localStorage.getItem('userInfo')) || [];

if(regesterButton !=null) {
  
    //check if inputs is empty
    function checkInput() {
        if (regesterName.value != "" && regesterEmail.value != "" && regesterPassword.value != "") {
            return true;
        } else {
            return false;
        }
    }

    function checkEmail(email) {
        for (var i = 0; i < userInfo.length; i++) {
            if (userInfo[i].regEmail.trim().toLowerCase() === email.trim().toLowerCase()) {
                return false; 
            }
        }
        return true; 
    }

    function reset () {
        regesterName.value = '';
        regesterEmail.value = '';
        regesterPassword.value = '';
    }



    //function to add info 
    function add () {

        if (!checkInput()) {
            regesterErrorMessage.innerHTML = "All inputs are required";
            return false;
        }

       
        var info = {
            regName: regesterName.value,
            regEmail: regesterEmail.value,
            regPassword: regesterPassword.value
        };

        
        if (!checkEmail(info.regEmail)) {
            regesterErrorMessage.innerHTML = "Email already exists";
            return false;
        }

        userInfo.push(info);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        regesterErrorMessage.innerHTML = `<span class="d-block text-success text-center">Success, Go to sign in!</span>`;
        reset();
        return true;


        // -----------anohter sol-----------

        // if (checkInput() == true){
        //     var info = {
        //         regName : regesterName.value,
        //         regEmail : regesterEmail.value,
        //         regPassword : regesterPassword.value
        //     };
            
          
        //         if (checkEmail(info.regEmail) == true) {
        //             userInfo.push(info);
        //             localStorage.setItem('userInfo', JSON.stringify(userInfo));
        //             regesterErrorMessage.innerHTML = "success";
        //         }
        //         else {
        //             regesterErrorMessage.innerHTML = "email already exists";
        //         }
    
        // }
        
        // else {
        //     regesterErrorMessage.innerHTML = "All inputs are required";
        // }

    }
        
    regesterButton.addEventListener("click", add);
  
}

if (loginButton != null) {
    

     //check if inputs is empty
     function checkInput() {
        if (loginEmail.value != "" && loginPassword.value != "") {
            return true;
        } else {
            return false;
        }
    }

    //check if email and password is valid
    function isValidUser (email , password) {
        for (let i = 0; i < userInfo.length; i++) {
            if (userInfo[i].regEmail.trim().toLowerCase() == email.trim().toLowerCase() && userInfo[i].regPassword == password) {
                nameContent = userInfo[i].regName;
                localStorage.setItem('username', nameContent);
                console.log(nameContent);

                return true;
            }
        }
        return false;
    }

    function checkUser () {
        if (checkInput()) {

            if (isValidUser (loginEmail.value , loginPassword.value)) {
                window.location.href = "home.html";
            }
            else {
                loginErrorMessage.innerHTML = "Invalid email or password";
            }

        }
        else {
            loginErrorMessage.innerHTML = "All inputs is required";
        }
    }


    loginButton.addEventListener("click", checkUser);

}
 
if (document.body.classList.contains("home")) {
    displayedName.innerHTML = localStorage.getItem("username");

}








