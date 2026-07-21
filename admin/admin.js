document.getElementById("loginButton").addEventListener("click", async () => {

    const password = document.getElementById("password").value;

    const response = await fetch("https://YOUR_RENDER_URL.onrender.com/admin/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            password
        })

    });

    if(response.ok){

        localStorage.setItem("adminPassword", password);

        window.location = "orders.html";

    }else{

        alert("Wrong password");

    }

});