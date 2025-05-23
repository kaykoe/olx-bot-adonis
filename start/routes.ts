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
const SearchQueriesController = () =>
  import("#controllers/search_queries_controller");
router
  .group(() => {
    router
      .resource("search-queries", SearchQueriesController)
      .apiOnly()
      .only(["store", "destroy", "update", "show", "index"]);
  })
  .prefix("/api/v1");
