import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const useFirebaseShirts = () => {
  const [shirts, setShirts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca na coleção CAMISAS (maiúsculo como está no seu print)
    const unsubscribe = onSnapshot(collection(db, "CAMISAS"), (snapshot) => {
      const shirtList = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          time: data.time || "",     // Pega o 'time' do Firebase
          liga: data.liga || "",     // Pega a 'liga' do Firebase
          modelo: data.modelo || "", // Pega o 'modelo' do Firebase
          imagens: data.imagens || (data.imagem ? [data.imagem] : []),
        };
      });
      setShirts(shirtList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { shirts, loading };
};