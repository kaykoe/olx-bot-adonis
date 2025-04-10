import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "search_queries";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.string("name");

      table.float("price_min").unsigned();
      table.float("price_max").unsigned();
      table.float("size_min").unsigned();
      table.float("size_max").unsigned();
      table.float("rooms_min").unsigned();
      table.float("rooms_max").unsigned();

      table.integer("location_id");

      table.timestamp("refreshed_at");
      table.timestamp("created_at");
      table.timestamp("updated_at");
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
