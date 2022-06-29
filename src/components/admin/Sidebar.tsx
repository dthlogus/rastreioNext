import Link from "next/link";
import Router from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { ArrowsLeftRight, Eye, List, Package, User } from "phosphor-react";
import { useEffect, useState } from "react";
import Botao from "../template/Botao";

export default function Sidebar() {
  const [desativarMenu, setDesativarMenus] = useState(false);
  const [ativo, setAtivo] = useState("");
  const [permissao, setPermissao] = useState("");

  function logout() {
    destroyCookie(null, "rastreio-token", { path: "/" });
    Router.push("/admin/login");
  }
  const classAtivo =
    "flex items-center text-bold py-4 px-6 h-12 overflow-hidden bg-slate-500 text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out";
  const classInativo =
    "flex items-center text-bold py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out";

  useEffect(() => {
    const rota = Router.pathname;
    switch (rota) {
      case "/admin":
        setAtivo("cadastrar");
        break;
      case "/admin/visualizar":
        setAtivo("visualizar");
        break;
      case "/admin/alterar":
        setAtivo("alterar");
        break;
      case "/admin/visualizarUsuarios":
        setAtivo("usuarios");
        break;
      case "/admin/criarUsuario":
        setAtivo("usuarios");
        break;
    }
  }, []);

  useEffect(() => {
    const { ["rastreio-permissao"]: permissao } = parseCookies();
    setPermissao(permissao);
  }, []);

  return (
    <>
      <div
        className={`transition-all ${
          desativarMenu ? `scale-100` : `scale-75 rotate-180`
        } duration-500 z-20 left-2 absolute md:hidden`}
        onClick={() => {
          setDesativarMenus(!desativarMenu);
        }}
      >
        <li className="relative mt-2 border-2 rounded-full border-gray-300 inline-block p-2 text-white cursor-pointer ">
          <List size={24} />
        </li>
      </div>
      <div
        className={`${
          desativarMenu ? `ml-0 w-full` : "-ml-96"
        } transition-all ease-out duration-300 z-10 md:ml-0 md:w-60 h-full flex flex-col justify-between shadow-md bg-slate-700 px-1 absolute`}
      >
        <div>
          <ul className="relative">
            <li className="relative mt-20 md:mt-5">
              <Link href="/admin">
                <a
                  className={ativo === "cadastrar" ? classAtivo : classInativo}
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                >
                  <Package size={20} />
                  <p className="ml-2">Cadastrar Pacote</p>
                </a>
              </Link>
            </li>
            <li className="relative mt-5">
              <Link href="/admin/visualizar">
                <a
                  className={ativo === "visualizar" ? classAtivo : classInativo}
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                >
                  <Eye size={20} />
                  <p className="ml-2">Visualizar Pacotes</p>
                </a>
              </Link>
            </li>
            <li className="relative mt-5">
              <Link href="/admin/alterar">
                <a
                  className={ativo === "alterar" ? classAtivo : classInativo}
                  href="#!"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                >
                  <ArrowsLeftRight size={20} />
                  <p className="ml-2">Alterar Situação</p>
                </a>
              </Link>
            </li>
            {permissao === "USER" ? (
              ""
            ) : (
              <li className="relative mt-5">
                <Link href="/admin/visualizarUsuarios">
                  <a
                    className={ativo === "usuarios" ? classAtivo : classInativo}
                    href="#!"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="dark"
                  >
                    <User size={20} />
                    <p className="ml-2">Usuarios</p>
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <Botao
            texto="Sair"
            className="mb-5 flex items-center text-bold py-4 px-6 h-12 overflow-hidden cursor-pointer text-white text-ellipsis whitespace-nowrap rounded hover:bg-red-500 transition duration-300 ease-in-out"
            onClick={logout}
          />
        </div>
      </div>
    </>
  );
}
