import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase"; 
import { useNavigate } from "react-router-dom";
import { 
  collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot 
} from "firebase/firestore";

export const Admin = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("camisas");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [hasOrderChanges, setHasOrderChanges] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);

  const [dbShirts, setDbShirts] = useState<any[]>([]);
  const [dbTeams, setDbTeams] = useState<any[]>([]);
  const [dbLeagues, setDbLeagues] = useState<any[]>([]);

  const [shirtData, setShirtData] = useState({ 
    time: "", liga: "", modelo: "", imagens: [] as string[], preco: "" 
  });
  const [newTeam, setNewTeam] = useState({ name: "", league: "", badge: "" });
  const [newLeague, setNewLeague] = useState({ name: "" });

  const [listFilterLeague, setListFilterLeague] = useState("all"); 
  const [listFilterTeam, setListFilterTeam] = useState("all"); 
  const [searchShirt, setSearchShirt] = useState("");
  const [searchTeam, setSearchTeam] = useState("");

  const CLOUD_NAME = "dyl7ygnd6"; 
  const UPLOAD_PRESET = "catalogo_camisas"; 

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/auth"); 
      } else {
        setLoading(false);
      }
    });

    const unsubLigas = onSnapshot(collection(db, "LIGAS"), (snap) => {
      const data = snap.docs.map(d => ({
        ...d.data(),
        id: d.id,
        order: typeof (d.data() as any).order === 'number' ? (d.data() as any).order : 999
      }));
      setDbLeagues(data.sort((a, b) => a.order - b.order));
      setHasOrderChanges(false);
    });

    const unsubTimes = onSnapshot(collection(db, "TIMES"), (snap) => {
      setDbTeams(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    });

    const unsubCamisas = onSnapshot(collection(db, "CAMISAS"), (snap) => {
      setDbShirts(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    });

    return () => { 
      unsubscribeAuth();
      unsubLigas(); 
      unsubTimes(); 
      unsubCamisas(); 
    };
  }, [navigate]);

  const handleSaveShirt = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const selectedLeague = dbLeagues.find((l: any) => l.id === shirtData.liga);
      const dataToSave = { 
        ...shirtData, 
        liga: selectedLeague ? selectedLeague.name : shirtData.liga,
        preco: Number(shirtData.preco) 
      };

      if (editingId) await updateDoc(doc(db, "CAMISAS", editingId), dataToSave);
      else await addDoc(collection(db, "CAMISAS"), dataToSave);
      
      setShirtData({ time: "", liga: "", modelo: "", imagens: [], preco: "" });
      setEditingId(null);
    } catch (err) { alert("Erro ao salvar"); }
    finally { setLoading(false); }
  };

  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const selectedLeague = dbLeagues.find((l: any) => l.id === newTeam.league);
      const teamToSave = { 
        ...newTeam, 
        league: selectedLeague ? selectedLeague.name : newTeam.league 
      };

      if (editingId) await updateDoc(doc(db, "TIMES", editingId), teamToSave);
      else await addDoc(collection(db, "TIMES"), teamToSave);
      
      setNewTeam({ name: "", league: "", badge: "" });
      setEditingId(null);
    } catch (err) { alert("Erro"); }
    finally { setLoading(false); }
  };

  const saveLeaguesOrder = async () => {
    setLoading(true);
    try {
      for (let i = 0; i < dbLeagues.length; i++) {
        await updateDoc(doc(db, "LIGAS", dbLeagues[i].id), { order: i });
      }
      alert("✅ Ordem salva!");
    } catch (err) { alert("Erro"); } finally { setLoading(false); }
  };

  const handleDrop = (e: React.DragEvent, destIndex: number) => {
    const sourceIndex = parseInt(e.dataTransfer.getData("index"));
    const newLeagues = [...dbLeagues];
    const [movedItem] = newLeagues.splice(sourceIndex, 1);
    newLeagues.splice(destIndex, 0, movedItem);
    setDbLeagues(newLeagues);
    setHasOrderChanges(true);
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
      const data = await res.json();
      return data.secure_url;
    } catch (err) { return null; } finally { setUploading(false); }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="font-black italic text-blue-700 animate-pulse uppercase tracking-tighter">Verificando Acesso LN SPORT...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="font-black italic text-blue-700 uppercase text-3xl tracking-tighter">LN Sports Admin</div>
          <button 
            onClick={() => auth.signOut()} 
            className="text-[10px] font-black bg-red-50 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all uppercase"
          >
            Sair do Painel
          </button>
        </header>
        
        <nav className="flex gap-4 mb-8 border-b border-slate-200">
          {["camisas", "times", "ligas"].map((t) => (
            <button key={t} onClick={() => { setTab(t); setEditingId(null); }} className={`pb-3 px-6 font-bold text-xs uppercase transition-all ${tab === t ? 'border-b-4 border-blue-600 text-blue-600' : 'text-slate-400'}`}>{t}</button>
          ))}
        </nav>

        {tab === "camisas" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <form onSubmit={handleSaveShirt} className="bg-white p-6 rounded-2xl shadow-sm border h-fit space-y-4 sticky top-4">
              <h2 className="font-black text-blue-800 uppercase text-xs italic">{editingId ? "✏️ Editar Camisa" : "Nova Camisa"}</h2>
              <select className="w-full p-3 border rounded-xl font-bold bg-slate-50 text-xs" value={shirtData.liga} onChange={e => setShirtData({...shirtData, liga: e.target.value, time: ""})} required>
                <option value="">LIGA...</option>
                {dbLeagues.map((l: any) => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
              <select className="w-full p-3 border rounded-xl font-bold bg-slate-50 text-xs" value={shirtData.time} onChange={e => setShirtData({...shirtData, time: e.target.value})} required disabled={!shirtData.liga}>
                <option value="">TIME...</option>
                {dbTeams.filter((t: any) => {
                   const leagueObj = dbLeagues.find((l: any) => l.id === shirtData.liga);
                   return t.league === shirtData.liga || t.league === leagueObj?.name;
                }).map((t: any) => <option key={t.id} value={t.name}>{t.name}</option>)}
              </select>
              <input placeholder="Modelo (Ex: Home 24/25)" className="w-full p-3 border rounded-xl text-xs font-bold" value={shirtData.modelo} onChange={e => setShirtData({...shirtData, modelo: e.target.value})} required />
              <input placeholder="Preço" type="number" className="w-full p-3 border rounded-xl text-xs font-bold" value={shirtData.preco} onChange={e => setShirtData({...shirtData, preco: e.target.value})} required />
              <div className="border-2 border-dashed p-4 rounded-xl flex flex-wrap gap-2">
                 {shirtData.imagens.map((img: string, i: number) => (
                   <div key={i} className="relative group">
                     <img src={img} className="h-12 w-12 object-cover rounded-lg border" />
                     <button type="button" onClick={() => setShirtData({...shirtData, imagens: shirtData.imagens.filter((_, idx) => idx !== i)})} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-[10px]">x</button>
                   </div>
                 ))}
                 <label className="h-12 w-12 border-2 border-blue-200 rounded-lg flex items-center justify-center cursor-pointer font-bold text-blue-500">
                   <input type="file" className="hidden" onChange={async (e) => { 
                     const file = e.target.files?.[0];
                     if (file) {
                       const url = await uploadImage(file); 
                       if (url) setShirtData(p => ({ ...p, imagens: [...p.imagens, url] })); 
                     }
                   }} />
                   {uploading ? "..." : "+"}
                 </label>
              </div>
              <button className={`w-full text-white p-4 rounded-xl font-black uppercase text-xs ${editingId ? 'bg-orange-500' : 'bg-blue-600'}`}>
                {loading ? "Processando..." : (editingId ? "Atualizar" : "Salvar Camisa")}
              </button>
            </form>

            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-white p-3 rounded-xl border shadow-sm">
                <select className="p-2 border rounded-lg text-[10px] font-black uppercase bg-slate-50" value={listFilterLeague} onChange={e => {setListFilterLeague(e.target.value); setListFilterTeam("all")}}>
                  <option value="all">Todas as Ligas</option>
                  {dbLeagues.map((l: any) => <option key={l.id} value={l.name}>{l.name}</option>)}
                </select>
                <select className="p-2 border rounded-lg text-[10px] font-black uppercase bg-slate-50" value={listFilterTeam} onChange={e => setListFilterTeam(e.target.value)}>
                  <option value="all">Todos os Times</option>
                  {dbTeams.filter((t: any) => listFilterLeague === "all" || t.league === listFilterLeague).map((t: any) => <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>
                <input placeholder="Buscar modelo..." className="p-2 border rounded-lg text-xs font-bold uppercase" value={searchShirt} onChange={e => setSearchShirt(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dbShirts.filter((s: any) => (listFilterLeague === "all" || s.liga === listFilterLeague) && (listFilterTeam === "all" || s.time === listFilterTeam) && (s.modelo?.toLowerCase().includes(searchShirt.toLowerCase()))).map((s: any) => (
                  <div key={s.id} className="bg-white p-4 rounded-2xl border flex items-center gap-4 group">
                    <img src={s.imagens?.[0]} className="w-16 h-16 object-cover rounded-xl border" />
                    <div className="flex-1">
                      <p className="text-[10px] font-black text-blue-600 uppercase italic">{s.liga}</p>
                      <h3 className="text-xs font-black uppercase leading-tight">{s.time}</h3>
                      <p className="text-[10px] text-slate-400 font-bold">{s.modelo}</p>
                      <p className="text-xs font-black text-green-600 font-mono">R$ {s.preco}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button onClick={() => { setEditingId(s.id); setShirtData({time: s.time, liga: s.liga, modelo: s.modelo, imagens: s.imagens, preco: String(s.preco)}); }} className="p-2 text-blue-500 bg-blue-50 rounded-lg text-[10px] font-black uppercase">Editar</button>
                      <button onClick={() => confirm("Deletar camisa?") && deleteDoc(doc(db, "CAMISAS", s.id))} className="p-2 text-red-500 bg-red-50 rounded-lg text-[10px] font-black">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "times" && (
          <div className="space-y-6">
            <form onSubmit={handleSaveTeam} className="bg-white p-6 rounded-2xl border shadow-sm flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="text-[10px] font-black uppercase mb-1 block">Nome do Time</label>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={newTeam.name} onChange={e => setNewTeam({...newTeam, name: e.target.value})} required />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="text-[10px] font-black uppercase mb-1 block">Liga</label>
                <select className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={newTeam.league} onChange={e => setNewTeam({...newTeam, league: e.target.value})} required>
                  <option value="">SELECIONE A LIGA...</option>
                  {dbLeagues.map((l: any) => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>
              <label className="p-3 border-2 border-dashed rounded-xl cursor-pointer h-[46px] flex items-center justify-center min-w-[120px]">
                <input type="file" className="hidden" onChange={async (e) => { 
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = await uploadImage(file); 
                    if (url) setNewTeam({...newTeam, badge: url}); 
                  }
                }} />
                {newTeam.badge ? <img src={newTeam.badge} className="h-6" /> : <span className="text-[10px] font-black uppercase text-blue-600">+ Escudo</span>}
              </label>
              <button className={`px-8 h-[46px] rounded-xl font-black text-[10px] uppercase text-white ${editingId ? 'bg-orange-500' : 'bg-slate-900'}`}>
                {editingId ? "Atualizar" : "Criar Time"}
              </button>
            </form>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {dbTeams.filter((t: any) => (teamFilterLeague === "all" || t.league === teamFilterLeague)).map((t: any) => (
                <div key={t.id} className="bg-white p-4 rounded-2xl border text-center relative group">
                  <img src={t.badge} className="h-10 mx-auto mb-2 object-contain" />
                  <p className="text-[9px] font-black uppercase leading-tight">{t.name}</p>
                  <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => { setEditingId(t.id); setNewTeam({name: t.name, league: t.league, badge: t.badge}); }} className="bg-blue-600 text-white p-1 rounded text-[8px] uppercase font-black">Edit</button>
                    <button onClick={() => confirm("Deletar time?") && deleteDoc(doc(db, "TIMES", t.id))} className="bg-red-500 text-white p-1 rounded text-[8px]">×</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "ligas" && (
          <div className="space-y-6">
            <form onSubmit={async (e) => {
              e.preventDefault(); setLoading(true);
              try {
                await addDoc(collection(db, "LIGAS"), { name: newLeague.name.toUpperCase(), order: dbLeagues.length });
                setNewLeague({ name: "" });
              } catch (err) { alert("Erro ao criar liga"); }
              finally { setLoading(false); }
            }} className="bg-white p-6 rounded-2xl border shadow-sm flex gap-3">
              <input placeholder="Nome da Nova Liga (Ex: Brasileirão)..." className="flex-1 p-4 border rounded-xl text-xs font-bold uppercase" value={newLeague.name} onChange={e => setNewLeague({name: e.target.value})} required />
              <button className="bg-blue-700 text-white px-8 rounded-xl font-black uppercase text-xs">Criar Liga</button>
            </form>
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-black text-slate-400 uppercase text-[10px] italic">Organizar Exibição (Arraste)</h2>
                {hasOrderChanges && <button onClick={saveLeaguesOrder} className="bg-green-600 text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase animate-bounce">Salvar Nova Ordem</button>}
              </div>
              <div className="space-y-2">
                {dbLeagues.map((l: any, index: number) => (
                  <div key={l.id} draggable onDragStart={(e) => e.dataTransfer.setData("index", index.toString())} onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, index)} className="flex items-center justify-between p-4 bg-slate-50 border rounded-xl cursor-move hover:bg-white transition-all group">
                    <span className="text-xs font-black uppercase italic">#{index + 1} {l.name}</span>
                    <button onClick={() => confirm("Deletar liga?") && deleteDoc(doc(db, "LIGAS", l.id))} className="text-red-300 group-hover:text-red-500 transition-colors">🗑️</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};