import React, { useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import evento1 from '../../assets/img/evento1.jpg';
import prevencaoIncendiosImg from '../../assets/img/prevencao-incendios.jpg';
import sobrevivenciaMarImg from '../../assets/img/sobrevivencia-mar.jpg';
import segurancaMaritimaImg from '../../assets/img/seguranca-maritima.jpg';

const events = [
  {
    id: 1,
    title: 'BST & DSD Training',
    category: 'Formação marítima',
    image: evento1,
    description: 'Programa intensivo de formação em Basic Safety Training e Designated Security Duties, em parceria com a MARPERITA.',
    objective: 'Preparar profissionais para operações seguras em ambientes marítimos, com conteúdos alinhados com as normas internacionais da IMO.',
    audience: 'Tripulantes, oficiais de segurança, gestores marítimos e profissionais da indústria naval.',
    duration: '5 dias, com sessões teóricas e práticas.',
    benefit: 'Prática de resposta a emergências, evacuação e utilização de equipamentos de segurança.',
  },
  {
    id: 2,
    title: 'Prevenção e consciencialização de incêndios',
    category: 'Segurança no trabalho',
    image: prevencaoIncendiosImg,
    description: 'Formação para reconhecer riscos e aplicar procedimentos de prevenção e resposta a incêndios.',
    objective: 'Reduzir riscos de incêndio e preparar colaboradores para agir com segurança em situações de emergência.',
    audience: 'Equipas de empresas, gestores de segurança e brigadas de incêndio.',
    duration: '2 dias.',
    benefit: 'Utilização de extintores, planos de evacuação e simulações práticas.',
  },
  {
    id: 3,
    title: 'Sobrevivência no mar',
    category: 'Segurança marítima',
    image: sobrevivenciaMarImg,
    description: 'Sessões práticas para desenvolver competências de resposta em situações de emergência no mar.',
    objective: 'Ensinar técnicas de sobrevivência e resposta a situações de emergência em ambiente marítimo.',
    audience: 'Tripulantes, oficiais de bordo e profissionais marítimos.',
    duration: '3 dias.',
    benefit: 'Prática com botes salva-vidas, sinalização de socorro, primeiros socorros e técnicas de resgate.',
  },
  {
    id: 4,
    title: 'Segurança marítima (DSD)',
    category: 'Formação marítima',
    image: segurancaMaritimaImg,
    description: 'Preparação para identificar ameaças e aplicar medidas de segurança a bordo e em portos.',
    objective: 'Capacitar profissionais para identificar ameaças e implementar medidas de segurança em operações marítimas.',
    audience: 'Oficiais de segurança, tripulantes e gestores de transporte marítimo.',
    duration: '4 dias.',
    benefit: 'Avaliação de risco, proteção de cargas, protocolos e exercícios de resposta.',
  },
];

const Eventos = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return selectedEvent ? (
    <main className="page-container">
      <button className="text-action" onClick={() => setSelectedEvent(null)}>
        <ArrowLeftOutlined /> Voltar aos eventos
      </button>
      <div className="page-heading page-heading--left" style={{ marginTop: 20 }}>
        <span className="eyebrow">{selectedEvent.category}</span>
        <h1 className="page-title">{selectedEvent.title}</h1>
        <p className="page-lead">{selectedEvent.description}</p>
      </div>
      <article className="detail-panel">
        <img className="detail-panel-image" src={selectedEvent.image} alt={selectedEvent.title} />
        <div className="detail-panel-content">
          <h2>Sobre a formação</h2>
          <p>{selectedEvent.objective}</p>
          <div className="detail-facts">
            <div className="detail-fact"><strong>Público-alvo</strong><span>{selectedEvent.audience}</span></div>
            <div className="detail-fact"><strong>Duração</strong><span>{selectedEvent.duration}</span></div>
            <div className="detail-fact"><strong>Conteúdos práticos</strong><span>{selectedEvent.benefit}</span></div>
            <div className="detail-fact"><strong>Organização</strong><span>ACMA Consultoria, em parceria com entidades do setor.</span></div>
          </div>
        </div>
      </article>
    </main>
  ) : (
    <main className="page-container">
      <header className="page-heading">
        <span className="eyebrow">Experiência no terreno</span>
        <h1 className="page-title">Eventos e formações</h1>
        <p className="page-lead">Conheça as iniciativas que promovem competências, prevenção e segurança em diferentes setores.</p>
      </header>
      <div className="catalog-grid">
        {events.map((event) => (
          <article className="catalog-card" key={event.id}>
            <img className="catalog-card-image" src={event.image} alt={event.title} />
            <div className="catalog-card-body">
              <span className="eyebrow">{event.category}</span>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <button className="text-action" onClick={() => setSelectedEvent(event)}>
                Ver detalhes <ArrowRightOutlined />
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Eventos;
