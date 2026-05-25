"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types/User";
import { Delete, SquarePen } from "lucide-react";

export default function UsersPage() {
  const categoryData: User[] = [
    { id: 1, email: "arthurboma@teste.com", role: "USER" },
    { id: 2, email: "arthurboma@teste2.com", role: "USER" },
  ];

  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-2">
      <header className="flex justify-between ">
        <p className="title">Usuarios</p>
        <Button size="lg">Novo Usuário</Button>
      </header>
      <hr />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Email</TableHead>
            <TableHead className="w-1/3">Role</TableHead>
            <TableHead className="w-1/3 text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoryData.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>

              <TableCell className="flex justify-center items-center gap-2">
                <Button>
                  <SquarePen />
                </Button>

                <Button variant="destructive">
                  <Delete />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </div>
  );
}
