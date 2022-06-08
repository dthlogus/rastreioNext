import Router from "next/router";
import { useState } from "react";
import FooterRastreio from "../../components/rastreio/FooterRastreio";
import HeaderRastreio from "../../components/rastreio/HeaderRastreio";
import Botao from "../../components/template/Botao";

export default function InicialRastreio() {
  const [codigoRastreio, setCodigoRastreio] = useState<string>("");

  function enviarCodigo() {
    Router.push({
      pathname: "/rastreio/[codigoRastreio]",
      query: { codigoRastreio: codigoRastreio },
    });
  }

  return (
    <>
      <HeaderRastreio />
      <div className="flex justify-center items-center my-12 md:my-32">
        <div className="w-2/3 lg:w-2/4 xl:w-1/4 2xl:w-1/5 bg-[#ba1e34] flex flex-col items-center justify-center rounded-md">
          <p className="text-white font-bold uppercase text-center text-xl my-5">
            Rastreie sua encomenda
          </p>
          <p className="text-white text-sm">Informe o código de rastreio</p>
          <input
            type="text"
            className="w-44 md:w-60 py-2 text-center font-semibold text-gray-500 placeholder:text-gray-500 rounded mb-7 focus:outline-none"
            placeholder="Ex: PC452975BR"
            value={codigoRastreio}
            onChange={(event) => setCodigoRastreio(event.target.value)}
          />
          <Botao
            className="cursor-pointer text-white w-44 md:w-60 py-1.5 rounded-md md:rounded-sm text-center shadow-complete mb-10"
            texto="Procurar"
            onClick={enviarCodigo}
          />
        </div>
      </div>
      <FooterRastreio />
    </>
  );
}
