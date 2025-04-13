
// Productos de ejemplo
const productos = [
  { id: 1, nombre: "Remera Oversize", precio: 8000 },
  { id: 2, nombre: "Jogger Premium", precio: 12000 },
  { id: 3, nombre: "Accesorio Neon", precio: 3500 },
  { id: 4, nombre: "Buzo Negro", precio: 14000 }
];

const carrito = [];

function escaparHTML(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (producto) {
    carrito.push(producto);
    renderCarrito();
  }
}

function renderCarrito() {
  const contenedor = document.getElementById("carrito");
  if (!contenedor) return;
  contenedor.innerHTML = carrito.map(p => 
    `<li>${escaparHTML(p.nombre)} - $${p.precio}</li>`
  ).join("");
}

function enviarPedido() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  fetch("/api/pedido", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      nombre: "Cliente Demo",
      email: "cliente@ejemplo.com",
      producto: "Carrito múltiple",
      cantidad: carrito.length
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.mensaje);
    carrito.length = 0;
    renderCarrito();
  })
  .catch(err => {
    console.error("Error al enviar pedido:", err);
  });
}

// Agregar listeners a los botones si están en el DOM
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("button[data-id]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"));
      agregarAlCarrito(id);
    });
  });

  const btnEnviar = document.getElementById("btn-enviar");
  if (btnEnviar) {
    btnEnviar.addEventListener("click", enviarPedido);
  }
});
