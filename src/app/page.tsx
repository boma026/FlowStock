"use client";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Login } from "@/types/Login";
import { privateApi } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const { register, handleSubmit, watch } = useForm<Login>();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeToRegister = () => {
    router.push("/register");
  };

  const handleGrantAcess = async (data: Login) => {
    try {
      const res = await privateApi.post("/users/login", {
        email: data.email,
        password: data.password,
      });

      console.log("token", res.data);
    } catch (error: unknown) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
      router.push("/dashboard");
    }
  };

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <div className=" relative w-full min-h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit(handleGrantAcess)}>
          <CardHeader>
            <CardTitle className="text-center">FlowStock Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div>
                <Label htmlFor="email" className="mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  })}
                />
              </div>
              <div>
                <div className="flex items-center">
                  <Label className="mb-2" htmlFor="password">
                    Senha
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="mb-4"
                  {...register("password", { required: true })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleChangeToRegister}
            >
              Registrar-se
            </Button>
          </CardFooter>
        </form>
      </Card>
      <div className="absolute bottom-4 right-4">
        <ModeToggle />
      </div>
    </div>
  );
}
