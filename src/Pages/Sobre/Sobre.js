import React from 'react';
import { SafetyCertificateOutlined, LaptopOutlined, TeamOutlined, DeploymentUnitOutlined } from '@ant-design/icons';
import { useLanguage } from '../../i18n/LanguageContext';

const pillars = [
  {
    title: 'Segurança e prevenção',
    description: 'Apoio às organizações na identificação de riscos e na adoção de práticas de trabalho seguras.',
    icon: <SafetyCertificateOutlined />,
  },
  {
    title: 'Formação aplicada',
    description: 'Programas orientados para desenvolver competências técnicas úteis no contexto profissional.',
    icon: <TeamOutlined />,
  },
  {
    title: 'Soluções integradas',
    description: 'Consultoria em gestão, qualidade, logística e desenvolvimento organizacional.',
    icon: <DeploymentUnitOutlined />,
  },
  {
    title: 'Acesso digital',
    description: 'Serviços e informação disponíveis online para facilitar o contacto com a ACMA.',
    icon: <LaptopOutlined />,
  },
];

const Sobre = () => {
  const { t } = useLanguage();

  return <main>
    <section className="page-hero-compact">
      <div className="page-hero-inner">
        <header className="page-heading">
          <span className="eyebrow">{t('Quem somos')}</span>
          <h1 className="page-title">{t('Conhecimento que fortalece organizações')}</h1>
          <p className="page-lead">{t('A ACMA, Lda. é uma empresa moçambicana de consultoria e formação, comprometida com o desenvolvimento de pessoas e empresas.')}</p>
        </header>
      </div>
    </section>

    <section className="page-container">
      <div className="mission-panel">
        <div>
          <span className="mission-label">{t('A nossa missão')}</span>
          <h2>{t('Transformar desafios em capacidade de ação.')}</h2>
        </div>
        <p>
          {t('Desde 2020, apoiamos organizações com consultoria especializada, formação profissional e soluções práticas. Trabalhamos em áreas como segurança ocupacional, qualidade, telecomunicações, informática, recursos humanos e gestão operacional.')}
        </p>
      </div>

      <div className="section-heading" style={{ marginTop: 58 }}>
        <div><p className="section-caption">{t('Como trabalhamos')}</p><h2>{t('Profissionalismo em cada etapa')}</h2></div>
        <p>{t('O nosso trabalho combina conhecimento técnico, atenção ao contexto e colaboração próxima com cada cliente.')}</p>
      </div>
      <div className="about-pillars">
        {pillars.map((pillar) => (
          <article className="about-pillar" key={pillar.title}>
            <span className="catalog-icon">{pillar.icon}</span>
            <h3>{t(pillar.title)}</h3>
            <p>{t(pillar.description)}</p>
          </article>
        ))}
      </div>

      <section className="about-quote">
        <span className="eyebrow">{t('O nosso propósito')}</span>
        <p>{t('“Combinamos experiência técnica e formação para apoiar operações mais seguras, equipas mais preparadas e organizações mais fortes.”')}</p>
      </section>
    </section>
  </main>;
};

export default Sobre;
