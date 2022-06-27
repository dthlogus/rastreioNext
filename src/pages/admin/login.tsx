import { Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Botao from "../../components/template/Botao";
import Header from "../../components/template/Header";
import { TokenDTO } from "../../model/TokenDTO";
import api from "../../service/axiosFree";

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function logar(data: any) {
    api
      .post<TokenDTO>("/usuarios/auth", data)
      .then((response) => {
        setCookie(undefined, "rastreio-token", response.data.token, {
          maxAge: 60 * 60 * 1, // 1 hora
          path: "/",
        });
        router.push("/admin");
      })
      .catch(() => {
        handleClick();
      });
  }

  return (
    <>
      <Header title="Login" />
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-md">
          <form className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
            <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
              Acessar o sistema
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="usuario"
              >
                Usuario
              </label>
              <input
                {...register("login")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-solid focus:border-2 focus:border-sky-500"
                name="login"
                type="text"
                required
                autoFocus
                placeholder="Usuário"
                autoComplete="username"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="senha"
              >
                Senha
              </label>
              <input
                {...register("senha")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-solid focus:border-2 focus:border-sky-500"
                type="password"
                placeholder="Senha"
                name="senha"
                required
                autoComplete="current-password"
              />
            </div>
            <div className="flex items-center justify-between">
              <Botao
                className="cursor-pointer px-4 py-2 rounded text-white inline-block shadow-lg bg-[#C72036] hover:bg-[#BA1E34] focus:bg-[#7A1421]"
                texto="Acessar"
                onClick={handleSubmit(logar)}
                uppercase={true}
              />
            </div>
          </form>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          key={"bottom" + "right"}
        >
          <Alert
            onClose={handleClose}
            className="bg-red-800 text-white"
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Usuários ou senha invalidos
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
