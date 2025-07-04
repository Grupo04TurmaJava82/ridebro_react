// ViagensPopulares.tsx - VERSÃO COM EMBLA CAROUSEL

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ViagemCard from './ViagemCard';
import './embla.css';

const dadosViagens = [
  // ... seus dados de viagem aqui ...
  {
    rotaPrincipal: { de: 'Recife', para: 'João Pessoa', preco: '36,68', urlImagem: 'https://ik.imagekit.io/99o04eudvr/ridebro/fotos%20do%20card/Jo%C3%A3o%20Pessoa.jpg?updatedAt=1751664067975' },
    rotasRelacionadas: [
      { de: 'Natal', preco: '31,35' },
      { de: 'Campina Grande', preco: '36,25' },
      { de: 'Fortaleza', preco: '170,99' },
      { de: 'Patos', preco: '105,30' },
    ]
  },
  {
    rotaPrincipal: { de: 'João Pessoa', para: 'Recife', preco: '39,90', urlImagem: 'https://ik.imagekit.io/99o04eudvr/ridebro/fotos%20do%20card/Recife.jpg?updatedAt=1751664067829  ' },
    rotasRelacionadas: [
      { de: 'Natal', preco: '49,00' },
      { de: 'Caruaru', preco: '21,00' },
      { de: 'Campina Grande', preco: '34,00' },
      { de: 'Maceió', preco: '40,00' },
    ]
  },
  {
    rotaPrincipal: { de: 'Feira de Santana', para: 'Salvador', preco: '26,26', urlImagem: 'https://ik.imagekit.io/99o04eudvr/ridebro/fotos%20do%20card/Salvador.jpg?updatedAt=1751664067986' },
    rotasRelacionadas: [
      { de: 'Aracaju', preco: '62,91' },
      { de: 'Alagoinhas', preco: '28,68' },
      { de: 'Recife', preco: '159,00' },
      { de: 'Maceió', preco: '126,84' },
    ]
  },
  {
    rotaPrincipal: { de: 'Curitiba', para: 'Florianópolis', preco: '45,50', urlImagem: 'https://ik.imagekit.io/99o04eudvr/ridebro/fotos%20do%20card/Florian%C3%B3polis.jpg?updatedAt=1751664067833' },
    rotasRelacionadas: [
      { de: 'Joinville', preco: '18,00' },
      { de: 'Blumenau', preco: '20,45' },
      { de: 'Balneário Camboriú', preco: '25,60' },
      { de: 'São José', preco: '19,80' },
    ]
  },
  {
    rotaPrincipal: {
      de: 'Rio de Janeiro',
      para: 'São Paulo',
      preco: '45,50',
      urlImagem: 'https://ik.imagekit.io/99o04eudvr/ridebro/fotos%20do%20card/S%C3%A3o%20Paulo.jpg?updatedAt=1751664067983'
    },
    rotasRelacionadas: [
      { de: 'Belo Horizonte', preco: '72,30' },
      { de: 'Curitiba', preco: '55,00' },
      { de: 'Campinas', preco: '40,20' },
      { de: 'Porto Alegre', preco: '98,45' },
    ]
  },

  {
    rotaPrincipal: {
      de: 'Fortaleza',
      para: 'Natal',
      preco: '35,75',
      urlImagem: 'https://ik.imagekit.io/99o04eudvr/ridebro/fotos%20do%20card/natal.jpg?updatedAt=1751664067977'
    },
    rotasRelacionadas: [
      { de: 'João Pessoa', preco: '29,99' },
      { de: 'Recife', preco: '38,50' },
      { de: 'Mossoró', preco: '25,00' },
      { de: 'Ceará-Mirim', preco: '15,00' },
    ]
  },
];


const ViagensPopulares = () => {
  // Configurações do Embla
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true }, // Opções: loop, etc.
    [Autoplay({ delay: 4000, stopOnInteraction: false })] // Plugins
  );

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Funções para controlar a navegação
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  // Efeito para atualizar o estado dos botões e pontos
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect); // Atualiza ao redimensionar

    // Roda a verificação inicial
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Rotas mais populares
        </h2>

        {/* --- Estrutura do Embla Carousel --- */}
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {dadosViagens.map((viagem, index) => (
              <div className="embla__slide" key={index}>
                <ViagemCard
                  rotaPrincipal={viagem.rotaPrincipal}
                  rotasRelacionadas={viagem.rotasRelacionadas}
                />
              </div>
            ))}
          </div>

          {/* Botões de Navegação */}
          <button className="embla__button embla__button--prev" onClick={scrollPrev} disabled={prevBtnDisabled}>
            <FaChevronLeft size={20} />
          </button>
          <button className="embla__button embla__button--next" onClick={scrollNext} disabled={nextBtnDisabled}>
            <FaChevronRight size={20} />
          </button>
        </div>

        {/* Pontos de Paginação */}
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViagensPopulares;