"use client";

import { UserProvider } from "@/content/UserContext";
import { WishlistProvider } from "@/content/WishlistContext";
import ClientProvider from "./ClientProvider";
import CookieSync from "./CookieSync";

export default function ClientOnlyProviders({ children }) {
  return (
    <WishlistProvider>
      <UserProvider>
        <ClientProvider>
          <CookieSync />
          {children}
        </ClientProvider>
      </UserProvider>
    </WishlistProvider>
  );
}
