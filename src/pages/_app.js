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
import { PortfolioProvider } from "@/utils/portfolioContext";
import { TalentProvider } from "@/utils/talentContext";
import { ProfileProvider } from "@/utils/profileContext";
import { UserProvider } from "@/utils/userContext";

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const isDashboardRoute = pathname.startsWith("/dashboard");

  return (
    <SessionProvider session={pageProps.session}>
      <PortfolioProvider>
        <TalentProvider>
          <ProfileProvider>
            <UserProvider>
              <div>
                <AppShell />
                <Component {...pageProps} />
                <AppShell />
                {!isDashboardRoute && <FooterComponents />}
              </div>
            </UserProvider>
          </ProfileProvider>
        </TalentProvider>
      </PortfolioProvider>
    </SessionProvider>
  );
}

export default MyApp;
