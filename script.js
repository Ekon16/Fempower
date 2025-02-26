// Al cargar el DOM, inicializamos la aplicación
document.addEventListener("DOMContentLoaded", () => {

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
     // Actualizar indicadores del slider
     if (indicators.length) {
       indicators.forEach(dot => dot.classList.remove('active'));
       indicators[slideIndex].classList.add('active');
     }
   }
 
   // Mejora 3: Agregar indicadores de posición (puntos) al slider
   const sliderSection = document.querySelector('.slider');
   const indicators = [];
   if (sliderSection && totalSlides > 1) {
     const indicatorsContainer = document.createElement('div');
     indicatorsContainer.className = 'indicators';
     for (let i = 0; i < totalSlides; i++) {
       const dot = document.createElement('span');
       dot.className = 'indicator-dot';
       if (i === 0) dot.classList.add('active');
       dot.addEventListener('click', () => showSlide(i));
       indicatorsContainer.appendChild(dot);
       indicators.push(dot);
     }
     sliderSection.appendChild(indicatorsContainer);
   }
 
   // Controles del slider (flechas prev/next)
   if (prev && next) {
     prev.addEventListener('click', () => showSlide(slideIndex - 1));
     next.addEventListener('click', () => showSlide(slideIndex + 1));
     setInterval(() => showSlide(slideIndex + 1), 5000);
     // Mejora 5: Permitir control del slider con teclado (Enter/Espacio)
     prev.addEventListener('keydown', (e) => {
       if (e.key === 'Enter' || e.key === ' ') {
         e.preventDefault();
         showSlide(slideIndex - 1);
       }
     });
     next.addEventListener('keydown', (e) => {
       if (e.key === 'Enter' || e.key === ' ') {
         e.preventDefault();
         showSlide(slideIndex + 1);
       }
     });
   }
 
   // Inicializar slider en la primera diapositiva
   showSlide(slideIndex);
 
  // Configuración de IndexedDB
  let db;
  const request = indexedDB.open("fempowerDB", 1);
  request.onupgradeneeded = (e) => {
    db = e.target.result;
    // Crear almacenes de objetos (stores) para usuarios, productos, carrito y compras
    const userStore = db.createObjectStore("users", { keyPath: "email" });
    const productStore = db.createObjectStore("products", { keyPath: "id" });
    const cartStore = db.createObjectStore("cart", { keyPath: "cartId", autoIncrement: true });
    const orderStore = db.createObjectStore("orders", { keyPath: "orderId", autoIncrement: true });
    orderStore.createIndex("byUser", "userEmail", { unique: false });
    // Datos iniciales de productos (solo la primera vez)
    const initialProducts = [
      {
        id: "radiance-revive",
        name: "Radiance Revive",
        problem: "Piel opaca, reseca, con manchas e imperfecciones.",
        composition: "Vitamina A (principal) + Vitamina C + Blend de Colágeno y Ácido Hialurónico.",
        benefit: "Revitaliza la piel, ayuda a eliminar manchas y devuelve el brillo natural.",
        price: "$49.99",
        image: "src/radiance-revive.png",
        category: "mujeres",
        stock: 50
      },
      {
        id: "anti-aging-shield",
        name: "Anti-Aging Shield",
        problem: "Aparición de arrugas, líneas de expresión y daño por estrés ambiental.",
        composition: "Vitamina E (principal) + Vitamina C + Coenzima Q10 + Resveratrol.",
        benefit: "Protege y repara la piel, reduciendo los signos del envejecimiento.",
        price: "$59.99",
        image: "src/anti-aging-shield.png",
        category: "mujeres",
        stock: 50
      },
      {
        id: "firm-elastic",
        name: "Firm & Elastic",
        problem: "Pérdida de firmeza y elasticidad en la piel.",
        composition: "Vitamina C (principal) + Colágeno + Ácido Hialurónico.",
        benefit: "Refuerza la estructura cutánea, aumentando la firmeza y tonificando la piel.",
        price: "$39.99",
        image: "src/firm-elastic.png",
        category: "mujeres",
        stock: 50
      },
      {
        id: "clear-complexion",
        name: "Clear Complexion",
        problem: "Brotes de acné y exceso de sebo.",
        composition: "Vitamina B3 (Niacina) (principal) + Zinc + Extracto de Té Verde.",
        benefit: "Regula la producción de sebo, reduce la inflamación y ayuda a mantener una piel equilibrada.",
        price: "$44.99",
        image: "src/clear-complexion.png",
        category: "mujeres",
        stock: 50
      },
      {
        id: "detox-glow",
        name: "Detox Glow",
        problem: "Piel sin vitalidad y opaca por la acumulación de toxinas.",
        composition: "Vitamina C (principal) + Ácido Alfa Lipoico + Probióticos.",
        benefit: "Desintoxica y estimula la renovación celular, aportando luminosidad.",
        price: "$54.99",
        image: "src/detox-glow.png",
        category: "mujeres",
        stock: 50
      },
      {
        id: "vital-balance",
        name: "Vital Balance",
        problem: "Falta de energía y desequilibrios hormonales que afectan la apariencia.",
        composition: "Vitamina B6 (principal) + Vitamina B12 + Ginseng + Omega-3.",
        benefit: "Aumenta la vitalidad, ayuda a equilibrar las hormonas y mejora el aspecto general.",
        price: "$64.99",
        image: "src/vital-balance.png",
        category: "mujeres",
        stock: 50
      },
      {
        id: "beauty-boost",
        name: "Beauty Boost",
        problem: "Cabello sin brillo y uñas quebradizas.",
        composition: "Biotina (Vitamina B7) (principal) + Vitamina D + Colágeno.",
        benefit: "Fortalece el cabello y las uñas, promoviendo un crecimiento sano.",
        price: "$34.99",
        image: "src/beauty-boost.png",
        category: "mujeres",
        stock: 50
      },
      {
        id: "calm-restore",
        name: "Calm & Restore",
        problem: "Estrés que provoca irritación y brotes en la piel.",
        composition: "Vitamina B5 (principal) + Magnesio + Extracto de Manzanilla.",
        benefit: "Calma la irritación y mitiga los efectos del estrés.",
        price: "$29.99",
        image: "src/calm-restore.png",
        category: "mujeres",
        stock: 50
      },
      {
        id: "immune-radiance",
        name: "Immune Radiance",
        problem: "Piel apagada y sin brillo debido a un sistema inmunológico debilitado.",
        composition: "Vitamina D (principal) + Vitamina C + Probióticos.",
        benefit: "Refuerza el sistema inmunológico y devuelve la luminosidad a la piel.",
        price: "$39.99",
        image: "src/immune-radiance.png",
        category: "mujeres",
        stock: 50
      }
    ];
    initialProducts.forEach(prod => productStore.add(prod));
  };
  request.onsuccess = (e) => {
    db = e.target.result;
    // Variables de estado
    let currentUserEmail = localStorage.getItem("loggedUser") || null;  // usuario actualmente autenticado (email) o null si invitado
    let appliedDiscount = 0;  // porcentaje de descuento aplicado (0 = ninguno, 0.10 = 10%, etc.)

    /** Actualiza el indicador del carrito en la cabecera **/
    function updateCartCount() {
      const cartCountSpan = document.getElementById("cart-count");
      if (!cartCountSpan) return;
      // Contar items del carrito para el usuario actual o invitado
      const userKey = currentUserEmail || "guest";
      const tx = db.transaction("cart", "readonly");
      const store = tx.objectStore("cart");
      const request = store.getAll();
      request.onsuccess = () => {
        const items = request.result;
        // Filtrar por usuario correspondiente
        const userItems = items.filter(item => item.userEmail === userKey);
        // Sumar cantidades
        const totalCount = userItems.reduce((sum, it) => sum + it.quantity, 0);
        cartCountSpan.textContent = totalCount;
      };
    }

    /** Mostrar popup de promoción en inicio si no se ha cerrado anteriormente **/
    function showPromoIfNeeded() {
      const promoModal = document.getElementById("promoModal");
      if (promoModal) {
        const promoClosed = localStorage.getItem("promoClosed");
        if (!promoClosed) {
          // Mostrar el popup
          promoModal.style.display = "block";
          const closeBtn = promoModal.querySelector(".close");
          closeBtn.addEventListener("click", () => {
            promoModal.style.display = "none";
            localStorage.setItem("promoClosed", "yes");
          });
        }
      }
    }

    /** Maneja el menú hamburguesa en móviles **/
    function setupHamburgerMenu() {
      const hamburger = document.querySelector(".hamburger");
      const nav = document.querySelector("nav.main-nav");
      if (hamburger && nav) {
        hamburger.addEventListener("click", () => {
          // Alternar clases para mostrar/ocultar menú móvil
          nav.classList.toggle("mobile-menu");
          nav.classList.toggle("active");
        });
        // Cerrar menú móvil al hacer clic en un enlace
        nav.querySelectorAll("ul.menu li a").forEach(link => {
          link.addEventListener("click", () => {
            nav.classList.remove("active");
            nav.classList.remove("mobile-menu");
          });
        });
      }
    }

    /** Cargar lista de productos (inicio y página productos) **/
    function loadProductList() {
      const productListEl = document.getElementById("productList");
      if (!productListEl) return;
      // Obtener todos los productos de IndexedDB
      const tx = db.transaction("products", "readonly");
      const store = tx.objectStore("products");
      const getReq = store.getAll();
      getReq.onsuccess = () => {
        let products = getReq.result;
        // Función para renderizar productos según filtro
        function renderProducts(filterCategory = "", searchTerm = "") {
          productListEl.innerHTML = "";  // limpiar lista
          const filtered = products.filter(product => {
            const matchesCategory = !filterCategory || product.category === filterCategory;
            const matchesSearch = !searchTerm || 
              product.name.toLowerCase().includes(searchTerm) || 
              product.benefit.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
          });
          filtered.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product");
            card.innerHTML = `
              <img src="${product.image}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>${product.benefit}</p>
              <button class="btn view-product" data-id="${product.id}">Ver Producto</button>
            `;
            productListEl.appendChild(card);
          });
        }
        // Renderizar inicialmente todos
        renderProducts();

        // Configurar filtrado por categoría y búsqueda
        const searchInput = document.getElementById("searchInput");
        const filterSelect = document.getElementById("filterSelect");
        const searchBtn = document.getElementById("searchBtn");
        if (searchBtn && searchInput && filterSelect) {
          searchBtn.addEventListener("click", () => {
            const term = searchInput.value.toLowerCase();
            const category = filterSelect.value;
            renderProducts(category, term);
          });
        }
        // Manejar clic en botón "Ver Producto"
        productListEl.addEventListener("click", (e) => {
          const btn = e.target.closest(".view-product");
          if (btn) {
            const prodId = btn.getAttribute("data-id");
            window.location.href = `product-template.html#${prodId}`;
          }
        });
      };
    }

    /** Cargar detalle de un producto en la página de producto **/
    function loadProductDetail() {
      const productContainer = document.getElementById("productContainer");
      if (!productContainer) return;
      const prodId = window.location.hash.substring(1);
      if (!prodId) {
        productContainer.innerHTML = "<p>No se especificó ningún producto.</p>";
        return;
      }
      // Obtener el producto específico de la base de datos
      const tx = db.transaction("products", "readonly");
      const store = tx.objectStore("products");
      const req = store.get(prodId);
      req.onsuccess = () => {
        const product = req.result;
        if (!product) {
          productContainer.innerHTML = "<p>Producto no encontrado.</p>";
          return;
        }
        // Construir HTML del detalle del producto
        let galleryHTML = "";
        // Si el producto tiene una galería de imágenes adicionales
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
                <input type="number" id="quantity" value="1" min="1" />
              </div>
              <div class="buttons-container">
                <button class="btn add-to-cart">Agregar al carrito</button>
                <button class="btn buy-now">Comprar ahora</button>
              </div>
            </div>
          </div>
        `;
        // Habilitar cambio de imagen principal al clicar miniaturas
        const thumbs = productContainer.querySelectorAll(".gallery-thumb");
        const mainImg = productContainer.querySelector("#mainProductImage");
        thumbs.forEach(thumb => {
          thumb.addEventListener("click", () => {
            mainImg.src = thumb.src;
          });
        });
        // Manejar clic en "Agregar al carrito" y "Comprar ahora"
        productContainer.addEventListener("click", (e) => {
          if (e.target.classList.contains("add-to-cart") || e.target.classList.contains("buy-now")) {
            const quantityInput = document.getElementById("quantity");
            const qty = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
            addItemToCart(product.id, qty);
            alert("Producto añadido al carrito.");
            updateCartCount();
            if (e.target.classList.contains("buy-now")) {
              // Si es "Comprar ahora", vamos al carrito para proceder al pago
              window.location.href = "cart.html";
            }
          }
        });
      };
    }

    /** Agregar un producto (y cantidad) al carrito en IndexedDB **/
    function addItemToCart(productId, quantity) {
      const userKey = currentUserEmail || "guest";
      const tx = db.transaction("cart", "readwrite");
      const store = tx.objectStore("cart");
      // Ver si ya existe ese producto en el carrito del usuario
      const getAllReq = store.getAll();
      getAllReq.onsuccess = () => {
        const items = getAllReq.result;
        let existingItem = items.find(item => item.userEmail === userKey && item.productId === productId);
        if (existingItem) {
          // Si ya está, sumamos la cantidad
          existingItem.quantity += quantity;
          store.put(existingItem);  // actualizar registro
        } else {
          // Si no existe, creamos nuevo item
          const newItem = { productId: productId, quantity: quantity, userEmail: userKey };
          store.add(newItem);
        }
      };
    }

    /** Cargar contenido del carrito en la página cart.html **/
    function loadCartPage() {
      const cartItemsBody = document.getElementById("cartItemsBody");
      if (!cartItemsBody) return;
      const emptyMsg = document.getElementById("emptyCart");
      const cartTotalElem = document.getElementById("cartTotal");
      // Obtener todos los items de carrito del usuario actual (o invitado)
      const userKey = currentUserEmail || "guest";
      const tx = db.transaction(["cart", "products"], "readonly");
      const cartStore = tx.objectStore("cart");
      const cartReq = cartStore.getAll();
      cartReq.onsuccess = () => {
        let cartItems = cartReq.result.filter(item => item.userEmail === userKey);
        if (cartItems.length === 0) {
          // Carrito vacío
          document.getElementById("cartItemsSection").style.display = "none";
          if (emptyMsg) emptyMsg.style.display = "block";
        } else {
          document.getElementById("cartItemsSection").style.display = "block";
          if (emptyMsg) emptyMsg.style.display = "none";
        }
        // Renderizar filas de la tabla del carrito
        let total = 0;
        cartItemsBody.innerHTML = "";
        cartItems.forEach(item => {
          const prod = db.transaction("products", "readonly").objectStore("products").get(item.productId);
          prod.onsuccess = () => {
            const product = prod.result;
            const priceNum = parseFloat(product.price.replace("$", "")) || 0;
            const subtotal = priceNum * item.quantity;
            total += subtotal;
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td><input type="number" min="1" value="${item.quantity}" data-id="${item.cartId}" class="cart-qty"></td>
              <td>$${subtotal.toFixed(2)}</td>
              <td><button class="btn remove-item" data-id="${item.cartId}">Eliminar</button></td>
            `;
            cartItemsBody.appendChild(row);
            updateTotalDisplay();
          };
        });
        // Función para actualizar la visualización del total (con descuento si aplica)
        function updateTotalDisplay() {
          // Recalcular total sumando de la tabla (en caso de cambios en cantidades)
          total = 0;
          cartItemsBody.querySelectorAll("tr").forEach(row => {
            const priceText = row.children[1].innerText; // precio con $
            const qtyVal = parseInt(row.querySelector(".cart-qty").value) || 1;
            const priceVal = parseFloat(priceText.replace("$", "")) || 0;
            total += priceVal * qtyVal;
          });
          // Aplicar descuento si existe
          let displayTotal = total;
          if (appliedDiscount > 0) {
            displayTotal = total * (1 - appliedDiscount);
          }
          cartTotalElem.innerHTML = `<strong>Total: $${displayTotal.toFixed(2)}</strong>`;
        }
        // Event: cambio de cantidad en inputs
        cartItemsBody.addEventListener("input", (e) => {
          if (e.target.classList.contains("cart-qty")) {
            const newQty = parseInt(e.target.value) || 1;
            if (newQty < 1) { e.target.value = 1; return; }
            const itemId = Number(e.target.getAttribute("data-id"));
            // Actualizar cantidad en IndexedDB
            const updateTx = db.transaction("cart", "readwrite");
            const store = updateTx.objectStore("cart");
            const getReq = store.get(itemId);
            getReq.onsuccess = () => {
              const item = getReq.result;
              if (item) {
                item.quantity = newQty;
                store.put(item);
              }
            };
            // Recalcular totales en la interfaz
            updateTotalDisplay();
          }
        });
        // Event: eliminar un item del carrito
        cartItemsBody.addEventListener("click", (e) => {
          if (e.target.classList.contains("remove-item")) {
            const cartId = Number(e.target.getAttribute("data-id"));
            const delTx = db.transaction("cart", "readwrite");
            const store = delTx.objectStore("cart");
            store.delete(cartId);
            // Remover la fila de la tabla directamente
            e.target.closest("tr").remove();
            // Actualizar total
            updateTotalDisplay();
            // Si quedó vacío, mostrar mensaje de carrito vacío
            if (!cartItemsBody.querySelector("tr")) {
              document.getElementById("cartItemsSection").style.display = "none";
              if (emptyMsg) emptyMsg.style.display = "block";
            }
            // Actualizar contador en header
            updateCartCount();
          }
        });
        // Event: aplicar código promocional
        const applyBtn = document.getElementById("applyPromo");
        const promoInput = document.getElementById("promoCode");
        const promoMsg = document.getElementById("promoMessage");
        if (applyBtn && promoInput) {
          applyBtn.addEventListener("click", () => {
            const code = promoInput.value.trim().toUpperCase();
            if (code === "PROMO10") {
              appliedDiscount = 0.10;  // 10% de descuento
              promoMsg.textContent = "¡Descuento del 10% aplicado!";
              promoMsg.style.color = "green";
            } else if (code) {
              appliedDiscount = 0;
              promoMsg.textContent = "Código no válido";
              promoMsg.style.color = "red";
            }
            updateTotalDisplay();
          });
        }
        // Event: enviar formulario de pago
        const paymentForm = document.getElementById("paymentForm");
        if (paymentForm) {
          paymentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // Validar datos de pago
            const name = document.getElementById("cardName").value.trim();
            const number = document.getElementById("cardNumber").value.replace(/\s+/g, ""); // quitar espacios
            const exp = document.getElementById("cardExp").value.trim();
            const cvv = document.getElementById("cardCVV").value.trim();
            // Validaciones simples
            if (name === "" || number === "" || exp === "" || cvv === "") {
              alert("Por favor, complete todos los campos de pago.");
              return;
            }
            // Validar número de tarjeta (16 dígitos numéricos por simplicidad)
            const numberDigits = number.replace(/\D/g, "");
            if (numberDigits.length < 13 || numberDigits.length > 19 || isNaN(Number(numberDigits))) {
              alert("Número de tarjeta inválido.");
              return;
            }
            // Validar fecha de expiración (formato MM/AA)
            const expRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
            if (!expRegex.test(exp)) {
              alert("Fecha de expiración inválida. Use formato MM/AA.");
              return;
            }
            // Validar CVV (3 o 4 dígitos)
            if (!/^\d{3,4}$/.test(cvv)) {
              alert("CVV inválido.");
              return;
            }
            if (!currentUserEmail) {
              alert("Debes iniciar sesión para completar la compra.");
              return;
            }
            // Si todas las validaciones pasan, procesar la "compra"
            processOrder();
          });
        }
        // Función para registrar la compra en IndexedDB
        function processOrder() {
          // Crear un registro de pedido (orden) con los datos actuales
          const orderTx = db.transaction(["orders", "cart", "products", "users"], "readwrite");
          const orderStore = orderTx.objectStore("orders");
          const cartStoreRW = orderTx.objectStore("cart");
          const productsStoreRW = orderTx.objectStore("products");
          const newOrder = {
            userEmail: currentUserEmail,
            date: new Date().toISOString(),
            items: [],
            total: 0,
            discountCode: appliedDiscount > 0 ? "PROMO10" : null
          };
          // Recalcular total real con descuento
          newOrder.total = appliedDiscount > 0 ? total * (1 - appliedDiscount) : total;
          // Llenar items con detalles (nombre, qty, precio unitario) y actualizar stock
          cartItems.forEach(item => {
            const prodReq = productsStoreRW.get(item.productId);
            prodReq.onsuccess = () => {
              const product = prodReq.result;
              if (product) {
                newOrder.items.push({
                  productId: product.id,
                  name: product.name,
                  quantity: item.quantity,
                  price: product.price
                });
                // Reducir el stock del producto
                product.stock = Math.max(0, product.stock - item.quantity);
                productsStoreRW.put(product);
              }
            };
          });
          // Agregar orden a la base de datos
          orderStore.add(newOrder);
          // Limpiar el carrito del usuario
          cartItems.forEach(item => {
            cartStoreRW.delete(item.cartId);
          });
          // Vaciar interfaz de carrito y actualizar contador
          cartItemsBody.innerHTML = "";
          updateCartCount();
          // Notificar éxito al usuario
          alert("¡Compra realizada con éxito! Puedes ver los detalles en Mi Cuenta.");
          window.location.href = "cuenta.html";
        }
      };
    }

    /** Configuración de la página Mi Cuenta (login/registro/perfil) **/
    function setupAccountPage() {
      const loginForm = document.getElementById("loginForm");
      const registerForm = document.getElementById("registerForm");
      const accountDetails = document.getElementById("accountDetails");
      const loginSection = document.getElementById("loginSection");
      const registerSection = document.getElementById("registerSection");
      const profileEmailSpan = document.getElementById("profileEmail");
      const profileNameSpan = document.getElementById("profileName");

      // Mostrar secciones según si el usuario está logueado o no
      function refreshAccountUI() {
        if (currentUserEmail) {
          // Usuario logueado: mostrar detalles, ocultar formularios
          loginSection.style.display = "none";
          registerSection.style.display = "none";
          accountDetails.style.display = "block";
          // Rellenar información del perfil
          profileEmailSpan.textContent = currentUserEmail;
          // Obtener nombre del usuario desde IndexedDB
          const tx = db.transaction("users", "readonly");
          const store = tx.objectStore("users");
          const req = store.get(currentUserEmail);
          req.onsuccess = () => {
            const user = req.result;
            if (user) {
              profileNameSpan.textContent = user.name || "";
            }
          };
          // Cargar historial de compras
          loadOrderHistory();
        } else {
          // No logueado: mostrar login/registro, ocultar detalles
          accountDetails.style.display = "none";
          loginSection.style.display = "block";
          registerSection.style.display = "none";
        }
      }

      // Cargar historial de compras del usuario actual
      function loadOrderHistory() {
        const historyDiv = document.getElementById("orderHistory");
        if (!historyDiv) return;
        historyDiv.innerHTML = "";
        const tx = db.transaction("orders", "readonly");
        const store = tx.objectStore("orders");
        const index = store.index("byUser");
        const ordersReq = index.getAll(currentUserEmail);
        ordersReq.onsuccess = () => {
          const orders = ordersReq.result;
          if (orders.length === 0) {
            historyDiv.innerHTML = "<p>No has realizado compras aún.</p>";
          } else {
            orders.forEach(order => {
              const date = new Date(order.date).toLocaleString();
              const orderElem = document.createElement("div");
              orderElem.classList.add("order");
              let itemsHTML = "<ul>";
              order.items.forEach(it => {
                itemsHTML += `<li>${it.name} (x${it.quantity})</li>`;
              });
              itemsHTML += "</ul>";
              orderElem.innerHTML = `<p><strong>Fecha:</strong> ${date} – <strong>Total:</strong> $${parseFloat(order.total).toFixed(2)}</p>${itemsHTML}`;
              historyDiv.appendChild(orderElem);
            });
          }
        };
      }

      // Mostrar formulario de registro
      const showRegLink = document.getElementById("showRegister");
      if (showRegLink) {
        showRegLink.addEventListener("click", () => {
          loginSection.style.display = "none";
          registerSection.style.display = "block";
        });
      }
      // Mostrar formulario de login
      const showLoginLink = document.getElementById("showLogin");
      if (showLoginLink) {
        showLoginLink.addEventListener("click", () => {
          registerSection.style.display = "none";
          loginSection.style.display = "block";
        });
      }
      // Evento de login
      if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const email = document.getElementById("loginUser").value.trim();
          const pass = document.getElementById("loginPass").value;
          if (!email || !pass) return;
          const tx = db.transaction("users", "readonly");
          const store = tx.objectStore("users");
          const req = store.get(email);
          req.onsuccess = () => {
            const user = req.result;
            if (user && user.password === pass) {
              // Inicio de sesión exitoso
              currentUserEmail = user.email;
              localStorage.setItem("loggedUser", currentUserEmail);
              // Si había items de invitado en el carrito, asignarlos al usuario
              mergeGuestCartIntoUser();
              refreshAccountUI();
              updateCartCount();
            } else {
              alert("Credenciales incorrectas. Verifica tu email y contraseña.");
            }
          };
        });
      }
      // Evento de registro
      if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const name = document.getElementById("regName").value.trim();
          const email = document.getElementById("regEmail").value.trim();
          const pass = document.getElementById("regPass").value;
          const passConf = document.getElementById("regPassConfirm").value;
          if (!name || !email || !pass) {
            alert("Completa todos los campos de registro.");
            return;
          }
          if (pass !== passConf) {
            alert("Las contraseñas no coinciden.");
            return;
          }
          // Crear nuevo usuario en la base de datos
          const tx = db.transaction("users", "readwrite");
          const store = tx.objectStore("users");
          const newUser = { email: email, name: name, password: pass };
          const addReq = store.add(newUser);
          addReq.onsuccess = () => {
            alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
            // Mostrar formulario de login automáticamente
            registerSection.style.display = "none";
            loginSection.style.display = "block";
            document.getElementById("loginUser").value = email;
          };
          addReq.onerror = () => {
            alert("No se pudo registrar. Es posible que el email ya esté registrado.");
          };
        });
      }
      // Evento de logout
      const logoutBtn = document.getElementById("logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("loggedUser");
          currentUserEmail = null;
          alert("Has cerrado sesión.");
          // Regresar a vista de login
          refreshAccountUI();
          updateCartCount();
        });
      }
      // Eventos para editar nombre de perfil
      const editNameBtn = document.getElementById("editNameBtn");
      const saveNameBtn = document.getElementById("saveNameBtn");
      const cancelEditNameBtn = document.getElementById("cancelEditName");
      const editNameField = document.getElementById("editNameField");
      if (editNameBtn && saveNameBtn) {
        editNameBtn.addEventListener("click", () => {
          editNameField.style.display = "block";
          document.getElementById("newName").value = profileNameSpan.textContent;
          editNameBtn.disabled = true;
        });
        cancelEditNameBtn.addEventListener("click", () => {
          editNameField.style.display = "none";
          editNameBtn.disabled = false;
        });
        saveNameBtn.addEventListener("click", () => {
          const newName = document.getElementById("newName").value.trim();
          if (!newName) {
            alert("El nombre no puede estar vacío.");
            return;
          }
          // Actualizar nombre en IndexedDB
          const tx = db.transaction("users", "readwrite");
          const store = tx.objectStore("users");
          const req = store.get(currentUserEmail);
          req.onsuccess = () => {
            const user = req.result;
            if (user) {
              user.name = newName;
              store.put(user);
              profileNameSpan.textContent = newName;
            }
          };
          editNameField.style.display = "none";
          editNameBtn.disabled = false;
        });
      }
      // Función para traspasar items de carrito de invitado al usuario logueado
      function mergeGuestCartIntoUser() {
        const tx = db.transaction("cart", "readwrite");
        const store = tx.objectStore("cart");
        const req = store.getAll();
        req.onsuccess = () => {
          const items = req.result;
          items.forEach(item => {
            if (item.userEmail === "guest") {
              // Si el usuario ya tenía ese producto en su carrito, sumar cantidades
              const duplicate = items.find(it => it.userEmail === currentUserEmail && it.productId === item.productId);
              if (duplicate) {
                duplicate.quantity += item.quantity;
                store.put(duplicate);
                store.delete(item.cartId); // eliminar el registro de invitado
              } else {
                // Actualizar item invitado al nuevo usuario
                item.userEmail = currentUserEmail;
                store.put(item);
              }
            }
          });
        };
      }

      // Inicializar la vista de la cuenta
      refreshAccountUI();
    }

    /** Manejar formulario de Contacto **/
    function setupContactForm() {
      const contactForm = document.getElementById("contactForm");
      if (!contactForm) return;
      const feedbackMsg = document.getElementById("contactFeedback");
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Simular envío de mensaje de contacto
        contactForm.style.display = "none";
        if (feedbackMsg) {
          feedbackMsg.style.display = "block";
        }
      });
    }

    // Ejecutar configuraciones según la página actual
    setupHamburgerMenu();
    updateCartCount();
    showPromoIfNeeded();
    loadProductList();
    loadProductDetail();
    loadCartPage();
    setupAccountPage();
    setupContactForm();
  };
  request.onerror = () => {
    console.error("Error al abrir la base de datos.");
  };


   /* === CHATBOT (Atención al Cliente IA) === */
   const chatButton = document.getElementById("chatButton");
   const chatWindow = document.getElementById("chatWindow");
   const chatClose = document.getElementById("chatClose");
   const chatInput = document.getElementById("chatInput");
   const sendBtn = document.getElementById("sendBtn");
   const chatMessages = document.getElementById("chatMessages");
   if (chatButton && chatWindow) {
     chatButton.addEventListener("click", () => {
       chatWindow.style.display = "flex";
       chatButton.style.display = "none";
       chatInput.focus();
     });
     chatClose.addEventListener("click", () => {
       chatWindow.style.display = "none";
       chatButton.style.display = "block";
     });
     // Función auxiliar para agregar mensajes al chat
     function addMessage(content, sender) {
       const msgDiv = document.createElement("div");
       msgDiv.classList.add("message", sender);
       msgDiv.textContent = content;
       chatMessages.appendChild(msgDiv);
       chatMessages.scrollTop = chatMessages.scrollHeight;
     }
     // Mejora 1: Respuestas automáticas basadas en palabras clave sobre productos/soporte
     function handleBotResponse(userMsg) {
       const msg = userMsg.toLowerCase();
       let reply = "Lo siento, solo puedo responder preguntas relacionadas con nuestros productos y soporte técnico.";
       if (msg.includes("precio") || msg.includes("coste") || msg.includes("cuesta")) {
         reply = "Nuestros precios varían según el producto. ¿Hay alguno en especial que te interese?";
       } else if (msg.includes("envio") || msg.includes("envío") || msg.includes("entrega")) {
         reply = "Ofrecemos envío gratuito en pedidos superiores a $50. Los envíos suelen tardar de 3 a 5 días hábiles.";
       } else if (msg.includes("garantia") || msg.includes("garantía") || msg.includes("devoluci")) {
         reply = "Todos nuestros productos cuentan con una garantía de satisfacción de 30 días. Si no estás satisfecha, puedes devolver el producto en ese periodo.";
       } else if (msg.includes("ingrediente") || msg.includes("ingredientes") || msg.includes("composición")) {
         reply = "Nuestros suplementos contienen ingredientes naturales y vitaminas. Puedes consultar la composición en la página de cada producto.";
       } else if (msg.includes("uso") || msg.includes("utilizar") || msg.includes("tomar")) {
         reply = "Cada producto tiene instrucciones específicas de uso. Por ejemplo, Radiance Revive se toma una vez al día con la comida.";
       } else if (msg.includes("soporte") || msg.includes("ayuda") || msg.includes("contacto")) {
         reply = "Claro, estoy aquí para ayudarte. ¿En qué puedo asistirte hoy?";
       }
       // Simular tiempo de respuesta de la IA
       setTimeout(() => {
         addMessage(reply, "bot");
       }, 1000);
     }
     // Enviar mensaje al hacer clic en el botón o presionar Enter
     sendBtn.addEventListener("click", () => {
       const message = chatInput.value.trim();
       if (message !== "") {
         addMessage(message, "user");
         chatInput.value = "";
         handleBotResponse(message);
       }
     });
     chatInput.addEventListener("keydown", (e) => {
       if (e.key === "Enter") {
         e.preventDefault();
         sendBtn.click();
       }
     });
   } 
});

