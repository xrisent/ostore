const body = document.querySelector("body");

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3000/products/1");
    const data = await response.json();
    console.log(data);

    body.innerHTML = `
        <h1 class='title'>${data.title}</h1>
    `;
  } catch (error) {
    console.log(error);
  }
};

fetchData();
