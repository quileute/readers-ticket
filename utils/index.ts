import { Category, Feature } from "@/types";

export const specialCategories: Category[] = ["Formats", "Users", "Cloud"];
export const exclusiveCategories: Category[] = ["Users", "Cloud"];

// whether included feature from exclusive category is upgraded
export function isExclusiveUpgraded(
  includedFeatureId: string,
  features: Feature[],
  extraFeatureIds: string[],
) {
  const includedFeature = features.find((f) => f.id === includedFeatureId);
  if (!includedFeature) return false;

  if (!exclusiveCategories.includes(includedFeature.category as Category))
    return false;

  return extraFeatureIds.some(
    (id) =>
      features.find((x) => x.id === id)?.category === includedFeature.category,
  );
}
