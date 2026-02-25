import "./../styles/globals.css";
import { AppStateProvider } from "@/state/AppStateProvider";
import Shell from "./shell";
import { IBM_Plex_Sans_Arabic } from "next/font/google";

const ibm = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300","400","500","600","700"],
  display: "swap",
});

export const metadata = {
  title: "أُنس (Ons)",
  description: "Last Ten Nights Journey",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className={ibm.className}>
        <AppStateProvider>
          <Shell>{children}</Shell>
        </AppStateProvider>
      </body>
    </html>
  );
}
