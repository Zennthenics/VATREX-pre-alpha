async function loadOrders(){

    const response = await fetch("https://YOUR_RENDER_URL.onrender.com/orders",{

        headers:{
            "x-admin-key":localStorage.getItem("adminPassword")
        }

    });

    if(!response.ok){

        alert("Unauthorized");

        return;

    }

    const orders = await response.json();

    const tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    orders.forEach(order=>{

        tbody.innerHTML += `
        <tr>
            <td>${order.id}</td>
            <td>${order.fullname}</td>
            <td>${order.phone}</td>
            <td>${order.productName}</td>
            <td>${order.productPrice} EGP</td>
        </tr>
        `;

    });

}

loadOrders();