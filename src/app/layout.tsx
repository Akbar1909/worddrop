import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import QueryClientProvider from "@/providers/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Recall Words",
  description: "Learn, play, and master words",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <QueryClientProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
