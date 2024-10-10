import * as React from "react";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";

interface NextUIProvidersProps {
  children: React.ReactNode;
}
function NextUIProviders({ children }: NextUIProvidersProps) {
  // 2. Wrap NextUIProvider at the root of your app
  return <NextUIProvider>{children}</NextUIProvider>;
}

export default NextUIProviders;
