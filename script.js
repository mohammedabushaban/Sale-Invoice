const $btnPrint = document.querySelector("#btnPrint");
const tbl = document.getElementById("table");
const tblBody = document.getElementById("tbody");
const customer = document.getElementById("customer").value;
const form = document.getElementById("form");
const dateField = document.getElementById("date");
const totalItemPrice = document.getElementById("totalItem");

let totalPrice = 0;

$btnPrint.addEventListener("click", () => {
  for (let i = 0; i < form.length; i++) {
    if (form[i].checked) {
      addItem(form[i]);
      totalPrice = totalPrice + Number(form[i].dataset.price);
    }

    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.body.appendChild(tbl);
  }

  const trSum = document.createElement("tr");
  const tdTotal = document.createElement("td");
  const tdTotalText = document.createTextNode("المجموع");
  const tdSumPrice = document.createElement("td");
  const tdTotalPrice = document.createTextNode(totalPrice + " شيكل ");

  tdTotal.appendChild(tdTotalText);
  tdSumPrice.appendChild(tdTotalPrice);
  trSum.appendChild(tdTotal);
  trSum.appendChild(tdSumPrice);
  tblBody.appendChild(trSum);

  dateField.innerHTML = new Date().toLocaleString();
  const cach = document.getElementById("cach").value;
  const disc = document.getElementById("disc").value;

  const para = document.createElement("p");
  const node = document.createTextNode(
    `نقداً :  ${cach} شيكل  || خصم : ${disc} شيكل `
  );
  para.appendChild(node);
  const element = document.getElementById("body");
  element.appendChild(para);

  form.remove();
  $btnPrint.remove();
  window.print();
  location.reload();
});

function totalItem() {
  let total = 0;
  for (var i = 0; i < form.length; i++) {
    if (form[i].checked) {
      addItem(form[i]);
      total += Number(form[i].dataset.price);
    }
  }
  totalItemPrice.innerHTML = total;
}

let items = [];
function addItem(item) {
  if (!items.includes(item.name)) {
    items.push(item.name);
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const data = document.createTextNode(item.value);
    const cellPrice = document.createTextNode(
      Number(item.dataset.price) + " شيكل "
    );
    td1.classList.add("description");
    td2.classList.add("price");

    td1.appendChild(data);
    td2.appendChild(cellPrice);
    tr.appendChild(td1);
    tr.appendChild(td2);

    tblBody.appendChild(tr);
  }
}

// tdTotal.classList.add("description");
// tdSumPrice.classList.add("price");
