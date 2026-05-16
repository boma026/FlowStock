"use client";

import { Chart } from "@/components/Chart";
import { ModeToggle } from "@/components/ModeToggle";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-8">
      <div className="flex flex-col gap-2 flex-1 ">
        <header className="flex justify-between ">
          <p className="title">Dashboard</p>
          <div className="flex items-center gap-2">
            <p className="text">Período:</p>

            <Select defaultValue="weekly">
              <SelectTrigger className="w-full max-w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="weekly">Últimos 7 dias</SelectItem>
                  <SelectItem value="monthly">Últimos 30 dias</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </header>
        <hr />
        <section className="mt-4 flex flex-wrap gap-6 ">
          <Card className="w-full lg:flex-1">
            <CardHeader>
              <CardTitle className="subtitle">Valor em estoque</CardTitle>
              <CardAction className="title">$</CardAction>
            </CardHeader>
            <CardContent>
              <p className="title">R$1710,76</p>
            </CardContent>
            <CardFooter>
              <p className="text">Valor total atual</p>
            </CardFooter>
          </Card>
          <Card className="w-full lg:flex-1">
            <CardHeader>
              <CardTitle className="subtitle">Valor em estoque</CardTitle>
              <CardAction className="title">$</CardAction>
            </CardHeader>
            <CardContent>
              <p className="title">R$1710,76</p>
            </CardContent>
            <CardFooter>
              <p className="text">Valor total atual</p>
            </CardFooter>
          </Card>
          <Card className="w-full lg:flex-1">
            <CardHeader>
              <CardTitle className="subtitle">Valor em estoque</CardTitle>
              <CardAction className="title">$</CardAction>
            </CardHeader>
            <CardContent>
              <p className="title">R$1710,76</p>
            </CardContent>
            <CardFooter>
              <p className="text">Valor total atual</p>
            </CardFooter>
          </Card>
        </section>
        <main className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Saídas diárias</CardTitle>
              <CardDescription>
                Volume de saídas no período selecionado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Chart />
            </CardContent>
          </Card>
        </main>
      </div>
      <div className="flex flex-1">
        <section className="flex flex-row flex-wrap w-full gap-4">
          <Card className="w-full lg:flex-1">
            <CardHeader>
              <CardTitle>Estoque baixo</CardTitle>
              <CardDescription>
                Produtos com quantidade próximas ou abaixo do mínimo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <div className="flex justify-between">
                  <h2 className="font-bold">Feijão 1kg</h2>
                  <h2 className="font-bold">R$7,99</h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="text">Qnt: 4 un</h2>
                  <h2 className="text">min: 5</h2>
                </div>
              </div>
              <hr />
            </CardContent>
            <CardContent>
              <div className="mb-2">
                <div className="flex justify-between">
                  <h2 className="font-bold">Feijão 1kg</h2>
                  <h2 className="font-bold">R$7,99</h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="text">Qnt: 4 un</h2>
                  <h2 className="text">min: 5</h2>
                </div>
              </div>
              <hr />
            </CardContent>
            <CardContent>
              <div className="mb-2">
                <div className="flex justify-between">
                  <h2 className="font-bold">Feijão 1kg</h2>
                  <h2 className="font-bold">R$7,99</h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="text">Qnt: 4 un</h2>
                  <h2 className="text">min: 5</h2>
                </div>
              </div>
              <hr />
            </CardContent>
          </Card>
          <Card className="w-full lg:flex-1">
            <CardHeader>
              <CardTitle>Produtos Estagnados</CardTitle>
              <CardDescription>
                Sem saídas no período selecionado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <div className="flex justify-between">
                  <h2 className="font-bold">Feijão 1kg</h2>
                  <h2 className="font-bold">R$7,99</h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="text">Qnt: 4 un</h2>
                  <h2 className="text">min: 5</h2>
                </div>
              </div>
              <hr />
            </CardContent>
            <CardContent>
              <div className="mb-2">
                <div className="flex justify-between">
                  <h2 className="font-bold">Feijão 1kg</h2>
                  <h2 className="font-bold">R$7,99</h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="text">Qnt: 4 un</h2>
                  <h2 className="text">min: 5</h2>
                </div>
              </div>
              <hr />
            </CardContent>
            <CardContent>
              <div className="mb-2">
                <div className="flex justify-between">
                  <h2 className="font-bold">Feijão 1kg</h2>
                  <h2 className="font-bold">R$7,99</h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="text">Qnt: 4 un</h2>
                  <h2 className="text">min: 5</h2>
                </div>
              </div>
              <hr />
            </CardContent>
          </Card>
        </section>
      </div>
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </div>
  );
}
