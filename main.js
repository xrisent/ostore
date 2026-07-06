const brgBtn = document.querySelector(".burger-btn");

brgBtn.onclick = () => {
  const brgMenu = document.querySelector(".burger");
  brgMenu.classList.toggle("active");
};

const cartBtn = document.querySelector(".cart");
cartBtn.onclick = () => {
  const cartMenu = document.querySelector(".cart-div");
  cartMenu.classList.toggle("active");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartMenu.innerHTML = "";
  cart.map((el) => {
    cartMenu.innerHTML += `<div class="cart-el">
            <p>${el.product.title}</p>
            <p>${el.product.price}</p>
            <p>${el.quantity}</p>
          </div>`;
  });
};

const cardsDiv = document.querySelector(".cards");

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    cardsDiv.innerHTML = "";
    data?.map((el) => {
      cardsDiv.innerHTML += `
        <div class="card">
            <div class="badge">Новинка</div>
            <img src=${el.image} alt="" />
            <div class="info">
              <h2>${el.title}</h2>
              <div class="price">
                <div class="oldPrice">${el.price}</div>
                <div class="newPrice">${el.price - (el.price * el.discount) / 100}</div>
              </div>
            </div>
            <button data-id=${el.id} class="card-btn">Добавить в корзину</button>
          </div>
      `;
    });

    const cardBtns = document.querySelectorAll(".card-btn");
    cardBtns.forEach((el) => {
      el.addEventListener("click", () => {
        const obj = data.find(
          (product) =>
            Number(product.id) === Number(el.getAttribute("data-id")),
        );
        // вытаскиваю из localStorage массив корзины, если нет, то подставляю пустой массив
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // hasProduct - проверяет есть ли продукт в корзине
        const hasProduct = cart.find(
          (e) => Number(e.product.id) === Number(obj.id),
        );

        if (hasProduct) {
          cart.map((e) => {
            if (Number(e.product.id) === Number(obj.id)) {
              e.quantity += 1;
            }
          });
        } else {
          cart.push({ product: obj, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
      });
    });
  } catch (error) {
    console.log(error);
  }
};

fetchData();

// сохранить в localStorage значение 'privet' по ключику 'cart'
// localStorage.setItem("cart", "privet");

// удаляет ключик из localStorage
// localStorage.removeItem("cart");

// вытащить из localStorage значение 'privet' по ключику 'cart'
// console.log(localStorage.getItem("cart"));

// полностью очищает localStorage
// localStorage.clear();
