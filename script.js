// Data nominal per game (contoh harga, bisa diubah)
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
  ]
};

let currentGame = "";
let currentGameKey = "";
let selectedNominal = null;
let selectedPrice = 0;

function selectGame(name, key) {
  currentGame = name;
  currentGameKey = key;
  selectedNominal = null;
  selectedPrice = 0;

  document.getElementById("games").style.display = "none";
  document.getElementById("orderSection").style.display = "block";
  document.getElementById("selectedGameTitle").textContent = name;
  document.getElementById("summaryGame").textContent = name;
  document.getElementById("summaryNominal").textContent = "-";
  document.getElementById("summaryTotal").textContent = "Rp 0";
  document.getElementById("qty").value = 1;
  document.getElementById("summaryQty").textContent = "1";

  // Render nominal
  const grid = document.getElementById("nominalGrid");
  grid.innerHTML = "";

  const list = nominalData[key] || [];
  list.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "nominal-item";
    div.innerHTML = `
      <img src="images/diamond.jpg" alt="Diamond">
      <span class="diamond-count">${item.name}</span>
      <span class="price">Rp ${item.price.toLocaleString("id-ID")}</span>
    `;
    div.onclick = () => selectNominal(div, item.name, item.price);
    grid.appendChild(div);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function selectNominal(el, name, price) {
  document.querySelectorAll(".nominal-item").forEach(i => i.classList.remove("active"));
  el.classList.add("active");
  selectedNominal = name;
  selectedPrice = price;
  updateSummary();
}

function changeQty(delta) {
  const input = document.getElementById("qty");
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  if (val > 99) val = 99;
  input.value = val;
  document.getElementById("summaryQty").textContent = val;
  updateSummary();
}

function updateSummary() {
  const qty = parseInt(document.getElementById("qty").value) || 1;
  document.getElementById("summaryNominal").textContent = selectedNominal || "-";
  const total = selectedPrice * qty;
  document.getElementById("summaryTotal").textContent = "Rp " + total.toLocaleString("id-ID");
}

function backToGames() {
  document.getElementById("orderSection").style.display = "none";
  document.getElementById("games").style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function submitOrder() {
  const playerId = document.getElementById("playerId").value.trim();
  const serverId = document.getElementById("serverId").value.trim();
  const name = document.getElementById("customerName").value.trim();
  const wa = document.getElementById("customerWa").value.trim();
  const qty = document.getElementById("qty").value;
  const payment = document.querySelector('input[name="payment"]:checked')?.value || "";

  if (!playerId) {
    alert("Masukkan User ID / Player ID dulu!");
    return;
  }
  if (!selectedNominal) {
    alert("Pilih nominal dulu!");
    return;
  }
  if (!name || !wa) {
    alert("Isi nama dan nomor WhatsApp dulu!");
    return;
  }

  const total = selectedPrice * parseInt(qty);

  const message = `Halo Admin RanaShop 👋

Saya ingin order:

🎮 *Game:* ${currentGame}
🆔 *ID:* ${playerId}
🌐 *Server:* ${serverId || "-"}
💎 *Nominal:* ${selectedNominal}
🔢 *Jumlah:* ${qty}
💳 *Pembayaran:* ${payment}
💰 *Total:* Rp ${total.toLocaleString("id-ID")}

👤 *Nama:* ${name}
📱 *WA:* ${wa}

Mohon diproses ya. Terima kasih!`;

  const url = `https://wa.me/62895417880954?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
