import AppFooter from "@/components/footer/app.footer";
import AppHeader from "@/components/header/app.header";

export const metadata = {
  title: "TRUNG CR7 NEXTJS",
  description: "TRUNG CR7 NEXTJS",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
      {children}
      <AppFooter />
    </>
  );
}
