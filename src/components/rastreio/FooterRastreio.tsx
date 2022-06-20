import Image from "next/image";
import logoEmpresa from "/public/images/logo_empresa.png";

export default function FooterRastreio() {
  return (
    <div className="w-full h-24 bg-white flex flex-col md:flex-row justify-center items-center">
      <div className="w-40 h-14 block">
        <Image
          src={logoEmpresa}
          alt="Logo da empresa"
          width={220}
          height={85}
        />
      </div>
      <p className="text-gray-400 md:ml-20 mt-4 md:mt-0">
        &copy; 2022 - Todos os direitos reservados
      </p>
    </div>
  );
}
