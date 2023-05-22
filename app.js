const scraper = require("./controllers/BeinSports_Scraping");

// --- footballScrap ---
const handlingScrap = async () => {
  await scraper
    .getCategories()
    .then(() => {
      console.log("OK: 200 - gitCategoriesType");
    })
    .catch((err) => {
      console.log(err.message);
    });

  await scraper
    .titleCardNews()
    .then(() => {
      console.log("OK: 200 - TitleCardNews");
    })
    .catch((err) => {
      console.log(err.message);
    });

  await scraper
    .descCarsNews()
    .then(() => {
      console.log("OK: 200 - DescCarsNews");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

handlingScrap()
  .then(() => {
    console.log("OK: 200 - App");
  })
  .catch((err) => {
    console.log(err.message);
  });
// --------------------------
