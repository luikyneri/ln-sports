import { Header } from "@/components/Header";
import { ShirtCatalog } from "@/components/ShirtCatalog";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ShirtCatalog />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground tracking-widest uppercase">
            © 2025 LN Sports — Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index