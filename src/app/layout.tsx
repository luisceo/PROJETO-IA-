import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "Lumina | Premium Services",
  description: "Exclusive professionals for your home needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${outfit.variable} antialiased selection:bg-brand selection:text-white bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      <aside style={{ width: 250, background: "#111", color: "#fff", padding: 20 }}>
        <h2>Painel</h2>
        <p>Dashboard</p>
        <p>Pagamentos</p>
        <p>Usuários</p>
      </aside>

      <main style={{ flex: 1, padding: 30 }}>
        {children}
      </main>

    </div>
  );
}git add.
git commit - m "feat: add admin layout"
git push

