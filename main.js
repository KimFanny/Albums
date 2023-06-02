const albums = [
  {
    id: 1,
    nombre: "Adele 21",
    Artista: "Adele",
    precios: 99,
    imagen: "Adele.jpg",
  },
  {
    id: 2,
    nombre: "CD Midnights",
    Artista: "taylor swifte",
    precios: 235,
    imagen: "taylor.jpg",
  },
  {
    id: 3,
    nombre: "Beyoncé",
    Artista: "Beyoncé",
    precios: 210,
    imagen: "beyonce.jpg",
  },
  {
    id: 4,
    nombre: "Indigo",
    Artista: "RM",
    precios: 250,
    imagen: "nam.jpg",
  },
  {
    id: 5,
    nombre: "The most beautiful moment in life",
    Artista: "BTS",
    precios: 270,
    imagen: "bts.jpg",
  },
  {
    id: 6,
    nombre: " The Highlights",
    Artista: "The Weeknd",
    precios: 270,
    imagen: "theweekend.jpg",
  },
];

const Cds = [];
const conten = document.querySelector(".lista");
const conta = document.querySelector("#count");
const cart = document.querySelector("#carrito");
const cerrar = document.querySelector("#close");
const factura_detalle = document.querySelector(".factura_detalle");
const factura = document.querySelector(".factura");

document.addEventListener("DOMContentLoaded", () => {
  let muestra = "";
  albums.forEach((album) => {
    muestra = `
    <div class="card_singles">
      <h1 class="nombre">${album.nombre}</h1>
      <img src="./imagenes/${album.imagen}" alt="album" class="img-album">
      <p>ARTISTA: ${album.Artista}</p>
      <p>Precio: ${album.precios}</p>
      <div>
        <button type="button" class="btn_add" value="${album.id}">
        Agregar al carrito
        </button>
      </div>
    </div>
   `;
    conten.innerHTML += muestra;
  });
});

conten.addEventListener("click", (l) => {
  let elemento = l.target;

  if (elemento.classList.contains("btn_add")) {
    let datos = buscarID(parseInt(elemento.value));
    Cds.push({
      id: datos.id,
      name: datos.nombre,
      descrip: datos.Artista,
      precio: parseInt(datos.precios),
    });
    conta.innerHTML = Cds.length;
  }
});

cart.addEventListener("click", () => {
  factura_detalle.innerHTML = "";
  factura_detalle.innerHTML = mostrarCarrito();
  factura.classList.add("factura_show");
});

cerrar.addEventListener("click", () => {
  factura.classList.remove("factura_show");
});

function buscarID(id) {
  return albums.find((album) => album.id === id);
}

function mostrarCarrito() {
  let contenido = "";

  if (Cds.length > 0) {
    contenido = `<table class="item_container">
    <tr>
    <th>Nombre</th>
    <th>Album</th>
    <th>Precio</th>
    <th>Eliminar</th>
  </tr>`;
    contenido += "";
    let total = 0;

    for (let item of Cds) {
      contenido += `
      <tr>
      <td>${item.name}</td>
      <td>${item.descrip}</td>
      <td>${item.precio}</td>
      <td><img class="trash" src="./imagenes/eliminar.png" alt="" id="${item.id}"></td>
      </tr>
      `;
      total += item.precio;
    }
    contenido += `
    <tr>
    <td> Total: </td>
    <td colspan = "2"> ${total}</td>
    </tr>
    </table>`;
  } else {
    contenido = `No hay productos en el carrito`;
  }

  return contenido;
}

factura_detalle.addEventListener("click", (l) => {
  let element = l.target;

  if (element.classList.contains("trash")) {
    //encontrar el elemento dentro del arreglo
    const pos = Cds.findIndex((item) => item.id === element.id);
    Cds.splice(pos, 1);
    factura_detalle.innerHTML = "";
    factura_detalle.innerHTML = mostrarCarrito();
    conta.innerHTML = Cds.length;
  }
});
