// pages/_app.js
import { SessionProvider } from "next-auth/react";
import "@/styles/style.css";
import "@/styles/admin.css";
import "normalize.css";
import "boxicons/css/boxicons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppShell from "@/layouts/AppShell";
import FooterComponents from "../components/FooterComponents";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <SessionProvider session={pageProps.session}>
      <div>
        <AppShell />
        <Component {...pageProps} />
        <AppShell />
        {!isDashboardRoute && <FooterComponents />}
      </div>
    </SessionProvider>
  );
}

export default MyApp;
