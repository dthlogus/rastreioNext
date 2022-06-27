import Image from "next/image";
import logoEmpresa from "/public/images/logo_empresa.png";

export default function HeaderRastreio() {
  return (
    <div className="flex justify-center mt-10">
      <Image src={logoEmpresa} alt="Logo da empresa" width={220} height={85} />
      <p className="font-bold text-xs mt-8 ml-2">
        Sua encomenda no melhor caminho
      </p>
    </div>
  );
}
