import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore'; // Adicionamos query e where
import { db, auth } from '../lib/firebase'; // Importamos o auth

export const useFirebaseShirts = () => {
  const [shirts, setShirts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;

    // Se não houver usuário logado, não tentamos buscar para evitar erros
    if (!user) {
      setLoading(false);
      return;
    }

    // A MÁGICA DO SAAS: Filtramos a coleção pelo userId do usuário logado
    const q = query(
      collection(db, "CAMISAS"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const shirtList = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          time: data.time || "",
          liga: data.liga || "",
          modelo: data.modelo || "",
          imagens: data.imagens || (data.imagem ? [data.imagem] : []),
          userId: data.userId || "" // Guardamos o ID do dono para conferência
        };
      });
      setShirts(shirtList);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar camisas:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { shirts, loading };
};