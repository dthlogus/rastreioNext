import { GetServerSideProps } from "next";
import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Botao from "../../components/template/Botao";
import Header from "../../components/template/Header";
import api from "../../service/apiWithToken";
import { mask } from "../../service/mask";

export default function Visualizar() {
  const [page, setPage] = useState<any>();
  const [content, setContent] = useState<any[]>();
  const [pagina, setPagina] = useState(0);

  useEffect(() => {
    api
      .get("/pacote")
      .then((resposta) => {
        setPage(resposta.data);
        setContent(resposta.data.content);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  function visualizar(codigo: any) {
    setCookie(undefined, "rastreio-pacote", codigo, {
      maxAge: 60 * 10 * 1, // 30 min
      path: "/",
    });
    window.open(`${Router.basePath}/rastreio/${codigo}`, "_blank");
  }

  function mudarPage(pagina: any) {
    if (pagina < page?.totalPages && pagina >= 0) {
      setPagina(pagina);
      api
        .get(`/pacote?page=${pagina}`)
        .then((resposta) => {
          setPage(resposta.data);
          setContent(resposta.data.content);
        })
        .catch((erro) => {
          console.log(erro);
        });
    }
  }

  function renderizarTabela() {
    return content?.map((elemento) => {
      return (
        <tr key={elemento?.cliente?.id} className="bg-white dark:bg-gray-800">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
          >
            {elemento?.cliente?.nome}
          </th>
          <td className="px-6 py-4">{mask(elemento?.cliente?.cpf)}</td>
          <td className="px-6 py-4">{elemento?.codigoRastreio}</td>
          <td className="px-6 py-4">
            <Botao
              texto="Visualizar"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
              onClick={() => {
                visualizar(elemento?.codigoRastreio);
              }}
            />
          </td>
        </tr>
      );
    });
  }

  return (
    <>
      <Header title="Visualizar todos os pacotes" />
      <aside>
        <Sidebar />
      </aside>
      <div className="md:ml-60 bg-slate-900">
        <div className="flex h-screen justify-center">
          <div className="relative md:w-2/3 overflow-x-auto shadow-md sm:rounded-lg mt-14">
            <div className="text-white text-2xl flex justify-center border-b-2 border-gray-600 py-2 mb-4">
              Visualizar Pacotes
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CPF
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Pacote
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Visualizar
                  </th>
                </tr>
              </thead>
              <tbody>{renderizarTabela()}</tbody>
            </table>
            {page?.totalPages > 1 ? (
              <nav aria-label="navegação">
                <ul className="flex justify-center items-center -space-x-px mt-6">
                  <li>
                    <Botao
                      texto="<< Anterior"
                      className="py-2 px-3 mx-2 rounded leading-tight bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer"
                      onClick={() => {
                        mudarPage(pagina - 1);
                      }}
                    />
                  </li>
                  <span className="py-2 px-3 mx-2 rounded leading-tight bg-gray-700 border-gray-700 text-white">
                    {pagina + 1}
                  </span>
                  <li>
                    <Botao
                      texto="Proximo >>"
                      className="py-2 px-3 mx-2 rounded leading-tight bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer"
                      onClick={() => {
                        mudarPage(pagina + 1);
                      }}
                    />
                  </li>
                </ul>
              </nav>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
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
