import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useSearchParams } from 'react-router-dom'; 

export const useFirebaseShirts = () => {
  const [shirts, setShirts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  // 1. CAPTURA O ID DA URL: ex: seusite.com/?loja=ID_AQUI
  // Se não houver nada na URL, ele usa o seu ID por padrão
  const lojaId = searchParams.get('loja') || "4zoEZXPbAfNAPnWscpluiWL0gU63"; 

  useEffect(() => {
    // 2. BUSCA DINÂMICA: Filtra pelo ID capturado
    const q = query(
      collection(db, "CAMISAS"),
      where("userId", "==", lojaId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const shirtList = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          time: data.time || "",
          liga: data.liga || "",
          modelo: data.modelo || "",
          preco: data.preco || 0,
          imagens: data.imagens || (data.imagem ? [data.imagem] : []),
        };
      });
      setShirts(shirtList);
      setLoading(false);
    }, (error) => {
      console.error("Erro na captura automática:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [lojaId]); // Se o ID na URL mudar, o site atualiza os produtos na hora

  return { shirts, loading };
};