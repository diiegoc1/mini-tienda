document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtn = document.querySelector(".dropdown-btn");
  const dropdownContent = document.querySelector(".dropdown-content");

  dropdownBtn.addEventListener("click", function () {
    dropdownContent.classList.toggle("show");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const agregarProd = document.querySelectorAll(".add-to-cart");
  const mostrarProd = document.getElementById("cart-list");
  const mostrarTotal = document.getElementById("total");

  let productosAgregados = [];

  agregarProd.forEach((boton) => {
    boton.addEventListener("click", () => {
      const nombreProducto = boton.getAttribute("data-name");
      const precioProducto = parseFloat(
        boton.getAttribute("data-price").replace(",", "")
      );

      // Verificar si el producto ya existe
      const productoExiste = productosAgregados.some(
        (producto) => producto.nombre === nombreProducto
      );

      if (!productoExiste) {
        productosAgregados.push({
          nombre: nombreProducto,
          precio: precioProducto,
          cantidad: 1,
        });
        actualizarCarrito();
      }
    });
  });

  function actualizarCarrito() {
    mostrarProd.innerHTML = "";
    let total = 0;

    productosAgregados.forEach((producto, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
            <div class="producto-info">
                <span class="producto-nombre">${producto.nombre}</span>
                <div class="producto-controls">
                    <div class="cantidad-control">
                        <button class="cantidad-btn menos" data-index="${index}">−</button>
                        <span class="cantidad">${producto.cantidad}</span>
                        <button class="cantidad-btn mas" data-index="${index}">+</button>
                    </div>
                    <span class="precio">$${(
                      producto.precio * producto.cantidad
                    ).toLocaleString("es-AR")}</span>
                    <button class="eliminar-btn" data-index="${index}">Eliminar</button>
                </div>
            </div>
        `;
      mostrarProd.appendChild(li);

      total += producto.precio * producto.cantidad;

      const finalizarBtn = document.getElementById("finalizar-compra");
      finalizarBtn.disabled = productosAgregados.length === 0;

      finalizarBtn.addEventListener("click", () => {
        if (productosAgregados.length > 0) {
          alert(
            `¡Compra finalizada!\nTotal: $${mostrarTotal.textContent}\nGracias por su compra.`
          );
          productosAgregados = [];
          actualizarCarrito();
          dropdownContent.classList.remove("show");
        }
      });
    });

    mostrarTotal.textContent = total.toFixed(2);

    // Agregar event listeners a los nuevos botones
    document.querySelectorAll(".cantidad-btn.menos").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        if (productosAgregados[index].cantidad > 1) {
          productosAgregados[index].cantidad--;
          actualizarCarrito();
        }
      });
    });

    document.querySelectorAll(".cantidad-btn.mas").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        productosAgregados[index].cantidad++;
        actualizarCarrito();
      });
    });

    document.querySelectorAll(".eliminar-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        productosAgregados.splice(index, 1);
        actualizarCarrito();
      });
    });
  }
});

/* SLIDE */
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    },
  },
});

/* Cambiar imagen de producto */
document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".product");

  products.forEach((product) => {
    const img = product.querySelector("img");
    const hoverSrc = img.getAttribute("data-hover");
    const originalSrc = img.src;

    // Cambia la imagen al entrar al producto
    product.addEventListener("mouseenter", () => {
      if (hoverSrc) img.src = hoverSrc;
    });

    // Restaura la imagen al salir del producto
    product.addEventListener("mouseleave", () => {
      img.src = originalSrc;
    });
  });
});
