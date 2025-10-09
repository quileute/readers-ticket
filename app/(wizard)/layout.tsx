import React from "react";
import Header from "@/components/Header";

export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto min-h-screen px-4 pb-16">
      <Header />
      {children}
    </div>
  );
}
