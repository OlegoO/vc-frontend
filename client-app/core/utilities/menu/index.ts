import globals from "../../globals";
import { getCategoryRoute } from "../categories";
import type { ExtendedMenuLinkType } from "../../types";
import type { Category, MenuLinkType } from "@/xapi/types";

export function convertToExtendedMenuLink(item: MenuLinkType): ExtendedMenuLinkType {
  return {
    title: item.title,
    route: item.url,
    children: item.childItems?.map((child) => convertToExtendedMenuLink(child)),
    priority: item.priority,
  };
}

export function categoryToExtendedMenuLink(category: Category): ExtendedMenuLinkType {
  return {
    id: category.id,
    title: category.name,
    route: getCategoryRoute(category),
    children: category.childCategories?.map((child) => categoryToExtendedMenuLink(child)),
    priority: category.priority,
  };
}

export function getTranslatedMenuLink(menuLink: ExtendedMenuLinkType, i18n = globals.i18n): ExtendedMenuLinkType {
  if (menuLink.title) {
    menuLink.title = i18n?.global.t(menuLink.title);
  }

  if (menuLink.children?.length) {
    menuLink.children = menuLink.children.map((child) => getTranslatedMenuLink(child, i18n));
  }

  return menuLink;
}
