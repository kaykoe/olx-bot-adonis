import vine from "@vinejs/vine";

export const createSearchQueryValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    locationId: vine.number(),

    priceMin: vine.number().positive().optional(),
    priceMax: vine.number().positive().optional(),
    sizeMin: vine.number().positive().optional(),
    sizeMax: vine.number().positive().optional(),
    roomsMin: vine.number().positive().optional(),
    roomsMax: vine.number().positive().optional(),
  }),
);
