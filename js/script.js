// ==========================================
// ハンバーガーメニューの開閉処理
// ==========================================

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
// ヘッダー表示制御
// ==========================================

const howTo = document.querySelector(".js-how-to");
if (howTo && header) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.boundingClientRect.bottom > 0) {
        header.classList.remove("is-scrolled");
      } else {
        header.classList.add("is-scrolled");
      }

      console.log("isIntersecting >>> " + entry.isIntersecting);
      console.log(
        "boundingClientRect.bottom >>> " + entry.boundingClientRect.bottom,
      );
    });
  });

  observer.observe(howTo);
}

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

  // const scrollDistance = container.offsetHeight - window.innerHeight;
  // const transitionDistance = scrollDistance / 2;
  // const delay = transitionDistance * 0.2;

  const transitionDistance = window.innerHeight;
  const delay = transitionDistance * 0.2;
  const duskStart = transitionDistance * 0.4;
  const nightStart = transitionDistance * 1.4 + duskStart;

  // 夕暮れの進捗率
  const duskProgress = Math.min(
    1,
    Math.max(0, (scrollAmount - duskStart) / (transitionDistance - delay)),
  );
  const duskTranslateY = (1 - duskProgress) * 100;

  const dusk = document.querySelector(".js-how-to-dusk");
  dusk.style.transform = `translateY(${duskTranslateY}%)`;

  const duskMaskProgress = Math.min(1, Math.max(0, (duskProgress - 0.8) / 0.2));

  const duskMaskWidth = 8 * (1 - duskMaskProgress);
  dusk.style.maskImage = `linear-gradient(
  to bottom,
  transparent 0%,
  black ${duskMaskWidth}%,
  black 100%
)`;

  const duskTitle = dusk.querySelector(".js-how-to-enjoy_title");
  const textProgress = Math.min(1, Math.max(0, (duskProgress - 0.7) / 0.3));
  duskTitle.style.opacity = textProgress;

  const textY = (1 - textProgress) * 20;
  duskTitle.style.transform = `translateY(${textY}px)`;

  const duskDesc = dusk.querySelector(".js-how-to-enjoy_desc");
  const descProgress = Math.min(1, Math.max(0, (textProgress - 0.3) / 0.7));
  duskDesc.style.opacity = descProgress;

  const descY = (1 - descProgress) * 20;
  duskDesc.style.transform = `translateY(${descY}px)`;
  // 夜の進捗率
  const nightProgress = Math.min(
    1,
    Math.max(0, (scrollAmount - nightStart) / (transitionDistance - delay)),
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
  const nightTitle = night.querySelector(".js-how-to-enjoy_title");
  const nightTextProgress = Math.min(
    1,
    Math.max(0, (nightProgress - 0.7) / 0.3),
  );
  nightTitle.style.opacity = nightTextProgress;

  const nightTextY = (1 - nightTextProgress) * 20;
  nightTitle.style.transform = `translateY(${nightTextY}px)`;

  const nightDesc = night.querySelector(".js-how-to-enjoy_desc");
  const nightDescProgress = Math.min(
    1,
    Math.max(0, (nightTextProgress - 0.3) / 0.7),
  );
  nightDesc.style.opacity = nightDescProgress;

  const nightDescY = (1 - nightDescProgress) * 20;
  nightDesc.style.transform = `translateY(${nightDescY}px)`;
}

window.addEventListener("scroll", updateHowToEnjoy);

updateHowToEnjoy();

// ==========================================
// 監視対象に入った時の処理（ふわっと表示）
// ==========================================

const fadeItems = document.querySelectorAll(".c-fade");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
});

fadeItems.forEach((item) => {
  observer.observe(item);
});
