/*
========================================
RANASHOP V2
========================================

HARGA DAN DATA GAME ADA DI SINI.

NOMOR WHATSAPP ADMIN:
62895417880954

Kalau nanti website ini diberikan ke klien,
nomor WA dan harga tinggal diganti di file ini.
*/


const games = [

  {
    name: "Mobile Legends",
    key: "mlbb",
    publisher: "Moonton",
    img: "mlbb.jpg",
    unit: "Diamond",
    icon: "💎",

    prices: [
      [86, 20000],
      [172, 40000],
      [257, 58000],
      [344, 78000],
      [429, 96000],
      [514, 115000],
      [706, 155000],
      [1050, 230000],
      [999, "Weekly Pass", 28000]
    ]
  },


  {
    name: "Free Fire",
    key: "freefire",
    publisher: "Garena",
    img: "freefire.jpg",
    unit: "Diamond",
    icon: "💠",

    prices: [
      [70, 10000],
      [140, 20000],
      [355, 50000],
      [720, 100000],
      [1450, 200000],
      [2180, 300000],
      [999, "Member Mingguan", 30000]
    ]
  },


  {
    name: "PUBG Mobile",
    key: "pubg",
    publisher: "Tencent",
    img: "pubg.jpg",
    unit: "UC",
    icon: "🪙",

    prices: [
      [60, 15000],
      [325, 70000],
      [660, 140000],
      [1800, 360000],
      [3850, 720000]
    ]
  },


  {
    name: "Genshin Impact",
    key: "genshin",
    publisher: "HoYoverse",
    img: "genshin.jpg",
    unit: "Genesis",
    icon: "💎",

    prices: [
      [60, 16000],
      [300, 80000],
      [980, 250000],
      [1980, 500000],
      [3280, 800000],
      [6480, 1500000]
    ]
  },


  {
    name: "Honor of Kings",
    key: "hok",
    publisher: "Tencent",
    img: "hok.jpg",
    unit: "Token",
    icon: "🟡",

    prices: [
      [16, 5000],
      [80, 20000],
      [240, 55000],
      [400, 90000],
      [800, 175000]
    ]
  },


  {
    name: "Roblox",
    key: "roblox",
    publisher: "Roblox",
    img: "roblox.png",
    unit: "Robux",
    icon: "🟥",

    prices: [
      [80, 15000],
      [400, 70000],
      [800, 140000],
      [1700, 280000],
      [4500, 700000]
    ]
  },


  /* GAME TAMBAHAN */

  {
    name: "Valorant",
    key: "valorant",
    publisher: "Riot Games",
    img: "valorant.jpg",
    unit: "VP",
    icon: "🎯",

    prices: [
      [475, 55000],
      [1000, 110000],
      [2050, 220000],
      [3650, 380000]
    ]
  },


  {
    name: "Call of Duty Mobile",
    key: "codm",
    publisher: "Activision",
    img: "codm.jpg",
    unit: "CP",
    icon: "🎖️",

    prices: [
      [80, 15000],
      [420, 65000],
      [880, 125000],
      [2400, 320000]
    ]
  },


  {
    name: "Arena of Valor",
    key: "aov",
    publisher: "Garena",
    img: "aov.jpg",
    unit: "Voucher",
    icon: "⚔️",

    prices: [
      [40, 10000],
      [90, 20000],
      [230, 50000],
      [470, 100000]
    ]
  },


  {
    name: "League of Legends",
    key: "lol",
    publisher: "Riot Games",
    img: "lol.jpg",
    unit: "RP",
    icon: "🟦",

    prices: [
      [125, 18000],
      [420, 55000],
      [700, 90000],
      [1375, 170000]
    ]
  }

];


let selectedGame = null;
let selectedProduct = null;
let selectedPrice = 0;
let quantity = 1;


/*
========================================
FORMAT RUPIAH
========================================
*/

function rupiah(number) {

  if (typeof number !== "number") {
    return number;
  }

  return "Rp " + number.toLocaleString("id-ID");
}


/*
========================================
RENDER GAME
========================================
*/

function renderGames() {

  const grid = document.getElementById("gameGrid");

  grid.innerHTML = games.map((game, index) => {

    return `

      <article
        class="game-card"
        onclick="openOrder(${index})"
      >

        <div class="game-img">

          <img
            src="${game.img}"
            alt="${game.name}"
            onerror="this.src='diamond.jpg'"
          >

        </div>


        <div class="game-body">

          <h3>
            ${game.name}
          </h3>

          <p>
            ${game.publisher}
            •
            ${game.unit}
          </p>

          <span class="arrow">
            <i class="fa-solid fa-arrow-right"></i>
          </span>

        </div>

      </article>

    `;

  }).join("");

}


/*
========================================
OPEN ORDER
========================================
*/

function openOrder(index) {

  selectedGame = games[index];

  selectedProduct = null;
  selectedPrice = 0;
  quantity = 1;


  document.getElementById("modalGame").textContent =
    selectedGame.name;


  document.getElementById("modalIcon").textContent =
    selectedGame.icon;


  document.getElementById("qty").textContent = "1";


  const nominalBox =
    document.getElementById("nominals");


  nominalBox.innerHTML =
    selectedGame.prices.map((product) => {

      let name;
      let price;


      /*
      FORMAT KHUSUS WEEKLY PASS / MEMBER
      */

      if (
        typeof product[1] === "string"
      ) {

        name = product[1];
        price = product[2];

      }

      else {

        name =
          product[0] +
          " " +
          selectedGame.unit;

        price =
          product[1];

      }


      return `

        <div
          class="nominal"
          onclick="pickNominal(
            this,
            '${name}',
            ${price}
          )"
        >

          <b>
            ${name}
          </b>

          <span>
            ${rupiah(price)}
          </span>

        </div>

      `;

    }).join("");


  updateSummary();


  document
    .getElementById("orderModal")
    .classList.add("show");


  document.body.style.overflow = "hidden";

}


/*
========================================
PILIH NOMINAL
========================================
*/

function pickNominal(
  element,
  name,
  price
) {

  document
    .querySelectorAll(".nominal")
    .forEach(item => {

      item.classList.remove("active");

    });


  element.classList.add("active");


  selectedProduct = name;

  selectedPrice = price;


  updateSummary();

}


/*
========================================
JUMLAH
========================================
*/

function changeQty(delta) {

  quantity += delta;


  if (quantity < 1) {
    quantity = 1;
  }


  if (quantity > 99) {
    quantity = 99;
  }


  document.getElementById("qty")
    .textContent = quantity;


  updateSummary();

}


/*
========================================
UPDATE TOTAL
========================================
*/

function updateSummary() {

  document.getElementById("sumProduct")
    .textContent =
    selectedProduct || "-";


  document.getElementById("sumQty")
    .textContent =
    quantity;


  document.getElementById("sumTotal")
    .textContent =
    rupiah(
      selectedPrice * quantity
    );

}


/*
========================================
CLOSE MODAL
========================================
*/

function closeOrder() {

  document
    .getElementById("orderModal")
    .classList.remove("show");


  document.body.style.overflow = "";

}


/*
========================================
SUBMIT ORDER
========================================
*/

function submitOrder() {

  const playerId =
    document
      .getElementById("playerId")
      .value
      .trim();


  const serverId =
    document
      .getElementById("serverId")
      .value
      .trim();


  const customerName =
    document
      .getElementById("customerName")
      .value
      .trim();


  const customerWa =
    document
      .getElementById("customerWa")
      .value
      .trim();


  /*
  VALIDASI
  */

  if (!playerId) {

    alert(
      "Masukkan User ID / Player ID dulu."
    );

    return;
  }


  if (!selectedProduct) {

    alert(
      "Pilih nominal dulu."
    );

    return;
  }


  if (!customerName) {

    alert(
      "Masukkan nama pembeli."
    );

    return;
  }


  if (!customerWa) {

    alert(
      "Masukkan nomor WhatsApp."
    );

    return;
  }


  const total =
    selectedPrice * quantity;


  /*
  PESAN WHATSAPP
  */

  const message =

`Halo Admin RanaShop 👋

Saya ingin order:

🎮 *Game:* ${selectedGame.name}

🆔 *User ID:* ${playerId}

🌐 *Server:* ${serverId || "-"}

💎 *Nominal:* ${selectedProduct}

🔢 *Jumlah:* ${quantity}

💰 *Total:* ${rupiah(total)}

👤 *Nama:* ${customerName}

📱 *WA:* ${customerWa}

Mohon diproses ya.

Terima kasih!`;


  const whatsappUrl =
    "https://wa.me/62895417880954?text=" +
    encodeURIComponent(message);


  window.open(
    whatsappUrl,
    "_blank"
  );

}


/*
========================================
HOME
========================================
*/

function showHome() {

  closeOrder();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/*
========================================
CLOSE MODAL KLIK LUAR
========================================
*/

document
  .getElementById("orderModal")
  .addEventListener(
    "click",
    function(event) {

      if (
        event.target.id ===
        "orderModal"
      ) {

        closeOrder();

      }

    }
  );


/*
========================================
START
========================================
*/

renderGames();
