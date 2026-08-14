const nominalData = {
  mlbb: [
    { name: "86 Diamond", price: 20000 },
    { name: "172 Diamond", price: 40000 },
    { name: "257 Diamond", price: 58000 },
    { name: "344 Diamond", price: 78000 },
    { name: "429 Diamond", price: 96000 },
    { name: "514 Diamond", price: 115000 },
    { name: "706 Diamond", price: 155000 },
    { name: "1050 Diamond", price: 230000 },
    { name: "Weekly Pass", price: 28000 }
  ],

  freefire: [
    { name: "70 Diamond", price: 10000 },
    { name: "140 Diamond", price: 20000 },
    { name: "355 Diamond", price: 50000 },
    { name: "720 Diamond", price: 100000 },
    { name: "1450 Diamond", price: 200000 },
    { name: "2180 Diamond", price: 300000 },
    { name: "Member Mingguan", price: 30000 }
  ],

  pubg: [
    { name: "60 UC", price: 15000 },
    { name: "325 UC", price: 70000 },
    { name: "660 UC", price: 140000 },
    { name: "1800 UC", price: 360000 },
    { name: "3850 UC", price: 720000 }
  ],

  genshin: [
    { name: "60 Genesis", price: 16000 },
    { name: "300 Genesis", price: 80000 },
    { name: "980 Genesis", price: 250000 },
    { name: "1980 Genesis", price: 500000 },
    { name: "3280 Genesis", price: 800000 },
    { name: "6480 Genesis", price: 1500000 }
  ],

  hok: [
    { name: "16 Token", price: 5000 },
    { name: "80 Token", price: 20000 },
    { name: "240 Token", price: 55000 },
    { name: "400 Token", price: 90000 },
    { name: "800 Token", price: 175000 }
  ],

  roblox: [
    { name: "80 Robux", price: 15000 },
    { name: "400 Robux", price: 70000 },
    { name: "800 Robux", price: 140000 },
    { name: "1700 Robux", price: 280000 },
    { name: "4500 Robux", price: 700000 }
  ],

  valorant: [
    { name: "475 VP", price: 55000 },
    { name: "1000 VP", price: 105000 },
    { name: "2050 VP", price: 210000 },
    { name: "3650 VP", price: 360000 },
    { name: "5350 VP", price: 520000 }
  ],

  codm: [
    { name: "80 CP", price: 15000 },
    { name: "400 CP", price: 70000 },
    { name: "800 CP", price: 135000 },
    { name: "2000 CP", price: 320000 },
    { name: "4000 CP", price: 620000 }
  ],

  aov: [
    { name: "40 Voucher", price: 10000 },
    { name: "90 Voucher", price: 22000 },
    { name: "230 Voucher", price: 50000 },
    { name: "470 Voucher", price: 100000 },
    { name: "950 Voucher", price: 195000 }
  ],

  lol: [
    { name: "575 RP", price: 60000 },
    { name: "1380 RP", price: 135000 },
    { name: "2800 RP", price: 260000 },
    { name: "5000 RP", price: 450000 }
  ]
};


let currentGame = "";
let currentGameKey = "";
let selectedNominal = null;
let selectedPrice = 0;


/* =========================
   FORMAT RUPIAH
========================= */

function rupiah(number) {
  return "Rp " + Number(number).toLocaleString("id-ID");
}


/* =========================
   PILIH GAME
========================= */

function selectGame(name, key) {
  currentGame = name;
  currentGameKey = key;

  selectedNominal = null;
  selectedPrice = 0;

  const games = document.getElementById("games");
  const order = document.getElementById("orderSection");

  if (games) games.style.display = "none";
  if (order) order.style.display = "block";

  const title = document.getElementById("selectedGameTitle");
  const summaryGame = document.getElementById("summaryGame");
  const summaryNominal = document.getElementById("summaryNominal");
  const summaryTotal = document.getElementById("summaryTotal");
  const qty = document.getElementById("qty");
  const summaryQty = document.getElementById("summaryQty");

  if (title) title.textContent = name;
  if (summaryGame) summaryGame.textContent = name;
  if (summaryNominal) summaryNominal.textContent = "-";
  if (summaryTotal) summaryTotal.textContent = "Rp 0";
  if (qty) qty.value = 1;
  if (summaryQty) summaryQty.textContent = "1";

  renderNominals();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   NOMINAL
========================= */

function renderNominals() {
  const grid = document.getElementById("nominalGrid");

  if (!grid) return;

  grid.innerHTML = "";

  const list = nominalData[currentGameKey] || [];

  list.forEach(item => {
    const div = document.createElement("div");

    div.className = "nominal-item";

    div.innerHTML = `
      <img src="images/diamond.jpg" alt="${item.name}">
      <span class="diamond-count">${item.name}</span>
      <span class="price">${rupiah(item.price)}</span>
    `;

    div.addEventListener("click", function () {
      selectNominal(div, item.name, item.price);
    });

    grid.appendChild(div);
  });
}


function selectNominal(element, name, price) {
  document
    .querySelectorAll(".nominal-item")
    .forEach(item => item.classList.remove("active"));

  element.classList.add("active");

  selectedNominal = name;
  selectedPrice = price;

  updateSummary();
}


/* =========================
   QUANTITY
========================= */

function changeQty(delta) {
  const input = document.getElementById("qty");

  if (!input) return;

  let value = parseInt(input.value) || 1;

  value += delta;

  if (value < 1) value = 1;
  if (value > 99) value = 99;

  input.value = value;

  const summaryQty = document.getElementById("summaryQty");

  if (summaryQty) {
    summaryQty.textContent = value;
  }

  updateSummary();
}


/* =========================
   SUMMARY
========================= */

function updateSummary() {
  const qty =
    parseInt(document.getElementById("qty")?.value) || 1;

  const summaryNominal =
    document.getElementById("summaryNominal");

  const summaryTotal =
    document.getElementById("summaryTotal");

  const summaryQty =
    document.getElementById("summaryQty");

  if (summaryNominal) {
    summaryNominal.textContent =
      selectedNominal || "-";
  }

  if (summaryQty) {
    summaryQty.textContent = qty;
  }

  const total = selectedPrice * qty;

  if (summaryTotal) {
    summaryTotal.textContent = rupiah(total);
  }
}


/* =========================
   KEMBALI KE GAME
========================= */

function backToGames() {
  const order = document.getElementById("orderSection");
  const games = document.getElementById("games");

  if (order) order.style.display = "none";
  if (games) games.style.display = "block";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   ORDER WHATSAPP
========================= */

function submitOrder() {

  const playerId =
    document.getElementById("playerId")?.value.trim();

  const serverId =
    document.getElementById("serverId")?.value.trim();

  const name =
    document.getElementById("customerName")?.value.trim();

  const wa =
    document.getElementById("customerWa")?.value.trim();

  const qty =
    parseInt(document.getElementById("qty")?.value) || 1;

  const payment =
    document.querySelector(
      'input[name="payment"]:checked'
    )?.value || "-";


  if (!playerId) {
    alert("Masukkan User ID / Player ID dulu.");
    return;
  }

  if (!selectedNominal) {
    alert("Pilih nominal terlebih dahulu.");
    return;
  }

  if (!name) {
    alert("Masukkan nama lengkap.");
    return;
  }

  if (!wa) {
    alert("Masukkan nomor WhatsApp.");
    return;
  }


  const total = selectedPrice * qty;


  const message = `Halo Admin RanaShop 👋

Saya ingin melakukan pemesanan:

🎮 GAME
${currentGame}

🆔 USER ID
${playerId}

🌐 SERVER / ZONE
${serverId || "-"}

💎 NOMINAL
${selectedNominal}

🔢 JUMLAH
${qty}

💳 PEMBAYARAN
${payment}

💰 TOTAL
${rupiah(total)}

👤 NAMA
${name}

📱 WHATSAPP
${wa}

Mohon dibantu proses pesanannya.
Terima kasih 🙏`;


  const adminNumber = "62895417880954";

  const url =
    `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}


/* =========================
   SEARCH GAME
========================= */

document.addEventListener("DOMContentLoaded", function () {

  const search =
    document.getElementById("gameSearch");

  const cards =
    document.querySelectorAll(".game-card");

  if (!search || !cards.length) return;


  search.addEventListener("input", function () {

    const keyword =
      search.value.toLowerCase().trim();

    let visible = 0;


    cards.forEach(card => {

      const text =
        card.textContent.toLowerCase();

      const match =
        text.includes(keyword);

      card.style.display =
        match ? "" : "none";

      if (match) visible++;
    });


    const empty =
      document.getElementById("noResults");

    if (empty) {
      empty.style.display =
        visible === 0 ? "block" : "none";
    }

  });

});


/* =========================
   FILTER GAME
========================= */

document.addEventListener("DOMContentLoaded", function () {

  const filters =
    document.querySelectorAll(".filter-btn");

  const cards =
    document.querySelectorAll(".game-card");


  filters.forEach(button => {

    button.addEventListener("click", function () {

      filters.forEach(btn =>
        btn.classList.remove("active")
      );

      this.classList.add("active");

      const filter =
        this.dataset.filter || "all";


      cards.forEach(card => {

        const category =
          card.dataset.category || "all";

        if (
          filter === "all" ||
          category === filter
        ) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }

      });

    });

  });

});


/* =========================
   ESC KEY
========================= */

document.addEventListener("keydown", function (event) {

  if (event.key === "Escape") {

    const order =
      document.getElementById("orderSection");

    if (
      order &&
      order.style.display !== "none"
    ) {
      backToGames();
    }

  }

});
