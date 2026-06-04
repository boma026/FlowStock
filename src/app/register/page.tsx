"use client";
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
import { userService } from "@/services/userService";
import { Register } from "@/types/Register";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Register>();

  const router = useRouter();

  const handleCreateUser = async (data: Register) => {
    const createUserPromise = userService.createUser(data);
    toast.promise(createUserPromise, {
      loading: "Criando usuário...",
      success: () => {
        router.push("/");
        return "Usuário criado com sucesso!";
      },
      error: "Erro ao criar usuário. Verifique os dados.",
    });
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit(handleCreateUser)}>
          <CardHeader>
            <CardTitle className="text-center">FlowStock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div>
                <Label htmlFor="email" className="mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="m@example.com"
                  {...register("email", {
                    required: "O email é obrigatório",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                      message: "Digite um endereço de email válido",
                    },
                  })}
                />
                <span className="text-red-500">{errors.email?.message}</span>
              </div>
              <div>
                <div className="flex items-center">
                  <Label htmlFor="password" className="mb-2">
                    Senha
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: "a senha é obg" })}
                />
              </div>
              <div>
                <div className="flex items-center">
                  <Label htmlFor="password" className="mb-2">
                    Confirme sua senha
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="mb-2"
                  {...register("confirmedPassword", {
                    required: "A confirmação de senha é obrigatória",
                    validate: (value: string) => {
                      if (value === getValues("password")) return true;
                      else {
                        return "As senhas não coincidem";
                      }
                    },
                  })}
                />
                <span className="text-red-500">
                  {errors.confirmedPassword?.message}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full mt-2" type="submit">
              Criar conta
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
