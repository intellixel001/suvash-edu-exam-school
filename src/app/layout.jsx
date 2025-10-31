import "./globals.css";
import Header from "@/_components/shared/Header";
import ClientProvider from "./_provider/ClientProvider";

export const metadata = {
  title: "Suvash Edu",
  description: "Exam app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <div className="bg-[#e1dfd6] min-h-screen dark:bg-slate-950">
          <ClientProvider>
            <Header />
            {children}
          </ClientProvider>
        </div>
      </body>
    </html>
  );
}
