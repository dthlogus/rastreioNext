import { Listbox, Transition } from "@headlessui/react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { parseCookies } from "nookies";
import { ArrowsDownUp, Check } from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Botao from "../../components/template/Botao";
import Header from "../../components/template/Header";
import api from "../../service/apiWithToken";

const tamanhos = [
  { value: 10 },
  { value: 20 },
  { value: 30 },
  { value: 40 },
  { value: 50 },
];
export default function VisualizarUsuarios() {
  const [page, setPage] = useState<any>();
  const [content, setContent] = useState<any[]>();
  const [pagina, setPagina] = useState(0);
  const [tamanho, setTamanho] = useState(tamanhos[0]);
  const [permissao, setPermissao] = useState("");

  useEffect(() => {
    api
      .get(`/usuarios/?tamanho=${tamanho.value}`)
      .then((resposta) => {
        setPage(resposta.data);
        setContent(resposta.data.content);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, [tamanho.value]);

  function listBox() {
    return (
      <div className="mt-6">
        <Listbox value={tamanho} onChange={setTamanho}>
          <div className="relative w-20">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{tamanho.value}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2  text-gray-400">
                <ArrowsDownUp aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="w-20 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {tamanhos.map((tamanho, tamanhoIndex) => (
                  <Listbox.Option
                    key={tamanhoIndex}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={tamanho}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {tamanho.value}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 h-5 w-5 text-amber-600">
                            <Check aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    );
  }

  useEffect(() => {
    const { ["rastreio-permissao"]: permissao } = parseCookies();
    setPermissao(permissao);
  }, []);

  function mudarPage(pagina: any) {
    if (pagina < page?.totalPages && pagina >= 0) {
      setPagina(pagina);
      api
        .get(`/usuarios?page=${pagina}&tamanho=${tamanho.value}`)
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
      if (!(elemento?.role === "ADMIN" && permissao !== "ADMIN")) {
        return (
          <tr
            key={elemento?.codigoRastreio}
            className="bg-white dark:bg-gray-800"
          >
            <th
              scope="row"
              className="px-10 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
              {elemento?.login}
            </th>
            <td className="px-10 py-4 whitespace-nowrap">{elemento?.role}</td>
          </tr>
        );
      }
    });
  }

  return (
    <>
      <Header title="Visualizar todos os usuarios" />
      <aside>
        <Sidebar />
      </aside>
      <div className="md:ml-60 bg-slate-900">
        <div className="flex h-screen justify-center">
          <div className="relative md:w-2/3 overflow-x-auto shadow-md sm:rounded-lg mt-14">
            <div className="text-white text-2xl flex justify-center border-b-2 border-gray-600 py-2 mb-4">
              Visualizar Usuarios
            </div>
            <div className="flex justify-end">
              <Botao
                texto="Criar usuário"
                className="cursor-pointer text-white py-2 px-6 mb-5 rounded-md bg-blue-500 hover:bg-blue-600"
                onClick={() => {
                  Router.push("criarUsuario");
                }}
              />
            </div>
            <table className="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-8 py-3">
                    Nome
                  </th>
                  <th scope="col" className="px-8 py-3">
                    Permissão
                  </th>
                </tr>
              </thead>
              <tbody>{renderizarTabela()}</tbody>
            </table>
            <div className="flex justify-between">
              <nav aria-label="navegação">
                {page?.totalPages > 1 ? (
                  <ul className="flex justify-start items-center -space-x-px mt-6">
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
                ) : (
                  ""
                )}
              </nav>
              <div className="self-end items-center">{listBox()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["rastreio-token"]: token } = parseCookies(ctx);
  const { ["rastreio-permissao"]: permissao } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  if (permissao === "USER") {
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
