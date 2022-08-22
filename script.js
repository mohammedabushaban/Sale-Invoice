const btnPrint = document.querySelector("#btnPrint");
const tbl = document.getElementById("table");
const tblBody = document.getElementById("tbody");
const customer = document.getElementById("customer").value;
const form = document.getElementById("form");
const dateField = document.getElementById("date");
const timeField = document.getElementById("time");
const totalItemPrice = document.getElementById("totalItem");
const container = document.querySelector("flex-child magenta");

let totalPrice = 0;
let items = [];
let i = 1;

function addItem(item) {
  // Get element number of id
  index = Number(item.name.charAt(item.name.length - 1));
  // Check if item is selected /checked and add to list
  if (!items.includes(item.name)) {
    items.push(item.name);

    let qty = Number(document.getElementById(`quantity-${index}`).value) || 1;

    const tr = document.createElement("tr");
    const tdItemNum = document.createElement("td");
    const tdType = document.createElement("td");
    const tdQuantity = document.createElement("td");
    const tdPrice = document.createElement("td");
    const tdTotal = document.createElement("td");

    const num = document.createTextNode(i++);
    const type = document.createTextNode(item.value);
    const quantity = document.createTextNode(qty);
    const itemPrice = document.createTextNode(Number(item.dataset.price));
    const cellTotal = document.createTextNode(Number(item.dataset.price) * qty);

    totalPrice = totalPrice + Number(item.dataset.price * qty);
    // This total for HTML Page View
    totalItemPrice.innerHTML = totalPrice;

    tdType.classList.add("description");
    tdPrice.classList.add("price");
    tr.setAttribute("id", index);

    tdItemNum.appendChild(num);
    tdType.appendChild(type);
    tdQuantity.appendChild(quantity);
    tdPrice.appendChild(itemPrice);
    tdTotal.appendChild(cellTotal);

    tr.appendChild(tdItemNum);
    tr.appendChild(tdType);
    tr.appendChild(tdQuantity);
    tr.appendChild(tdPrice);
    tr.appendChild(tdTotal);

    tblBody.appendChild(tr);
  }
}

function checkedItem() {
  for (var i = 0; i < form.length; i++) {
    if (form[i].checked) {
      addItem(form[i]);
      // total += Number(form[i].dataset.price);
    }
  }
}

const print = function () {
  const customer = document.getElementById("customer").value;
  document.getElementById("customerName").innerHTML = `الاسم : ${customer}`;

  for (let i = 0; i < form.length; i++) {
    if (form[i].checked) {
      addItem(form[i]);
      // totalPrice = totalPrice + Number(form[i].dataset.price);
    }

    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.body.appendChild(tbl);
  }

  const trSum = document.createElement("tr");
  const tdTotal = document.createElement("td");
  const tdTotalText = document.createTextNode("المــــجــــمـــوع");
  tdTotal.setAttribute("colspan", "4");
  const tdSumPrice = document.createElement("td");
  const tdTotalPrice = document.createTextNode(totalPrice);

  tdTotal.appendChild(tdTotalText);
  tdSumPrice.appendChild(tdTotalPrice);
  trSum.appendChild(tdTotal);
  trSum.appendChild(tdSumPrice);
  tblBody.appendChild(trSum);

  dateField.innerHTML = new Date().toLocaleDateString() + " : التاريخ";
  timeField.innerHTML = new Date().toLocaleTimeString() + ": الوقت";

  const cach = document.getElementById("cach").value;
  const disc = document.getElementById("disc").value;

  // check if Cach less than disc
  if (disc > cach || cach < 0) {
    alert("نسبة الخصم اكبر من المدفوع !");
    location.reload();
  } else {
    const para = document.createElement("p");
    const node = document.createTextNode(
      `نقداً :  ${cach} شيكل  || خصم : ${disc} شيكل `
    );
    para.appendChild(node);
    const element = document.getElementById("body");
    element.appendChild(para);

    form.remove();
    btnPrint.remove();
    window.print();
    location.reload();
  }
};

btnPrint.addEventListener("click", print);
document.addEventListener("keydown", (e) => {
  if (e.key === "F2") {
    print();
  }
});

// function removeItem(item) {
//   elementIndex = item.name.charAt(item.name.length - 1);
//   index = Number(elementIndex);
//   items.splice(index);
//   console.log(items);
//   tbl.deleteRow(index)
// }

// tdTotal.classList.add("description");
// tdSumPrice.classList.add("price");
