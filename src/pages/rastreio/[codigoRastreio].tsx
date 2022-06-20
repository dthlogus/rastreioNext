import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";
import Moment from "react-moment";
import FooterRastreio from "../../components/rastreio/FooterRastreio";
import HeaderRastreio from "../../components/rastreio/HeaderRastreio";
import SituacaoRastreio from "../../components/rastreio/SituacaoRastreio";
import Header from "../../components/template/Header";
import { PacoteDTO } from "../../model/pacoteDTO";
import api from "../../service/axiosFree";
import { mask } from "../../service/mask";

export default function CodigoRastreio() {
  const router = useRouter();
  const [cliente, setCliente] = useState<PacoteDTO | null>(null);
  const { codigoRastreio } = router.query;

  function pegarDados() {
    if (cliente === null) {
      api.get(`/pacote/${codigoRastreio}`).then((response) => {
        setCliente(response.data);
      });
    }
  }

  pegarDados();

  return (
    <>
      <Header title={`Rastreio - ${codigoRastreio}`} />
      <HeaderRastreio />
      <div className="sm:2/3 lg:w-1/4 lg:m-auto flex flex-col justify-center items-center">
        <span className="text-center w-full p-2 text-2xl font-bold bg-[#DCDCDC] rounded-md mt-14 mb-12">
          Rastreiamento
        </span>
      </div>
      <div className="lg:w-1/4 xl:w-1/5 lg:m-auto flex flex-col justify-start items-start">
        <p className="font-bold">Nome:</p>
        <p className="mb-6">{cliente?.cliente}</p>
        <p className="font-bold">CPF:</p>
        <p className="mb-6">{mask(cliente?.cpf)}</p>
        <p className="font-bold">Origem:</p>
        <p className="mb-6">{cliente?.enderecoOrigem}</p>
        <p className="font-bold">Destino:</p>
        <p className="mb-6">{cliente?.enderecoDestino}</p>
        <p className="font-bold">Data da Postagem:</p>
        <p className="mb-6">
          <Moment format="DD/MM/yyyy">{cliente?.dataPostagem}</Moment>
        </p>
        <p className="font-bold">Status da entrega:</p>
        <p className="mb-8 text-red-600">{cliente?.situacao}</p>
        <SituacaoRastreio codigo={codigoRastreio} />
      </div>
      <FooterRastreio />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx;
  const codigo = params?.codigoRastreio;
  const { ["rastreio-pacote"]: pacote } = parseCookies(ctx);

  if (pacote !== codigo) {
    return {
      redirect: {
        destination: "/rastreio",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
