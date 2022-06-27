import { Alert, Snackbar } from "@mui/material";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Sidebar from "../../components/admin/Sidebar";
import Botao from "../../components/template/Botao";
import Header from "../../components/template/Header";
import { SituacaoDTO } from "../../model/situacaoDTO";
import api from "../../service/apiWithToken";

export default function Alterar() {
  const { register, handleSubmit } = useForm();
  const [pacote, setPacote] = useState<SituacaoDTO | null>(null);
  const [postado, setPostado] = useState(false);
  const [entregaFeita, setEntregaFeita] = useState(false);
  const [situacao, setSituacao] = useState("");
  const [codigo, setCodigo] = useState("");
  const [open, setOpen] = useState(false);
  function mudarSituacao(retorno: boolean) {
    api
      .put(`/situacao/${codigo}/?retorno=${retorno}`, pacote)
      .then(() => {
        setPacote(null);
        setCodigo("");
        setSituacao("");
        setPostado(false);
        setEntregaFeita(false);
      })
      .catch((erro) => {
        console.log(erro);
        handleClick();
      });
  }
  function voltarSituacao() {
    if (pacote?.entregue === true) {
      pacote.entregue = false;
      pacote.dataEntregue = null;
    } else if (pacote?.rotaEntrega === true) {
      pacote.rotaEntrega = false;
      pacote.dataRotaEntrega = null;
    } else if (pacote?.tratamento === true) {
      pacote.tratamento = false;
      pacote.dataTratamento = null;
    } else if (pacote?.transferencia === true) {
      pacote.transferencia = false;
      pacote.dataTransferencia = null;
      setPostado(true);
    }
  }

  function subirSituacao() {
    if (pacote !== null) {
      if (pacote?.transferencia === false) {
        setSituacao("Postado");
        setPostado(true);
        pacote.transferencia = true;
        return;
      }
      if (pacote?.tratamento === false) {
        setSituacao("Em transferencia");
        pacote.tratamento = true;
        return;
      }
      if (pacote?.rotaEntrega === false) {
        setSituacao("Unidade de tratamento");
        pacote.rotaEntrega = true;
        return;
      }
      if (pacote?.entregue === false) {
        setSituacao("Rota de entrega");
        pacote.entregue = true;
        return;
      }
      setSituacao("Entregue");
      setEntregaFeita(true);
    }
  }
  function buscarPacote(data: any) {
    api
      .get(`/situacao/${data.pacote}`)
      .then((resposta) => {
        setCodigo(data.pacote);
        setPacote(resposta.data);
      })
      .catch(() => {
        handleClick();
      });
  }

  useEffect(() => {
    if (pacote !== null) {
      if (pacote?.transferencia === false) {
        setSituacao("Postado");
        setPostado(true);
        return;
      }
      if (pacote?.tratamento === false) {
        setSituacao("Em transferencia");
        return;
      }
      if (pacote?.rotaEntrega === false) {
        setSituacao("Unidade de tratamento");
        return;
      }
      if (pacote?.entregue === false) {
        setSituacao("Rota de entrega");
        return;
      }
      setSituacao("Entregue");
      setEntregaFeita(true);
    }
  }, [pacote]);

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

  function renderizar() {
    return pacote === null ? (
      <form className="md:w-1/3">
        <div className="text-white text-2xl flex justify-center border-b-2 border-gray-600 py-2 mb-4">
          Mudança de situação
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            {...register("pacote")}
            type="text"
            name="pacote"
            id="pacote"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="pacote"
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Pacote
          </label>
        </div>
        <div className="flex">
          <Botao
            texto="Buscar situação"
            className="text-white bg-blue-500 flex px-6 py-2 rounded-md items-center cursor-pointer"
            onClick={handleSubmit(buscarPacote)}
            uppercase={true}
          />
        </div>
      </form>
    ) : (
      <form className="md:w-1/3">
        <div className="text-white flex flex-col justify-center border-y-2 border-gray-600 py-2 mt-8">
          <p className="text-2xl self-center">Situação do pacote</p>
          <p className="text-xl mt-2">Pacote: {codigo}</p>
          <p className="text-xl">Está na situação: {situacao}</p>
          {entregaFeita ? (
            <p className="text-xl">
              Produto já foi entregue, não é possível mudar a situação
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-around">
          {entregaFeita ? (
            ""
          ) : (
            <div className="flex mt-5 justify-between">
              <Botao
                texto="Mudar Situação"
                className="text-white mr-6 bg-blue-500 flex px-14 py-2 rounded-md items-center cursor-pointer"
                onClick={() => {
                  subirSituacao();
                  mudarSituacao(false);
                }}
                uppercase={true}
              />
            </div>
          )}
          {postado ? (
            ""
          ) : (
            <div className="flex mt-5 justify-between">
              <Botao
                texto="Retornar Situação"
                className="text-white mr-6 bg-blue-500 flex px-14 py-2 rounded-md items-center cursor-pointer self-end"
                onClick={() => {
                  voltarSituacao();
                  mudarSituacao(true);
                }}
                uppercase={true}
              />
            </div>
          )}
        </div>
      </form>
    );
  }

  return (
    <>
      <Header title="Alterar pacote" />
      <aside>
        <Sidebar />
      </aside>
      <div className="md:ml-60 bg-slate-900">
        <div className="flex h-screen justify-center items-center">
          {renderizar()}
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
          Pacote Inválido
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
