const brgBtn = document.querySelector(".burger-btn");

brgBtn.onclick = () => {
  const brgMenu = document.querySelector(".burger");
  brgMenu.classList.toggle("active");
};

const cardsDiv = document.querySelector(".cards");

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    cardsDiv.innerHTML = "";
    data.map((el) => {
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
          </div>
      `;
    });
  } catch (error) {
    console.log(error);
  }
};

fetchData();
