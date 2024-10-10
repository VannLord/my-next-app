import { ReactNode } from "react";

export const metadata = {
  title: "Dashboard",
  description: "Generated by Liftsoft",
};

const BranchLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-red-200 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] text-black">
      {children}
    </div>
  );
};

export default BranchLayout;