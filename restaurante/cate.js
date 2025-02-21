document.addEventListener("DOMContentLoaded", function () {
    // Obtenemos todos los botones de incremento y decremento
    const buttons = document.querySelectorAll(".contador button");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const input = this.parentElement.querySelector("input");
            let cantidad = parseInt(input.value) || 0;
            
            if (this.textContent === "+") {
                cantidad++;
            } else if (this.textContent === "-" && cantidad > 0) {
                cantidad--;
            }

            input.value = cantidad;

            actualizarCarrito();
        });
    });
});

function actualizarCarrito() {
    const cartItemsContainer = document.querySelector(".cart-items");
    cartItemsContainer.innerHTML = ""; // Limpiamos el carrito antes de actualizarlo
    let subtotal = 0;

    document.querySelectorAll(".menu-item").forEach(item => {
        const input = item.querySelector("input");
        let cantidad = parseInt(input.value) || 0;
        if (cantidad > 0) {
            const nombre = item.querySelector("h3").textContent;
            const precio = parseFloat(item.querySelector("p").textContent.replace("$", ""));
            const totalProducto = cantidad * precio;
            subtotal += totalProducto;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `<p>${nombre} (${cantidad}) - $${precio.toFixed(2)} c/u</p>
                                  <p>Total: $${totalProducto.toFixed(2)}</p>`;
            cartItemsContainer.appendChild(cartItem);
        }
    });

    // Calcular impuestos y total
    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}
