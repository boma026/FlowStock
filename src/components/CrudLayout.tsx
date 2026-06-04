"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface CrudLayoutProps {
  title: string;
  actionText?: string;
  onActionClick?: () => void;
  children: ReactNode;
}

export function CrudLayout({
  title,
  actionText,
  onActionClick,
  children,
}: CrudLayoutProps) {
  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-2">
      <header className="flex justify-between">
        <p className="title">{title}</p>
        {actionText && onActionClick && (
          <Button size="lg" onClick={onActionClick}>
            {actionText}
          </Button>
        )}
      </header>
      <hr />

      {/* O conteúdo específico de cada página (tabela, pesquisa, etc) entra aqui */}
      {children}

      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </div>
  );
}
