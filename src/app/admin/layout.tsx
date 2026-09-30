import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return <div className="flex min-h-svh flex-col bg-ink">{children}</div>;
}
