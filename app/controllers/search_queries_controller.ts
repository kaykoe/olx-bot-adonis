import type { HttpContext } from "@adonisjs/core/http";

import SearchQuery from "#models/search_query";
import {
  createSearchQueryValidator,
  updateSearchQueryValidator,
  indexSearchQueryValidator,
} from "#validators/search_query";

export default class SearchQueriesController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const queryParams = await indexSearchQueryValidator.validate(request.qs());
    const searchQueries = await SearchQuery.query()
      .if(queryParams.name, (query) =>
        query.whereILike("name", `%${queryParams.name}%`),
      )
      .orderBy("id", "desc")
      .paginate(queryParams.page, queryParams.limit);

    searchQueries.baseUrl(request.completeUrl());
    return searchQueries.serialize();
  }
  /**
   * Display form to create a new record
   */

  // async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createSearchQueryValidator);
    const searchQuery = await SearchQuery.create(data);
    return response.created(searchQuery);
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await SearchQuery.findOrFail(params.id);
  }

  /**
   * Edit individual record
   */
  // async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = await request.validateUsing(updateSearchQueryValidator);
    const searchQuery = await SearchQuery.findOrFail(params.id);
    searchQuery.merge(data);
    await searchQuery.save();

    return searchQuery;
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const searchQuery = await SearchQuery.findOrFail(params.id);
    await searchQuery.delete();
    return { message: "SearchQuery successfully deleted." };
  }
}
