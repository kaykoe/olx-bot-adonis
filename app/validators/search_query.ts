import vine from "@vinejs/vine";
import { FieldContext } from "@vinejs/vine/types";

const maxRule = vine.createRule(
  (value: unknown, _options: undefined, field: FieldContext) => {
    // When a value is null or undefined the rule will not be called, so no need to check value for that
    // This rule is called after .number() so value is a valid number
    const maxValue = vine.helpers.asNumber(value);

    const maxFieldName = field.name as string;
    const minFieldName = maxFieldName.replace("Max", "Min");
    const parent = field.parent as Record<string, FieldContext>;
    const minValue = vine.helpers.asNumber(parent[minFieldName]);
    // If minValue is NaN, maxValue is always valid
    if (!Number.isNaN(minValue)) {
      if (maxValue < minValue) {
        return field.report(
          `{${maxFieldName}} must be greater than or equal to {${minFieldName}}`,
          "validation_error",
          field,
        );
      }
    }
  },
);

export const createSearchQueryValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    locationId: vine.number(),

    priceMin: vine.number().positive().optional(),
    priceMax: vine.number().positive().optional().use(maxRule()),
    sizeMin: vine.number().positive().optional(),
    sizeMax: vine.number().positive().optional().use(maxRule()),
    roomsMin: vine.number().positive().optional(),
    roomsMax: vine.number().positive().optional().use(maxRule()),
  }),
);

export const updateSearchQueryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    locationId: vine.number().optional(),

    priceMin: vine.number().positive().optional(),
    priceMax: vine.number().positive().optional().use(maxRule()),
    sizeMin: vine.number().positive().optional(),
    sizeMax: vine.number().positive().optional().use(maxRule()),
    roomsMin: vine.number().positive().optional(),
    roomsMax: vine.number().positive().optional().use(maxRule()),
  }),
);

export const indexSearchQueryValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    perPage: vine.number().min(1).max(50).optional(),
    name: vine.string().trim().optional(),
  }),
);
