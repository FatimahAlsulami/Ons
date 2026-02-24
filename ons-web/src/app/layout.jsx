import "./../styles/globals.css";
import { AppStateProvider } from "@/state/AppStateProvider";
import Shell from "./shell";

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
      <body>
        <AppStateProvider>
          <Shell>{children}</Shell>
        </AppStateProvider>
      </body>
    </html>
  );
}
