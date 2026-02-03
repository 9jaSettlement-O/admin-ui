import { createContext, useContext, type ReactNode } from "react";

export interface PageHeaderContextValue {
  setActions: (node: ReactNode) => void;
}

export const PageHeaderContext = createContext<PageHeaderContextValue | null>(null);

export function usePageHeaderActions() {
  const ctx = useContext(PageHeaderContext);
  return ctx?.setActions ?? (() => {});
}
