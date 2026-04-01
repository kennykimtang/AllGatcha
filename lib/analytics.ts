/**
 * Mixpanel event tracking. Naming: view_...., button_....
 * project_code and site_name are set once in MixpanelProvider.
 */

declare global {
  interface Window {
    mixpanel?: {
      track: (name: string, props?: Record<string, unknown>) => void;
      register: (props: Record<string, string>) => void;
    };
  }
}

export type ViewPage = "home" | "collection";

const VIEW_EVENTS: Record<ViewPage, string> = {
  home: "view_page_home",
  collection: "view_page_collection",
};

export function trackView(page: ViewPage): void {
  const name = VIEW_EVENTS[page];
  if (name && typeof window !== "undefined" && window.mixpanel) {
    window.mixpanel.track(name);
  }
}

export function trackCardShown(
  source: "wiki" | "website" | "hn",
  title?: string
): void {
  if (typeof window !== "undefined" && window.mixpanel) {
    window.mixpanel.track("view_card_shown", {
      source,
      ...(title != null && { card_title: title }),
    });
  }
}

export type ButtonEventName =
  | "button_draw"
  | "button_keep"
  | "button_open_article"
  | "button_open_website"
  | "button_draw_again"
  | "button_nav_collection"
  | "button_nav_home"
  | "button_open_card"
  | "button_share";

export function trackButton(
  name: ButtonEventName,
  props?: Record<string, unknown>
): void {
  if (typeof window !== "undefined" && window.mixpanel) {
    window.mixpanel.track(name, props);
  }
}
