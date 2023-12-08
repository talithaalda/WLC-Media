import NavbarComponents from "@/components/NavbarComponents";
import "@/styles/style.css";
import "@/styles/admin.css";
import "normalize.css";
import "boxicons/css/boxicons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FooterComponents from "@/components/FooterComponents";
import AppShell from "@/layouts/AppShell";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <AppShell />
      <Component {...pageProps} />
      <AppShell />
    </div>
  );
}
