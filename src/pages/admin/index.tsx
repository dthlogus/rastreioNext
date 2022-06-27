import { Alert, Snackbar } from "@mui/material";
<<<<<<< HEAD
import axios from "axios";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useState } from "react";
=======
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
>>>>>>> da4f1068b3dfbb833818bbf8a5266cb04728dd7b
import { useForm } from "react-hook-form";
import Sidebar from "../../components/admin/Sidebar";
import Botao from "../../components/template/Botao";
import Header from "../../components/template/Header";
import { PacoteDTO } from "../../model/pacoteDTO";
import api from "../../service/apiWithToken";

export default function Admin() {
<<<<<<< HEAD
  const { register, handleSubmit, setValue } = useForm();
=======
  const { register, handleSubmit } = useForm();
>>>>>>> da4f1068b3dfbb833818bbf8a5266cb04728dd7b
  const [open, setOpen] = useState(false);
  const [criado, setCriado] = useState(false);
  const [pacote, setPacote] = useState<PacoteDTO>();
  const handleClick = () => {
    setOpen(true);
  };

<<<<<<< HEAD
  function buscarEndereco(origem: boolean, cep: string) {
    cep = cep.replace(/\D/g, "");
    axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
      if (origem) {
        setValue(
          "enderecoOrigem",
          `${response.data?.logradouro} ${response.data?.bairro} ${response.data?.localidade} - ${response.data?.uf}`
        );
      } else {
        setValue(
          "enderecoDestino",
          `${response.data?.logradouro} ${response.data?.bairro} ${response.data?.localidade} - ${response.data?.uf}`
        );
      }
    });
  }

=======
>>>>>>> da4f1068b3dfbb833818bbf8a5266cb04728dd7b
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  function CriarPacote(data: any) {
    api
      .post<PacoteDTO>("/pacote", data)
      .then((response) => {
        setPacote(response.data);
        setCriado(true);
      })
      .catch(() => {
        handleClick();
      });
  }

  return (
    <>
      <Header title="Cadastrar pacote" />
      <aside>
        <Sidebar />
      </aside>
      <div className="md:ml-60 bg-slate-900">
        <div className="flex h-screen justify-center items-center">
          <form className="md:w-1/3">
            <div className="text-white text-2xl flex justify-center border-b-2 border-gray-600 py-2 mb-4">
              Cadastrar Pacote
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                {...register("nome")}
                type="text"
                name="nome"
                id="nome"
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="nome"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nome cliente
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                {...register("cpf")}
                type="text"
                name="cpf"
                id="cpf"
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
                maxLength={14}
              />
              <label
                htmlFor="cpf"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                CPF
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
<<<<<<< HEAD
                {...register("email")}
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                {...register("cepOrigem")}
                type="text"
                name="cepOrigem"
                id="cepOrigem"
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
                onBlur={(event) => buscarEndereco(true, event?.target.value)}
              />
              <label
                htmlFor="cepOrigem"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Cep de origem
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
=======
>>>>>>> da4f1068b3dfbb833818bbf8a5266cb04728dd7b
                {...register("enderecoOrigem")}
                type="text"
                name="enderecoOrigem"
                id="enderecoOrigem"
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="enderecoOrigem"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Endereço de origem
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
<<<<<<< HEAD
                {...register("complementoOrigem")}
                type="text"
                name="complementoOrigem"
                id="complementoOrigem"
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="complementoOrigem"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Complemento endereço de origem
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                {...register("cepDestino")}
                type="text"
                name="cepDestino"
                id="cepDestino"
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
                onBlur={(event) => buscarEndereco(false, event?.target.value)}
              />
              <label
                htmlFor="cepDestino"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Cep de Destino
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
=======
>>>>>>> da4f1068b3dfbb833818bbf8a5266cb04728dd7b
                {...register("enderecoDestino")}
                type="text"
                name="enderecoDestino"
                id="enderecoDestino"
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="enderecoDestino"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Endereço de destino
              </label>
            </div>
<<<<<<< HEAD

            <div className="relative z-0 w-full mb-6 group">
              <input
                {...register("complementoDestino")}
                type="text"
                name="complementoDestino"
                id="complementoDestino"
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="complementoDestino"
                className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Complemento endereço de destino
              </label>
            </div>
=======
>>>>>>> da4f1068b3dfbb833818bbf8a5266cb04728dd7b
            <Botao
              texto="Criar"
              className="text-white bg-blue-500 w-0 flex px-14 py-1 rounded-md justify-center items-center cursor-pointer"
              onClick={handleSubmit(CriarPacote)}
              uppercase={true}
            />
            {criado ? (
              <div className="text-white flex flex-col justify-center border-y-2 border-gray-600 py-2 mt-8">
                <p className="text-2xl self-center">Pacote criado</p>
                <p className="text-xl self-center mt-2">
                  Pacote: {pacote?.codigoRastreio} Cliente:{"  "}
                  {pacote?.cliente}
                </p>
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
          Erro ao criar o pacote, por favor, verifique os campos
        </Alert>
      </Snackbar>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["rastreio-token"]: token } = parseCookies(ctx);

  if (!token) {
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
