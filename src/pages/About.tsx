import React from "react";

// Componente BenefitItem atualizado
interface BenefitItemProps {
  number: string;
  title: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  reverse?: boolean;
}

function BenefitItem({ number, title, description, Icon, reverse = false }: BenefitItemProps) {
  return (
    <div className={`flex items-center gap-8 mb-12 ${reverse ? 'flex-row-reverse' : ''} max-w-6xl mx-auto`}>
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-blue-500 mb-4">
          {number}. {title}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex-shrink-0">
        <div className="w-48 h-48 bg-blue-100 rounded-2xl flex items-center justify-center shadow-sm">
          <Icon width={140} height={140} />
        </div>
      </div>
    </div>
  );
}

import Img1 from "/src/assets/img1.svg?react";
import Img2 from "/src/assets/img2.svg?react";
import Img3 from "/src/assets/img3.svg?react";
import Img4 from "/src/assets/img4.svg?react";
import Img5 from "/src/assets/img5.svg?react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-black">Ride</span>
            <span className="text-blue-500">Bro</span>
            <span className="text-black"> oferece benefícios para você</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Reservar uma viagem nunca foi tão fácil! Graças à nossa tecnologia e simplicidade do app,
            você reserva sua viagem em poucos minutos.
          </p>
        </div>

{/* Benefits */}
        <div className="space-y-16">
          <BenefitItem
            number="01"
            title="Reserve em Segundos, Viaje sem Estresse"
            description="Diga adeus à complicação. Com uma interface intuitiva, você agenda sua carona ou encontra a viagem perfeita em apenas alguns cliques. Simples, rápido e eficiente."
            Icon={Img1}
            reverse={false}
          />

          <BenefitItem
            number="02"
            title="Sua Segurança em Tempo Real"
            description="A tranquilidade de saber sempre onde você está. Acompanhe todo o trajeto pelo mapa ao vivo e compartilhe sua rota com amigos ou familiares. Mais segurança para você e para quem te espera."
            Icon={Img2}
            reverse={true}
          />

          <BenefitItem
            number="03"
            title="Conforto e Confiança em Cada Quilômetro"
            description="Nossa prioridade é sua experiência. Viaje com motoristas verificados e veículos que seguem nossos padrões de qualidade. Sua única preocupação será relaxar e aproveitar o caminho."
            Icon={Img3}
            reverse={false}
          />

          <BenefitItem
            number="04"
            title="Economize Sem Abrir Mão da Qualidade"
            description="Viajar não precisa ser caro. Oferecemos tarifas justas e competitivas para que você possa ir mais longe, gastando menos. O melhor custo-benefício na palma da sua mão."
            Icon={Img4}
            reverse={true}
          />

          <BenefitItem
            number="05"
            title="Suporte 24/7: Estamos Sempre com Você"
            description="Seja de dia ou de noite, nossa equipe está pronta para ajudar. Conte com um atendimento humanizado e disponível 24 horas por dia, 7 dias por semana, para qualquer dúvida ou imprevisto."
            Icon={Img5}
            reverse={false}
          />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-blue-500 text-white py-12 px-8 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Acesse nosso site e comece a economizar em suas viagens hoje mesmo!
            </p>
            <button className="bg-white text-blue-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors shadow-md">
              Acessar Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}