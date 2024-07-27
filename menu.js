document.addEventListener("DOMContentLoaded", getMenu);

function getMenu() {
    fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
        .then(response => response.json())
        .then(data => {
            const menu = document.getElementById('menu');
            data.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item';
                menuItem.innerText = `${item.name} - $${item.price}`;
                menu.appendChild(menuItem);
            });
        })
        .catch(error => console.error('Error fetching menu:', error));
}

function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const burgers = ["Cheeseburger", "Chicken Burger", "Veggie Burger"];
            const order = {
                items: Array.from({ length: 3 }, () => burgers[Math.floor(Math.random() * burgers.length)])
            };
            resolve(order);
        }, 2500);
    });
}

function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

function thankyouFnc() {
    alert('Thank you for eating with us today!');
}

async function handleOrderProcess() {
    try {
        const order = await takeOrder();
        document.getElementById('orderStatus').innerText = `Order placed: ${order.items.join(', ')}`;
        
        const orderStatus = await orderPrep();
        if (orderStatus.order_status) {
            document.getElementById('orderStatus').innerText += '\nOrder prepared!';
            
            const paymentStatus = await payOrder();
            if (paymentStatus.paid) {
                document.getElementById('orderStatus').innerText += '\nOrder paid!';
                thankyouFnc();
            }
        }
    } catch (error) {
        console.error('Error handling order process:', error);
    }
}
