import * as React from "react";

export function useMobile() {
  const [mobile, setMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const onChange = () => setMobile(mql.matches);
    mql.addEventListener("change", onChange);
    setMobile(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!mobile;
}
