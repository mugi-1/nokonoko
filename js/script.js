const menuBtn = document.querySelector(".js-hamburger-button");
const menu = document.querySelector(".js-menu-nav");
const header = document.querySelector(".js-header");

menuBtn.addEventListener("click", () => {
  header.classList.toggle("is-open");
});

menu.addEventListener("click", () => {
  header.classList.remove("is-open");
});

// ==========================================
// スクロールアニメーション
// ==========================================

const container = document.querySelector(".js-how-to-container");

function updateHowToEnjoy() {
  // ここに rect の取得と
  // scrollAmount の計算を移動する
  // 「js-how-to-container」クラスの画面の上端を基準にした要素の位置を取得
  const rect = container.getBoundingClientRect().top;

  const scrollAmount = Math.max(0, -rect);

  const scrollDistance = container.offsetHeight - window.innerHeight;
  const transitionDistance = scrollDistance / 2;
  const delay = transitionDistance * 0.2;

  // 夕暮れの進捗率
  const duskProgress = Math.min(
    1,
    Math.max(0, scrollAmount / (transitionDistance - delay)),
  );
  const duskTranslateY = (1 - duskProgress) * 100;

  const dusk = document.querySelector(".js-how-to-dusk");
  dusk.style.transform = `translateY(${duskTranslateY}%)`;
  //dusk.style.maskImage = duskProgress >= 0.95 ? "none" : "";

  const duskMaskProgress = Math.min(1, Math.max(0, (duskProgress - 0.8) / 0.2));

  const duskMaskWidth = 8 * (1 - duskMaskProgress);
  dusk.style.maskImage = `linear-gradient(
  to bottom,
  transparent 0%,
  black ${duskMaskWidth}%,
  black 100%
)`;

  // 夜の進捗率
  const nightProgress = Math.min(
    1,
    Math.max(
      0,
      (scrollAmount - transitionDistance) / (transitionDistance - delay),
    ),
  );

  const nightTranslateY = (1 - nightProgress) * 100;
  const night = document.querySelector(".js-how-to-night");
  night.style.transform = `translateY(${nightTranslateY}%)`;

  //night.style.maskImage = nightProgress >= 0.95 ? "none" : "";
  const nightMaskProgress = Math.min(
    1,
    Math.max(0, (nightProgress - 0.8) / 0.2),
  );

  const nightMaskWidth = 8 * (1 - nightMaskProgress);

  night.style.maskImage = `linear-gradient(
  to bottom,
  transparent 0%,
  black ${nightMaskWidth}%,
  black 100%
)`;
}

window.addEventListener("scroll", updateHowToEnjoy);

updateHowToEnjoy();
