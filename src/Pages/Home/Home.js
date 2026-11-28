import React from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Whash from '../../assets/img/Whash.jpg';
import BigLifiting from '../../assets/img/BigLifiting.jpg';
import lifingtManager from '../../assets/img/lifingtManager.jpg';
import evento1 from '../../assets/img/evento1.jpg';
import prevencaoIncendiosImg from '../../assets/img/prevencao-incendios.jpg';
import sobrevivenciaMarImg from '../../assets/img/sobrevivencia-mar.jpg';
import segurancaMaritimaImg from '../../assets/img/seguranca-maritima.jpg';
import { useLanguage } from '../../i18n/LanguageContext';

const services = [
  {
    title: 'WASH',
    image: Whash,
    description: 'Soluções de água, saneamento e higiene para ambientes de trabalho e comunidades.',
  },
  {
    title: 'Big Lifting',
    image: BigLifiting,
    description: 'Formação técnica e apoio a operações de elevação e movimentação de cargas.',
  },
  {
    title: 'Lifting Manager',
    image: lifingtManager,
    description: 'Capacitação e consultoria para uma gestão operacional segura e eficiente.',
  },
];

const trainingModules = [
  {
    title: 'Prevenção de incêndios',
    image: prevencaoIncendiosImg,
    description: 'Identificação de riscos, prevenção e resposta a emergências.',
  },
  {
    title: 'Sobrevivência no mar',
    image: sobrevivenciaMarImg,
    description: 'Preparação prática para situações de emergência marítima.',
  },
  {
    title: 'Segurança marítima',
    image: segurancaMaritimaImg,
    description: 'Reconhecimento de ameaças e aplicação de procedimentos de segurança.',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
  <div className="home-page">
    <section className="home-hero">
      <div className="home-hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">{t('Consultoria · Formação · Segurança')}</span>
          <h1 className="hero-title">{t('Preparar pessoas.')} <span>{t('Fortalecer empresas.')}</span></h1>
          <p className="hero-lead">
            {t('A ACMA desenvolve competências e soluções práticas para equipas e organizações que trabalham em ambientes exigentes.')}
          </p>
          <div className="hero-actions">
            <Button type="primary" size="large" onClick={() => navigate('/servicos')}>
              {t('Conheça os serviços')} <ArrowRightOutlined />
            </Button>
            <Button className="hero-secondary" size="large" onClick={() => navigate('/cursos')}>
              {t('Explorar cursos')}
            </Button>
          </div>
        </div>
        <div className="hero-visual">
          <img src={evento1} alt={t('Formação técnica e segurança marítima')} />
        </div>
      </div>
    </section>

    <section className="section-block">
      <div className="section-inner">
        <div className="section-heading">
          <div><p className="section-caption">{t('O que fazemos')}</p><h2>{t('Experiência para operações mais fortes')}</h2></div>
          <p>{t('Serviços orientados para as necessidades reais de cada organização e dos seus profissionais.')}</p>
        </div>
        <div className="feature-grid">
          {services.map((service) => (
            <article className="feature-card" key={service.title}>
              <img src={service.image} alt={t(service.title)} />
              <div className="feature-card-body">
                <h3>{t(service.title)}</h3>
                <p>{t(service.description)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="section-block section-block--white">
      <div className="section-inner">
        <div className="mission-panel">
          <div>
            <span className="mission-label">{t('O nosso compromisso')}</span>
            <h2>{t('Qualidade que se traduz em confiança.')}</h2>
          </div>
          <p>
            {t('Desde 2020, a ACMA apoia o desenvolvimento de pessoas e empresas com formação, consultoria e soluções ajustadas ao contexto moçambicano. Trabalhamos para que cada equipa esteja mais preparada, segura e confiante.')}
          </p>
        </div>
      </div>
    </section>

    <section className="section-block">
      <div className="section-inner">
        <div className="section-heading">
          <div><p className="section-caption">{t('Formação em destaque')}</p><h2>{t('Competências para ambientes exigentes')}</h2></div>
          <Link to="/cursos">{t('Ver todos os cursos')} <ArrowRightOutlined /></Link>
        </div>
        <div className="feature-grid">
          {trainingModules.map((module) => (
            <article className="training-card" key={module.title}>
              <img src={module.image} alt={t(module.title)} />
              <div className="training-card-body"><h3>{t(module.title)}</h3><p>{t(module.description)}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="section-block section-block--white">
      <div className="section-inner">
        <div className="section-heading">
          <div><p className="section-caption">{t('Da nossa experiência')}</p><h2>{t('Formação BST & DSD')}</h2></div>
          <Link to="/eventos">{t('Conhecer eventos')} <ArrowRightOutlined /></Link>
        </div>
        <article className="event-highlight">
          <img src={evento1} alt={t('Sessão de formação marítima BST e DSD')} />
          <div className="event-highlight-copy">
            <span className="eyebrow">MARPERITA &amp; ACMA</span>
            <h3>{t('Preparação prática para operações marítimas seguras')}</h3>
            <p>
              {t('Uma iniciativa de formação em Basic Safety Training e Designated Security Duties, com conteúdos teóricos e exercícios práticos para profissionais do setor marítimo.')}
            </p>
            <Button type="primary" onClick={() => navigate('/eventos')}>
              {t('Ver detalhes')} <ArrowRightOutlined />
            </Button>
          </div>
        </article>
      </div>
    </section>

    <section className="section-block section-block--tint">
      <div className="section-inner section-cta-row">
        <div><p className="section-caption">{t('Vamos conversar')}</p><h2>{t('Encontre a solução certa para a sua equipa.')}</h2></div>
        <div className="hero-actions">
          <Button type="primary" size="large" onClick={() => navigate('/contactos')}>{t('Fale connosco')}</Button>
          <Button size="large" onClick={() => navigate('/inscricao')}>{t('Inscrever-se')}</Button>
        </div>
      </div>
    </section>
  </div>
  );
};

export default Home;
