import config from "@/config";

export const FB_PIXEL_ID = config.fbPixelId || "";

// Standard pageview tracking
export const pageview = () => {
  if (typeof window !== "undefined" && FB_PIXEL_ID) {
    window.fbq("track", "PageView");
  }
};

// Custom event tracking
export const event = (name: string, options: Record<string, any> = {}) => {
  if (typeof window !== "undefined" && FB_PIXEL_ID) {
    window.fbq("track", name, options);
  }
};
