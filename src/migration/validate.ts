import { RESOURCE_TYPES, type MigrationPlan, type ValidationResult } from "./types.js";

export function validatePlan(plan: MigrationPlan): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!plan.sourceShop) errors.push("Source shop is required.");
  if (!plan.destinationShop) errors.push("Destination shop is required.");
  if (plan.sourceShop === plan.destinationShop && plan.sourceShop) {
    errors.push("Source and destination shops must be different.");
  }
  if (!RESOURCE_TYPES.some((resource) => plan.selection[resource])) {
    errors.push("Select at least one resource to migrate.");
  }
  if (plan.selection.products === false) {
    warnings.push("Products are excluded; product metafield values will not be copied.");
  }
  if (plan.selection.theme && !plan.selection.files) {
    warnings.push("Theme assets may reference files that are not selected for migration.");
  }
  return { valid: errors.length === 0, errors, warnings };
}
