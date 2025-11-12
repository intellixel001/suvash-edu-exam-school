import "./globals.css";
import Header from "@/_components/shared/Header";
import { Hind_Siliguri, Anton, Poppins } from "next/font/google";
import ClientOnlyProviders from "./_provider/ClientOnlyProviders";

// Fonts
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Suvash Edu",
  description: "Exam app",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} ${anton.variable} ${poppins.variable}`}
    >
      <body className="antialiased font-sans">
        <div className="bg-[#e1dfd6] min-h-screen dark:bg-slate-950">
          <ClientOnlyProviders>
            <Header />
            {children}
          </ClientOnlyProviders>
        </div>
      </body>
    </html>
  );
}
