document.addEventListener("DOMContentLoaded", function() {
  /* === SLIDER === */
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  function showSlide(index) {
    if (index >= totalSlides) {
      slideIndex = 0;
    } else if (index < 0) {
      slideIndex = totalSlides - 1;
    } else {
      slideIndex = index;
    }
    const slidesWrapper = document.querySelector('.slides');
    if (slidesWrapper) {
      slidesWrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
    }
  }

  if (prev && next) {
    prev.addEventListener('click', () => showSlide(slideIndex - 1));
    next.addEventListener('click', () => showSlide(slideIndex + 1));
    setInterval(() => showSlide(slideIndex + 1), 5000);
  }

  /* === MENÚ HAMBURGUESA === */
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('nav .menu');
  if (hamburger && menu) {
    hamburger.addEventListener('click', () => menu.classList.toggle('active'));
  }

  /* === DATOS DE PRODUCTOS === */
  // Aquí se definen todos los productos. Se incluye la propiedad "gallery" para el producto que tenga imágenes adicionales.
  const products = [
    {
      id: "radiance-revive",
      name: "Radiance Revive",
      problem: "Piel opaca, reseca, con manchas e imperfecciones.",
      composition: "Vitamina A (principal) + Vitamina C + Blend de Colágeno y Ácido Hialurónico.",
      benefit: "Revitaliza la piel, ayuda a eliminar manchas y devuelve el brillo natural.",
      price: "$49.99",
      image: "src/radiance-revive.png",
      gallery: [
        "src/radiance-revive.png",
        "src/beauty-boost.png",
        "src/clear-complexion.png"
      ],
      category: "mujeres"
    },
    {
      id: "anti-aging-shield",
      name: "Anti-Aging Shield",
      problem: "Aparición de arrugas, líneas de expresión y daño por estrés ambiental.",
      composition: "Vitamina E (principal) + Vitamina C + Coenzima Q10 + Resveratrol.",
      benefit: "Protege y repara la piel, reduciendo los signos del envejecimiento.",
      price: "$59.99",
      image: "src/anti-aging-shield.png",
      category: "mujeres"
    },
    {
      id: "firm-elastic",
      name: "Firm & Elastic",
      problem: "Pérdida de firmeza y elasticidad en la piel.",
      composition: "Vitamina C (principal) + Colágeno + Ácido Hialurónico.",
      benefit: "Refuerza la estructura cutánea, aumentando la firmeza y tonificando la piel.",
      price: "$39.99",
      image: "src/firm-elastic.png",
      category: "mujeres"
    },
    {
      id: "clear-complexion",
      name: "Clear Complexion",
      problem: "Brotes de acné y exceso de sebo.",
      composition: "Vitamina B3 (Niacina) (principal) + Zinc + Extracto de Té Verde.",
      benefit: "Regula la producción de sebo, reduce la inflamación y ayuda a mantener una piel equilibrada.",
      price: "$44.99",
      image: "src/clear-complexion.png",
      category: "mujeres"
    },
    {
      id: "detox-glow",
      name: "Detox Glow",
      problem: "Piel sin vitalidad y opaca por la acumulación de toxinas.",
      composition: "Vitamina C (principal) + Ácido Alfa Lipoico + Probióticos.",
      benefit: "Desintoxica y estimula la renovación celular, aportando luminosidad.",
      price: "$54.99",
      image: "src/detox-glow.png",
      category: "mujeres"
    },
    {
      id: "vital-balance",
      name: "Vital Balance",
      problem: "Falta de energía y desequilibrios hormonales que afectan la apariencia.",
      composition: "Vitamina B6 (principal) + Vitamina B12 + Ginseng + Omega-3.",
      benefit: "Aumenta la vitalidad, ayuda a equilibrar las hormonas y mejora el aspecto general.",
      price: "$64.99",
      image: "src/vital-balance.png",
      category: "mujeres"
    },
    {
      id: "beauty-boost",
      name: "Beauty Boost",
      problem: "Cabello sin brillo y uñas quebradizas.",
      composition: "Biotina (Vitamina B7) (principal) + Vitamina D + Colágeno.",
      benefit: "Fortalece el cabello y las uñas, promoviendo un crecimiento sano.",
      price: "$34.99",
      image: "src/beauty-boost.png",
      category: "mujeres"
    },
    {
      id: "calm-restore",
      name: "Calm & Restore",
      problem: "Estrés que provoca irritación y brotes en la piel.",
      composition: "Vitamina B5 (principal) + Magnesio + Extracto de Manzanilla.",
      benefit: "Calma la irritación y mitiga los efectos del estrés.",
      price: "$29.99",
      image: "src/calm-restore.png",
      category: "mujeres"
    },
    {
      id: "immune-radiance",
      name: "Immune Radiance",
      problem: "Piel apagada y sin brillo debido a un sistema inmunológico debilitado.",
      composition: "Vitamina D (principal) + Vitamina C + Probióticos.",
      benefit: "Refuerza el sistema inmunológico y devuelve la luminosidad a la piel.",
      price: "$39.99",
      image: "src/immune-radiance.png",
      category: "mujeres"
    }
  ];

  /* === LISTADO DE PRODUCTOS (Página principal) === */
  const productListEl = document.getElementById("productList");
  if (productListEl) {
    function renderProducts(filter = "") {
      productListEl.innerHTML = "";
      const filteredProducts = products.filter(p => !filter || p.category === filter);
      filteredProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.setAttribute("data-category", product.category);
        productDiv.setAttribute("data-id", product.id);
        productDiv.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.benefit}</p>
          <button class="btn view-product" data-id="${product.id}">Ver Producto</button>
        `;
        productListEl.appendChild(productDiv);
      });
    }
    renderProducts();

    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const filterSelect = document.getElementById("filterSelect");

    if (searchBtn && searchInput && filterSelect) {
      searchBtn.addEventListener("click", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;
        const filtered = products.filter(product => {
          const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                product.benefit.toLowerCase().includes(searchTerm);
          const matchesFilter = !filterValue || product.category === filterValue;
          return matchesSearch && matchesFilter;
        });
        productListEl.innerHTML = "";
        filtered.forEach(product => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("product");
          productDiv.setAttribute("data-id", product.id);
          productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.benefit}</p>
            <button class="btn view-product" data-id="${product.id}">Ver Producto</button>
          `;
          productListEl.appendChild(productDiv);
        });
      });
    }

    // Al hacer clic en "Ver Producto", redirige a la plantilla de detalle usando el hash
    productListEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".view-product");
      if (btn) {
        const prodId = btn.getAttribute("data-id");
        window.location.href = "product-template.html#" + prodId;
      }
    });
  }

  /* === PÁGINA DE DETALLE DE PRODUCTO (Plantilla) === */
  const productContainer = document.getElementById("productContainer");
  if (productContainer) {
    const productId = window.location.hash.substring(1);
    if (productId) {
      const product = products.find(p => p.id === productId);
      if (product) {
        // Si el producto tiene galería, generamos miniaturas
        let galleryHTML = "";
        if (product.gallery && product.gallery.length) {
          galleryHTML = `
            <div class="product-gallery">
              ${product.gallery.map(img => `<img src="${img}" alt="${product.name}" class="gallery-thumb">`).join('')}
            </div>
          `;
        }
        productContainer.innerHTML = `
          <div class="product-detail-container">
            <div class="product-image">
              <img src="${product.image}" alt="${product.name}" id="mainProductImage">
              ${galleryHTML}
            </div>
            <div class="product-info">
              <h1>${product.name}</h1>
              <h3>Problema:</h3>
              <p>${product.problem}</p>
              <h3>Composición:</h3>
              <p>${product.composition}</p>
              <h3>Beneficio:</h3>
              <p>${product.benefit}</p>
              <p class="price">${product.price}</p>
              <div class="quantity-container">
                <label for="quantity">Cantidad</label>
                <input type="number" id="quantity" value="1" min="1">
              </div>
              <div class="buttons-container">
                <button class="btn add-to-cart">Agregar al carrito</button>
                <button class="btn buy-now">Comprar ahora</button>
              </div>
              <button class="subscribe">Suscribirse</button>
            </div>
          </div>
        `;

        // Agregar funcionalidad para cambiar la imagen principal al hacer clic en una miniatura
        const galleryThumbs = productContainer.querySelectorAll(".gallery-thumb");
        const mainProductImage = productContainer.querySelector("#mainProductImage");
        galleryThumbs.forEach(thumb => {
          thumb.addEventListener("click", () => {
            mainProductImage.src = thumb.src;
          });
        });
      } else {
        productContainer.innerHTML = "<p>Producto no encontrado.</p>";
      }
    } else {
      productContainer.innerHTML = "<p>No se especificó ningún producto.</p>";
    }

    productContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart")) {
        alert("Producto añadido al carrito.");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Seleccionar elementos
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".main-nav .menu");

  if (hamburger && menu) {
      // Agregar evento de clic a la hamburguesa
      hamburger.addEventListener("click", function() {
          menu.classList.toggle("active"); // Alternar visibilidad del menú
          hamburger.classList.toggle("active"); // Animación de la hamburguesa
      });

      // Cerrar el menú si se hace clic en un enlace del menú
      document.querySelectorAll(".main-nav .menu li a").forEach(link => {
          link.addEventListener("click", function() {
              menu.classList.remove("active");
              hamburger.classList.remove("active");
          });
      });
  }
});
