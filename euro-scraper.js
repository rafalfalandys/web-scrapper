"use-strict";

console.log("-------------------------------------------------");
console.log("Scrapping snippet running...");

const scrap = () => {
  // Find html elements
  const webUrl = window.location.href;

  const titleEl =
    document.querySelector(
      "body > ems-root > eui-root > eui-dropdown-host > div.content > ems-euro-mobile > div > ems-product > ems-euro-mobile-product-page > div > ems-euro-mobile-product-card > div > div.product-card__grid > div.product-card__intro.\\|.box-kp-l > div > div > div.product-intro__title > h1 > span.product-intro__title-text"
    ) ||
    document.querySelector("#product-main > div.product-header > div > h1") ||
    null;

  const priceEl =
    document.querySelector(
      "body > ems-root > eui-root > eui-dropdown-host > div.content > ems-euro-mobile > div > ems-product > ems-euro-mobile-product-page > div > ems-euro-mobile-product-card > div > div.product-card__grid > div.product-card__sidebar.product-card__sidebar_tabs-active.ng-star-inserted > eui-tabs > div > button.eds-tabs__tab.eds-tabs__tab--active > span > ems-price > div > div"
    ) ||
    document.querySelector(
      "body > ems-root > eui-root > eui-dropdown-host > div.content > ems-euro-mobile > div > ems-product > ems-euro-mobile-product-page > div > ems-euro-mobile-product-card > div > div.product-card__grid > div.product-card__sidebar.ng-star-inserted > eui-box.product-card__tabs.box.box--shadow.box--radius.box--full-width > div > ems-product-purchase > div > ems-price > div > div"
    ) ||
    document.querySelector(
      "#product-upselling > div.product-detail-prices > ul > li.price-tab.price-promotion-tab.is-active > a > div.product-price.selenium-price-normal"
    ) ||
    null;

  const imgUrlEl =
    document.querySelector(
      "body > ems-root > eui-root > eui-dropdown-host > div.content > ems-euro-mobile > div > ems-product > ems-euro-mobile-product-page > div > ems-euro-mobile-product-card > div > div.product-card__grid > div.product-card__intro.\\|.box-kp-l > div > ems-product-gallery > div > div > ems-cart-media-gallery > gallery > gallery-core > div > gallery-slider > div > div > gallery-item.g-active-item.ng-star-inserted > div > div > div > img"
    ) ||
    document.querySelector("#big-photo > img") ||
    null;

  const specEl =
    document.querySelector(
      "body > ems-root > eui-root > eui-dropdown-host > div.content > ems-euro-mobile > div > ems-product > ems-euro-mobile-product-page > div > ems-euro-mobile-product-card > div > div.product-card__grid > ems-short-description > div > div > ul"
    ) ||
    document.querySelector(
      "#product-main > div.sticky-area > div.product-info > div.attributes-wrapper > div"
    ) ||
    null;

  // reading htmls
  const price = priceEl ? priceEl.innerText : "";
  const title = titleEl ? titleEl.innerText : "";
  const imgUrl = imgUrlEl ? imgUrlEl.src : "";

  // Buil specification object
  const specElements = specEl ? specEl.childNodes : [];
  let spec = {};

  specElements.forEach((el, i) => {
    const elChildrenLength = el.childNodes.length;

    // case one - page loads normally
    if (i !== specElements.length - 1) {
      const [objKey, ...objValNodes] = el.childNodes;
      objValues = objValNodes
        .map((node) => node.innerText)
        .slice(0, objValNodes.length - 2)
        .filter((el) => el !== undefined);
      spec[objKey.innerText.trim()] = objValues;
    }

    // // case 2 page loads with <div>s instead of <li>s
    // if (elChildrenLength === 5) {
    //   console.log(el.childNodes);
    //   const objKey = el.childNodes[1].innerText.trim();
    //   const objVal = el.childNodes[3].innerText.trim();
    //   spec[objKey] = objVal;
    // }
  });

  // Build products object
  const prodObj = {
    title,
    webUrl,
    price,
    imgUrl,
    spec,
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
