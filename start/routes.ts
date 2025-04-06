/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from "@adonisjs/core/services/router";

router.get("/", async () => {
  return {
    hello: "world",
  };
});
const SearchController = () => import("#controllers/search_queries_controller");
router.post("/search", [SearchController, "store"]);
