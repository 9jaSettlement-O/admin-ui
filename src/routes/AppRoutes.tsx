import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { publicRoutes } from "./public";
import { privateRoutes } from "./private";
import { fallbackRoutes } from "./fallback";
import { ProtectedRoute } from "./ProtectedRoute";
import type { RouteType } from "@/utils/interfaces.util";

function parseRoutes(
  routes: RouteType[],
  isPrivate = false,
  isChild = false
): RouteObject[] {
  return routes.map(({ path, element, roles, children, index }) => {
    let wrappedElement = element;
    const shouldProtect = isPrivate && !isChild;

    if (shouldProtect && roles) {
      wrappedElement = (
        <ProtectedRoute roles={roles}>
          {element}
        </ProtectedRoute>
      );
    } else if (shouldProtect) {
      wrappedElement = <ProtectedRoute>{element}</ProtectedRoute>;
    }

    const route: RouteObject = {
      ...(index ? { index: true } : { path: path || undefined }),
      element: wrappedElement,
    };

    if (children && children.length > 0) {
      route.children = parseRoutes(children, isPrivate, true);
    }

    return route;
  });
}

export function AppRoutes() {
  const allRoutes: RouteObject[] = [
    ...parseRoutes(publicRoutes),
    ...parseRoutes(privateRoutes, true),
    ...parseRoutes(fallbackRoutes),
  ];

  const routing = useRoutes(allRoutes);
  return <>{routing}</>;
}
