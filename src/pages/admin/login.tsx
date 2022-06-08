import axios from "axios";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit } = useForm();

  function logar(data: any) {
    const usuario: userDTO = axios
      .post(`${process.env.API_URL}usuarios/auth`, {
        login: data.login,
        senha: data.senha,
      })
      .then(function (response) {
        console.log(response);
      });
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(logar)}
        >
          <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
            Acessar o sistema
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="usuario"
            >
              Usuario
            </label>
            <input
              {...register("login")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-solid focus:border-2 focus:border-sky-500"
              name="login"
              type="text"
              required
              autoFocus
              placeholder="Usuário"
              autoComplete="username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="senha"
            >
              Senha
            </label>
            <input
              {...register("senha")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-solid focus:border-2 focus:border-sky-500"
              type="password"
              placeholder="Senha"
              name="senha"
              required
              autoComplete="current-password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={logar}
              className="px-4 py-2 rounded text-white inline-block shadow-lg bg-[#C72036] hover:bg-[#BA1E34] focus:bg-[#7A1421]"
              type="submit"
            >
              Acessar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
