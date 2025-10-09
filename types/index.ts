export type Category =
  | "Formats"
  | "Audio"
  | "Users"
  | "Sync"
  | "Cloud"
  | "UX"
  | "AI & extras"
  | "Support"
  | "Perks"
  | "Tools";

export type Feature = {
  id: string;
  category: Category;
  label: string;
  tooltip?: string;
  price: number;
};

export type PlanFeature = {
  icon: string;
  text: string;
};

export type Plan = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  features: PlanFeature[];
  includedFeatureIds: string[];
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type Step = {
  slug: string;
  title: string;
  description: string;
};
