import { Feature } from "@/types";

export const features: Feature[] = [
  // Formats
  {
    id: "basic-formats",
    category: "Formats",
    label: "EPUB, FB2, PDF",
    tooltip: "The file types you can read with this plan.",
    price: 0,
  },
  {
    id: "extended-formats",
    category: "Formats",
    label: "CBR, CBZ",
    price: 5,
  },
  {
    id: "extra-formats",
    category: "Formats",
    label: "MOBI, AZW",
    price: 10,
  },

  // Audio
  {
    id: "audiobooks",
    category: "Audio",
    label: "Audiobooks",
    tooltip: "Listen to books with our built-in player.",
    price: 7,
  },

  // Users
  {
    id: "users-2",
    category: "Users",
    label: "2 users",
    tooltip: "How many people can use this plan together.",
    price: 0,
  },
  {
    id: "users-4",
    category: "Users",
    label: "4 users",
    price: 5,
  },
  {
    id: "users-8",
    category: "Users",
    label: "8 users",
    price: 10,
  },

  // Sync
  {
    id: "offline",
    category: "Sync",
    label: "Offline reading",
    tooltip: "Save books to your device and read without internet.",
    price: 0,
  },
  {
    id: "sync",
    category: "Sync",
    label: "Sync across devices",
    tooltip: "Keep your reading progress and notes the same on all devices.",
    price: 0,
  },

  // Cloud
  {
    id: "cloud-1gb",
    category: "Cloud",
    label: "1 GB storage",
    tooltip: "Your personal storage space for books and notes.",
    price: 0,
  },
  {
    id: "cloud-20gb",
    category: "Cloud",
    label: "20 GB storage",
    price: 5,
  },
  {
    id: "cloud-100gb",
    category: "Cloud",
    label: "100 GB storage",
    price: 10,
  },

  // UX
  {
    id: "bookmarks",
    category: "UX",
    label: "Bookmarks & notes",
    tooltip: "Highlight text, make notes, and save bookmarks.",
    price: 0,
  },
  {
    id: "advanced-search",
    category: "UX",
    label: "Advanced search",
    tooltip: "Find books, quotes, or notes instantly.",
    price: 5,
  },
  {
    id: "collections",
    category: "UX",
    label: "Personal collections",
    tooltip: "Group books into your own themed lists.",
    price: 3,
  },

  // AI & extras
  {
    id: "translator",
    category: "AI & extras",
    label: "Built-in translator",
    tooltip: "Translate text on the fly while reading.",
    price: 4,
  },
  {
    id: "ai-assistant",
    category: "AI & extras",
    label: "AI assistant",
    tooltip: "Get summaries and smart reading tips powered by AI.",
    price: 6,
  },

  // Support
  {
    id: "priority-support",
    category: "Support",
    label: "Priority support",
    tooltip: "Help from our team when you need it.",
    price: 5,
  },

  // Perks
  {
    id: "early-access",
    category: "Perks",
    label: "Early access",
    tooltip: "Read new books before everyone else.",
    price: 5,
  },
  {
    id: "webinars",
    category: "Perks",
    label: "Webinars & events",
    tooltip: "Join exclusive online talks and author events.",
    price: 8,
  },

  // Tools
  {
    id: "converter",
    category: "Tools",
    label: "Format converter",
    tooltip: "Turn one ebook format into another with ease.",
    price: 4,
  },
];
