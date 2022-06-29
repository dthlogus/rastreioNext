import { Alert, Snackbar } from "@mui/material";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Sidebar from "../../components/admin/Sidebar";
import Botao from "../../components/template/Botao";
import Header from "../../components/template/Header";
import api from "../../service/apiWithToken";

export default function Admin() {
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);
  const [criado, setCriado] = useState(false);
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
  function criarUsuario(data: any) {
    console.log(data);
    api
      .post("/usuarios/create", data)
      .then((response) => {
        console.log(response.data);
        setCriado(true);
      })
      .catch(() => {
        handleClick();
      });
  }

  return (
    <>
      <Header title="Cadastrar Usuario" />
      <aside>
        <Sidebar />
      </aside>
      <div className="md:ml-60 bg-slate-900">
        <div className="flex h-screen justify-center items-center">
          <form className={`md:w-1/3`}>
            <div className="text-white text-2xl flex justify-center border-b-2 border-gray-600 py-2 mb-4">
              Cadastrar usuario
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                {...register("login")}
                type="text"
                name="login"
                id="login"
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="login"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Login do usuario
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                {...register("password")}
                type="password"
                name="password"
                id="password"
                className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer `}
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
              >
                Senha
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="Permissao"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Selecione a permissão
              </label>
              <select
                id="Permissao"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("roles")}
                required
              >
                <option value="coordenador">Coordenador</option>
                <option value="user">Usuario</option>
              </select>
            </div>
            <Botao
              texto="Criar"
              className="text-white bg-blue-500 w-0 flex px-14 py-1 rounded-md justify-center items-center cursor-pointer"
              onClick={handleSubmit(criarUsuario)}
              uppercase={true}
            />
            {criado ? (
              <div className="text-white flex flex-col justify-center border-y-2 border-gray-600 py-2 mt-8">
                <p className="text-2xl self-center">Usuario criado</p>
              </div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
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
          Erro ao criar o usuario, por favor, verifique os campos
        </Alert>
      </Snackbar>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["rastreio-token"]: token } = parseCookies(ctx);
  const { ["rastreio-permissao"]: permissao } = parseCookies(ctx);

  if (!token || permissao !== "ADMIN") {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
