"use-strict";

console.log("-------------------------------------------------");
console.log("Scrapping snippet running...");

const scrap = () => {
  // Find html elements
  const webUrl = window.location.href;

  const titleEl =
    document.querySelector(
      "body > ems-root > eui-root > eui-dropdown-host > div.content > ems-euro-mobile > div > ems-product > ems-euro-mobile-product-page > div > ems-euro-mobile-product-card > div > div.product-card__grid > div.product-card__intro.\\|.box-kp-l > div > div > div.product-intro__title > h1 > span.product-intro__title-text"
    ) || null;

  const priceEl =
    document.querySelector(
      "body > ems-root > eui-root > eui-dropdown-host > div.content > ems-euro-mobile > div > ems-product > ems-euro-mobile-product-page > div > ems-euro-mobile-product-card > div > div.product-card__grid > div.product-card__sidebar.product-card__sidebar_tabs-active.ng-star-inserted > eui-tabs > div > button.eds-tabs__tab.eds-tabs__tab--active > span > ems-price > div > div"
    ) ||
    document.querySelector(
      "body > ems-root > eui-root > eui-dropdown-host > div.content > ems-euro-mobile > div > ems-product > ems-euro-mobile-product-page > div > ems-euro-mobile-product-card > div > div.product-card__grid > div.product-card__sidebar.ng-star-inserted > eui-box.product-card__tabs.box.box--shadow.box--radius.box--full-width > div > ems-product-purchase > div > ems-price > div > div"
    ) ||
    null;

  const imgUrlEl =
    document.querySelector(
      "body > ems-root > eui-root > eui-dropdown-host > div.content > ems-euro-mobile > div > ems-product > ems-euro-mobile-product-page > div > ems-euro-mobile-product-card > div > div.product-card__grid > div.product-card__intro.\\|.box-kp-l > div > ems-product-gallery > div > div > ems-cart-media-gallery > gallery > gallery-core > div > gallery-slider > div > div > gallery-item.g-active-item.ng-star-inserted > div > div > div > img"
    ) || null;

  const specEl =
    document.querySelector(
      "body > ems-root > eui-root > eui-dropdown-host > div.content > ems-euro-mobile > div > ems-product > ems-euro-mobile-product-page > div > ems-euro-mobile-product-card > div > div.product-card__grid > ems-short-description > div > div > ul"
    ) || null;

  // reading htmls
  const price = priceEl ? priceEl.innerText : "";
  const title = titleEl ? titleEl.innerText : "";
  const imgUrl = imgUrlEl ? imgUrlEl.src : "";

  // Buil specification object
  const specElements = specEl ? specEl.childNodes : [];
  let specObjects = [];

  specElements.forEach((el, i) => {
    if (i !== specElements.length - 1) {
      let specObj = {};
      const objKey = el.childNodes[0].innerText.trim();
      const objVal = el.childNodes[1].innerText.trim();
      specObj[objKey] = objVal;
      specObjects.push(specObj);
    }
  });

  // Build products object
  const prodObj = {
    title,
    webUrl,
    price,
    imgUrl,
    specObjects,
  };

  // handle local data
  const localProductsJson = localStorage.getItem("products");
  let localProducts = localProductsJson ? JSON.parse(localProductsJson) : [];
  // filtering duplicates
  localProducts = localProducts.filter((prod) => prod.title !== prodObj.title);
  const newLocalProducts = [...localProducts, prodObj];

  // set new array od products
  localStorage.setItem("products", JSON.stringify(newLocalProducts));

  console.log(prodObj);
  return `Product added to local storage`;
};
