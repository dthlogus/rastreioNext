import Image from "next/image";
import { useState } from "react";
import Moment from "react-moment";
import { SituacaoDTO } from "../../model/situacaoDTO";
import api from "../../service/axiosFree";
import gifLoading from "/public/images/loadingBalls.gif";
import emTransferencia from "/public/images/logo_emTransferencia.png";
import entregue from "/public/images/logo_entregue.png";
import postado from "/public/images/logo_postado.png";
import rotaEntrega from "/public/images/logo_rotaEntrega.png";
import unidadeTratamento from "/public/images/logo_unidadeTratamento.png";

export interface SituacaoRastreioProps {
  codigo: any;
}

export default function SituacaoRastreio(props: SituacaoRastreioProps) {
  const [situacao, setSituacao] = useState<SituacaoDTO | null>(null);
  const { codigo } = props;

  function pegarSituacao() {
    if (situacao === null) {
      api.get(`/situacao/${codigo}`).then((resposta) => {
        setSituacao(resposta.data);
      });
    }
  }

  function RenderizarSituacao() {
    pegarSituacao();
    return (
      <>
        <div className="lg:ml-6 ml-0 mt-6 flex justify-start items-center">
          <div className="rounded-xl">
            <Image src={postado} alt="postado" width={65} height={65} />
          </div>
          <div className="flex flex-col ml-4">
            <p className="font-bold">Objeto postado</p>
            {situacao?.postado ? (
              <p>
                <Moment format="DD/MM/yyyy - HH:mm:ss">
                  {situacao?.dataPostado}
                </Moment>
              </p>
            ) : (
              <div className="flex">
                <Image
                  src={gifLoading}
                  alt="carregando"
                  width={25}
                  height={25}
                />
                <p className="text-red-600">Aguardando</p>
              </div>
            )}
          </div>
        </div>
        <div className="lg:ml-6 ml-0 mt-6 flex justify-start items-center">
          <div className="rounded-xl">
            <Image
              src={emTransferencia}
              alt="em transferencia"
              width={65}
              height={65}
            />
          </div>
          <div className="flex flex-col ml-4">
            <p className="font-bold">Em transferencia</p>
            {situacao?.transferencia ? (
              <p>
                <Moment format="DD/MM/yyyy - HH:mm:ss">
                  {situacao?.dataTransferencia}
                </Moment>
              </p>
            ) : (
              <div className="flex">
                <Image
                  src={gifLoading}
                  alt="carregando"
                  width={25}
                  height={25}
                />
                <p className="text-red-600">Aguardando</p>
              </div>
            )}
          </div>
        </div>
        <div className="lg:ml-6 ml-0 mt-6 flex justify-start items-center">
          <div className="rounded-xl">
            <Image
              src={unidadeTratamento}
              alt="unidade de tratamento"
              width={65}
              height={65}
            />
          </div>
          <div className="flex flex-col ml-4">
            <p className="font-bold">Unidade de tratamento</p>
            {situacao?.tratamento ? (
              <p>
                <Moment format="DD/MM/yyyy - HH:mm:ss">
                  {situacao?.dataTratamento}
                </Moment>
              </p>
            ) : (
              <div className="flex">
                <Image
                  src={gifLoading}
                  alt="carregando"
                  width={25}
                  height={25}
                />
                <p className="text-red-600">Aguardando</p>
              </div>
            )}
          </div>
        </div>
        <div className="lg:ml-6 ml-0 mt-6 flex justify-start items-center">
          <div className="rounded-xl">
            <Image
              src={rotaEntrega}
              alt="rota de entrega"
              width={65}
              height={65}
            />
          </div>
          <div className="flex flex-col ml-4">
            <p className="font-bold">Em rota de entrega</p>
            {situacao?.rotaEntrega ? (
              <p>
                <Moment format="DD/MM/yyyy - HH:mm:ss">
                  {situacao?.dataRotaEntrega}
                </Moment>
              </p>
            ) : (
              <div className="flex">
                <Image
                  src={gifLoading}
                  alt="carregando"
                  width={25}
                  height={25}
                />
                <p className="text-red-600">Aguardando</p>
              </div>
            )}
          </div>
        </div>
        <div className="lg:ml-6 ml-0 mt-6 flex justify-start items-center mb-8">
          <div className="rounded-xl">
            <Image src={entregue} alt="entregue" width={65} height={65} />
          </div>
          <div className="flex flex-col ml-4">
            <p className="font-bold">Objeto entregue</p>
            {situacao?.entregue ? (
              <p>
                <Moment format="DD/MM/yyyy - HH:mm:ss">
                  {situacao?.dataEntregue}
                </Moment>
              </p>
            ) : (
              <div className="flex">
                <Image
                  src={gifLoading}
                  alt="carregando"
                  width={25}
                  height={25}
                />
                <p className="text-red-600">Aguardando</p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return <div>{RenderizarSituacao()}</div>;
}
