import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Truck, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      
      <section className="section container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>¿Por qué El Chiltepín?</h2>
          <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
            Calidad, frescura y el toque secreto que solo encontrarás en los mariscos estilo Sinaloa.
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          <FeatureCard 
            icon={<Zap size={32} color="var(--primary)" />}
            title="Sabor de Culiacán"
            description="Recetas originales de Sinaloa con el picor perfecto del chiltepín."
          />
          <FeatureCard 
            icon={<Truck size={32} color="var(--primary)" />}
            title="Entrega Rápida"
            description="Tu pedido llega fresco y listo para disfrutar en la puerta de tu casa."
          />
          <FeatureCard 
            icon={<ShieldCheck size={32} color="var(--primary)" />}
            title="Calidad Premium"
            description="Seleccionamos los mejores ingredientes del mar para garantizar frescura total."
          />
        </div>
      </section>

      {/* Footer Placeholder */}
      <footer style={{ 
        padding: '4rem 0', 
        background: 'var(--foreground)', 
        color: 'white',
        marginTop: 'auto'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>El Chiltepín</h3>
          <p style={{ opacity: 0.7 }}>Mariscos de Culiacán en Aguascalientes</p>
          <div style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.5 }}>
            © 2026 El Chiltepín. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div style={{ 
      padding: '2.5rem', 
      background: 'var(--card-bg)', 
      borderRadius: '24px', 
      border: '1px solid var(--card-border)',
      textAlign: 'center',
      transition: 'all var(--transition-fast)',
      cursor: 'default'
    }} className="feature-card">
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        {icon}
      </div>
      <h3 style={{ marginBottom: '1rem' }}>{title}</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{description}</p>
    </div>
  );
}
