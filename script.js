

//  ナビゲーション（ハンバーガー）

// ハンバーガー開閉
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");
  });

  // メニュー内のリンクをクリックしたら閉じる
  document.querySelectorAll(".nav-list a").forEach((a) => {
    a.addEventListener("click", () => {
      siteNav.classList.remove("open");
    });
  });
}


//  デートスポットデータ

const spots = [
  {
    id: "katyouen",
    name: "掛川花鳥園",
    tags: ["公園", "花", "鳥", "屋内"],
    keyword: "公園",
    image: "images/spot_katyouen.jpg",
    desc: "全天候型で楽しめる、花と鳥のテーマパーク。\n雨の日デートにもぴったり。\n掛川花鳥園にしかいない鳥もたくさん！",
    lat: 34.76184, //緯度
    lng: 138.01515, //経度
  },
  {
    id: "castle",
    name: "掛川城",
    tags: ["城", "歴史", "景色"],
    keyword: "城",
    image: "images/spot_kakegawajou.jpg",
    desc: "街を見渡せる天守閣が魅力。\n夜のライトアップも雰囲気◎。\n歴史好きカップルにおすすめ！",
    lat: 34.77536,
    lng: 138.01429,
  },
  {
    id: "illumination",
    name: "つま恋イルミネーション",
    tags: ["イルミネーション", "夜景", "ロマンチック"],
    keyword: "イルミネーション",
    image: "images/spot_tumagoi.jpg",
    desc: "夜のイルミネーションがロマンチックなスポット。\n特別な日のデートに。",
    lat: 34.76696,
    lng: 138.04602,
  },
  {
    id: "park",
    name: "22世紀の丘公園",
    tags: ["公園", "芝生", "ピクニック"],
    keyword: "公園",
    image: "images/spot_park22.jpg",
    desc: "広い芝生でのんびりできる公園。\nお弁当を作ってピクニックに行こう！\n晴れた日におすすめ。",
    lat: 34.77566,
    lng: 138.06043,
  },
  // カフェ系
  {
    id: "cafe1",
    name: "3Rings Grill&burger",
    tags: ["カフェ", "ハンバーガー", "おしゃれ"],
    keyword: "カフェ",
    image: "images/spot_3rings_burger.jpg",
    desc: "おしゃれなハンバーガーカフェ。\nちょっぴり大人な雰囲気がデートにぴったり。\nボリューム満点のバーガーが人気。",
    lat: 34.76902,
    lng: 138.02003,
  },
  {
    id: "cafe2",
    name: "antique cafe road",
    tags: ["カフェ", "アンティーク", "落ち着く"],
    keyword: "カフェ",
    image: "images/spot_anticafe_road.jpg",
    desc: "アンティークな雰囲気が魅力のカフェ。\n隠れ家みたいな落ち着く空間。\n掛川市の秘密基地カフェ。",
    lat: 34.81094,
    lng: 138.07478,
  },
  {
    id: "cafe3",
    name: "fanny farm",
    tags: ["カフェ", "ベジタリアン", "デザート"],
    keyword: "カフェ",
    image: "images/spot_fannyfarm.jpg",
    desc: "ベジタリアン向けメニューやデザートが楽しめるカフェ。\nJR掛川駅北口から徒歩2分の好立地。\n健康志向カップルにおすすめ！",
    lat: 34.77118,
    lng: 138.01551,
  },
  {
    id: "cafe4",
    name: "コッペ田島",
    tags: ["カフェ", "パン", "できたて", "安い"],
    keyword: "カフェ",
    image: "images/spot_koppepan_tazima.jpg",
    desc: "掛川市にできたコッペパン田島。\n注文が入ってから作り始めるので焼きたてが食べられる！\n土日は開店から長蛇の列！？。\nコーヒーとセットがおすすめ！",
    lat: 34.76104,
    lng: 138.02013,
  },
];


//  お気に入り管理

const favorites = new Set(); // spot.id を入れる。表示データとお気に入り情報を分離管理を効率化

const favoritesBox = document.getElementById("favoriteResults");
const favoritesEmpty = document.getElementById("favoritesEmpty");

// localStorage から復元
const savedFav = localStorage.getItem("favorites");
if (savedFav) {
  try {
    JSON.parse(savedFav).forEach((id) => favorites.add(id));
  } catch (e) {
    console.warn("favorites load error", e);
  }
}

// 保存用
function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify([...favorites]));
}


//  カード（画像＋説明＋★ボタン）を作る関数

function createSpotCard(spot) {
  const article = document.createElement("article");
  article.className = "result-card";
  article.dataset.id = spot.id;

  const isFav = favorites.has(spot.id);

  article.innerHTML = `
    <img src="${spot.image}" alt="${spot.name}" class="result-thumb">
    <div class="result-body">
      <h3 class="result-title">${spot.name}</h3>
      <p class="result-desc">${spot.desc}</p>
      <p class="result-tags">
        タグ：${spot.tags.join(" / ")}
        <button class="fav-btn ${isFav ? "active" : ""}" data-id="${spot.id}">
          ★ お気に入り
        </button>
       
      <!-- 地図を見るボタン追加　-->

        <button class="map-btn" data-lat="${spot.lat ?? ""}" data-lng="${
    spot.lng ?? ""
  }"

        data-q="${encodeURIComponent(spot.name)}">
        
        <!-- google map ボタン連携　-->
        <!-- 緯度経度が無いときは名前で検索 -->
        <!--  地図を見る、ボタン追加　-->
        
        
        
        📍 地図で見る  
        </button> 
      </p>
    </div>`;

  return article;
}

// お気に入り一覧を描画
function renderFavorites() {
  if (!favoritesBox || !favoritesEmpty) return;

  favoritesBox.innerHTML = "";

  if (favorites.size === 0) {
    favoritesEmpty.style.display = "block";
    return;
  }

  favoritesEmpty.style.display = "none";

  spots
    .filter((s) => favorites.has(s.id))
    .forEach((spot, index) => {
      const card = createSpotCard(spot);
      favoritesBox.appendChild(card);

      // ちょっとだけフェードイン
      setTimeout(() => {
        card.classList.add("show");
      }, 150 + index * 80);
    });
}

// 初期表示
renderFavorites();


//  検索処理
const searchForm = document.getElementById("searchForm");
const keywordInput = document.getElementById("keyword");
const resultsContainer = document.getElementById("results");
const chips = document.querySelectorAll(".chip");

function runSearch(keyword) {
  const word = keyword.trim();
  resultsContainer.innerHTML = ""; // 一旦リセット

  if (!word) {
    resultsContainer.textContent =
      "キーワードを入力するか、カテゴリボタンを押してください。";
    return;
  }

  const hits = spots.filter((spot) => {
    const haystack =
      spot.name + spot.desc + spot.tags.join("") + (spot.keyword || "");
    return haystack.includes(word);
  });

  if (!hits.length) {
    resultsContainer.textContent =
      "該当するスポットが見つかりませんでした。キーワードを変えてみてください。";
    return;
  }

  const cards = [];
  hits.forEach((spot) => {
    const card = createSpotCard(spot);
    resultsContainer.appendChild(card);
    cards.push(card);
  });

  // 自動スクロール
  document.querySelector("#results").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  // ふわっと表示
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("show");
    }, 200 + index * 100);
  });
}

// フォームの「検索」ボタン
if (searchForm && keywordInput && resultsContainer) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    runSearch(keywordInput.value);
  });
}

// チップ（公園 / カフェ / 城 / イルミネーション）クリックで検索
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const word = chip.textContent.trim();
    if (keywordInput) keywordInput.value = word;
    runSearch(word);
  });
});


//  ランダムで1件表示
const randomBtn = document.getElementById("randomBtn");
const randomResult = document.getElementById("randomResult");

if (randomBtn && randomResult) {
  randomBtn.addEventListener("click", () => {
    if (!spots.length) return;

    const index = Math.floor(Math.random() * spots.length);
    const spot = spots[index];

    randomResult.innerHTML = ""; // 前の結果を消す
    const card = createSpotCard(spot);
    randomResult.appendChild(card);

    setTimeout(() => {
      card.classList.add("show");
    }, 200);
  });
}
//document.addEventListener("click",)二重化のため一つ削除。お気に入り機能復活なるか。// 

//お気に入りボタンと地図ボタンのイベント処理 //
document.addEventListener("click", (e) => {
  
  const favBtn = e.target.closest(".fav-btn");
  if (favBtn) {
    const id = favBtn.dataset.id;
    if (favorites.has(id)) {
      favorites.delete(id);
      favBtn.classList.remove("active");
    } else {
      favorites.add(id);
      favBtn.classList.add("active");
    }
    saveFavorites();
    renderFavorites();
    return; // 終了（クリック処理はここまで）
  }

  // 地図を見るボタン
  const mapBtn = e.target.closest(".map-btn");
  if (mapBtn) {
    const lat = mapBtn.dataset.lat;
    const lng = mapBtn.dataset.lng;
    const q = mapBtn.dataset.q || "";

    let url;
    if (lat && lng) {
      // 緯度経度があるときは座標で検索
      url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    } else {
      // 無いときは名前で検索
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        decodeURIComponent(q)
      )}`;
    }

    // 新しいタブで開く（セキュリティのため rel="noopener" 相当の処理）
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }
});

//  詳細モーダル関連の要素取得  //

const detailModal = document.getElementById("detailModal");
const modalimg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalClose = document.getElementById("modalClose");

document.addEventListener("click", (e) => {
  const clickcard = e.target.closest(".result-card");
  if (e.target.closest(".fav-btn") || e.target.closest(".map-btn")) 

    return; // お気に入りボタンや地図ボタンのクリックは無視 /
  if(!clickcard) return; // カード以外のクリックは無視 //

  //id取得してデータ検索 //

  const spotId = clickcard.dataset.id;
  const spot = spots.find((s) => s.id === spotId);
  if (!spot) return;

  // モーダルに情報セット //
  modalimg.src = spot.image;
  modalimg.alt = spot.name;
  modalTitle.textContent = spot.name;
  modalDesc.textContent = spot.desc;

  // モーダル表示 //
  detailModal.classList.remove("hidden");
});

// モーダル閉じるボタン //
if (modalClose && detailModal) {
  modalClose.addEventListener("click", () => {
    detailModal.classList.add("hidden");
  });

  //黒背景クリックで閉じる //
  detailModal.addEventListener("click", (e) => {
    if (e.target === detailModal) {
      detailModal.classList.add("hidden");
    }
  });
}