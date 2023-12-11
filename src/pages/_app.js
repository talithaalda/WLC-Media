import "@/styles/style.css";
import "@/styles/admin.css";
import "normalize.css";
import "boxicons/css/boxicons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppShell from "@/layouts/AppShell";
import { useRouter } from "next/router";
import FooterComponents from "../components/FooterComponents";

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();
  const isDashboardRoute = pathname.startsWith("/dashboard");
  return (
    <div>
      <AppShell />
      <Component {...pageProps} />
      <AppShell />
      {!isDashboardRoute && <FooterComponents />}
    </div>
  );
}
