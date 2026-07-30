const API_URL = "http://localhost:5000/api/auth/register";

document
.getElementById("registerBtn")
.addEventListener("click", register);

async function register(){

    const name=document.getElementById("name").value.trim();
    const email=document.getElementById("email").value.trim();
    const password=document.getElementById("password").value;
    const confirmPassword=document.getElementById("confirmPassword").value;

    if(name===""||email===""||password===""){

        alert("Please fill all fields");
        return;

    }

    if(password!==confirmPassword){

        alert("Passwords do not match");
        return;

    }

    const response=await fetch(API_URL,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            name,
            email,
            password

        })

    });

    const data=await response.json();

    alert(data.message);

    if(data.success){

        window.location="login.html";

    }

}