export const themeConfig = {
  grid: {
    rotation: "20deg",
    opacity: "0.3",
  },
  typography: {
    heroTitleSize: "text-[13vw] md:text-[9vw]", 
    marqueeFontSize: "10px",
    projectListSize: "text-2xl md:text-4xl", 
  },
  effects: {
    marqueeSpeed: "30s",
    colSpeed1: "45s", colSpeed2: "55s", colSpeed3: "50s", colSpeed4: "60s",
    colSpeed5: "65s", colSpeed6: "40s", colSpeed7: "55s", colSpeed8: "48s",
    colSpeed9: "52s", colSpeed10: "62s", colSpeed11: "47s", colSpeed12: "58s",
  },
  categories: [
    { id: 'automotive', label: 'AUTOMOTIVE', description: 'Drift / Speed / Detail', color: '#f59e0b' },
    { id: 'backstage', label: 'BACKSTAGE', description: 'Behind The Scenes', color: '#8b5cf6' },
    { id: 'commercial', label: 'COMMERCIAL', description: 'Brands / Promo Ads', color: '#3b82f6' },
    { id: 'corporate', label: 'CORPORATE', description: 'Business / Interview', color: '#94a3b8' },
    { id: 'events', label: 'EVENTS', description: 'Atmosphere / Concerts', color: '#ef4444' },
    { id: 'longvideos', label: 'LONG FORM', description: 'Short Films / Production', color: '#ec4899' },
    { id: 'social', label: 'SOCIAL MEDIA', description: 'Reels / TikTok / Trends', color: '#10b981' },
    { id: 'others', label: 'OTHERS', description: 'Instagram / Lifestyle', color: '#ffffff', link: 'https://instagram.com/nxxshot' },
  ]
};
