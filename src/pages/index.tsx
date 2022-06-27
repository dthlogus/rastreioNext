import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Header from "../components/template/Header";
import logo from "../../public/images/principal/dhl-logo.svg";
import Link from "next/link";
import { Globe, WarningCircle } from "phosphor-react";

const Home: NextPage = () => {
  return (
    <>
      <Header title="Principal" />
      <div className="w-9/12 m-auto h-screen">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-100">
          <div className="flex items-center bg-red-700">
            <span className="text-white p-6">
              <WarningCircle size={20} weight="fill" />
            </span>
            <Link href="https://www.dhl.com/global-en/home/global-news-alerts.html?region=americas&country=br">
              <a className="text-white">
                Visualizar alertas de incidentes que possam afetar os serviços
                da DHL (1)
              </a>
            </Link>
          </div>
          <div className="ml-10 mr-10 flex justify-between">
            <Image src={logo} height={100} width={200} alt="logo" />
            <div className="flex items-start">
              <div className="flex items-center mt-5 hover:text-red-700 text-sm mr-6">
                <span>
                  <WarningCircle size={20} weight="fill" />
                </span>
                <Link href="https://www.dhl.com/global-en/home/global-news-alerts.html?region=americas&country=br">
                  <a>Alertas(1)</a>
                </Link>
              </div>
              <div className="flex items-center mt-5 hover:text-red-700 text-sm mr-6">
                <span>
                  <Globe size={20} />
                </span>
                <Link href="https://www.dhl.com/global-en/home/global-news-alerts.html?region=americas&country=br">
                  <a>Brasil</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/rastreio",
      permanent: false,
    },
  };
};
