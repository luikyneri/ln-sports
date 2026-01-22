import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
  setError("E-mail ou senha incorretos.");
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="font-black italic text-blue-700 text-3xl uppercase tracking-tighter">LN Sports</h1>
          <p className="text-slate-400 text-xs font-bold uppercase mt-2">Acesso Restrito ao Painel</p>
        </div>

        {error && <p className="bg-red-50 text-red-500 p-3 rounded-lg text-xs font-bold text-center">{error}</p>}

        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="E-mail" 
            className="w-full p-4 border rounded-xl text-sm font-bold bg-slate-50 text-slate-900 placeholder:text-slate-400"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            className="w-full p-4 border rounded-xl text-sm font-bold bg-slate-50 text-slate-900 placeholder:text-slate-400"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button className="w-full bg-blue-600 text-white p-4 rounded-xl font-black uppercase text-sm hover:bg-blue-700 transition-all">
          Entrar no Painel
        </button>
      </form>
    </div>
  );
};