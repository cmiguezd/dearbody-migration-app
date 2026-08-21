export const RESOURCE_TYPES = [
  "products",
  "pages",
  "collections",
  "metafieldDefinitions",
  "metafields",
  "menus",
  "files",
  "theme"
] as const;

export type ResourceType = (typeof RESOURCE_TYPES)[number];

export type MigrationSelection = Partial<Record<ResourceType, boolean>>;

export interface MigrationPlan {
  sourceShop: string;
  destinationShop: string;
  selection: MigrationSelection;
  dryRun: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}
