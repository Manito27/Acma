import React, { useState } from 'react';
import { List, Avatar, Button } from 'antd';
import {
  SafetyCertificateOutlined,
  GlobalOutlined,
  MedicineBoxOutlined,
  ToolOutlined,
  CloudOutlined,
  TeamOutlined,
  CarOutlined,
  RocketOutlined
} from '@ant-design/icons';

const Cursos = () => {
  const [selectedCurso, setSelectedCurso] = useState(null);

  const cursosPrincipais = [
    {
      title: 'HSE/ ISO 14001, ISO/IEC 9712',
      description: 'SISTEMA DE GESTÃO AMBIENTAL',
      details: 'Este curso aborda os fundamentos do Sistema de Gestão Ambiental com base nas normas ISO 14001 e ISO/IEC 9712. Os participantes aprendem a implementar práticas sustentáveis, gerenciar impactos ambientais e realizar auditorias para conformidade, promovendo a responsabilidade ambiental nas operações empresariais.',
      icon: <SafetyCertificateOutlined />,
      color: '#52c41a'
    },
    {
      title: 'OSHA /ISO 18001, ISO 22000',
      description: 'ISO/IEC 9001:2015, ISO 45001 a ISO 50001, outros',
      details: 'Focado em normas internacionais como OSHA, ISO 18001, ISO 22000, ISO 9001:2015, ISO 45001 e ISO 50001, este curso capacita profissionais para implementar sistemas de gestão de qualidade, segurança e energia. Inclui treinamento em auditorias, conformidade e melhoria contínua de processos.',
      icon: <GlobalOutlined />,
      color: '#1890ff'
    },
    {
      title: 'LEGISLAÇÃO DE PETRÓLEO e GÁS',
      description: 'Curso especializado em legislação do setor',
      details: 'Este curso especializado explora a legislação aplicável ao setor de petróleo e gás, abordando regulamentações nacionais e internacionais. Os participantes aprendem sobre conformidade legal, contratos, licenças e gestão de riscos regulatórios, essenciais para operações no setor energético.',
      icon: <CloudOutlined />,
      color: '#722ed1'
    },
    {
      title: 'BST, OIL AND GAS INDUSTRIAL',
      description: 'RIGGING SLINGING & BANKSMAN',
      details: 'Focado em operações industriais de petróleo e gás, este curso cobre técnicas de rigging, slinging e banksman. Os participantes aprendem práticas seguras de movimentação de cargas, sinalização e coordenação em ambientes industriais, garantindo segurança e eficiência.',
      icon: <ToolOutlined />,
      color: '#fa8c16'
    }
  ];

  const outrosCursos = [
    {
      title: 'PRIMEIRO SOCORRO GDMSS',
      description: 'GESTÃO PORTUÁRIA',
      details: 'Este curso combina treinamento em primeiros socorros com gestão portuária, preparando profissionais para lidar com emergências médicas em ambientes marítimos e portuários. Inclui técnicas de resposta rápida e gestão de crises, alinhadas às normas GDMSS.',
      icon: <MedicineBoxOutlined />,
      color: '#f5222d'
    },
    {
      title: 'LOGÍSTICA MEAL',
      description: 'SEGURANÇA MARÍTIMA',
      details: 'Focado em logística e segurança marítima, este curso ensina a planejar operações logísticas em ambientes marítimos, com ênfase em segurança, conformidade com normas internacionais e gestão eficiente de recursos. Ideal para profissionais do setor portuário.',
      icon: <RocketOutlined />,
      color: '#13c2c2'
    },
    {
      title: 'IOSH, BIG LIFTING WASH',
      description: 'LIFTING OPERATOR',
      details: 'Este curso capacita operadores de içamento (lifting) com base nas diretrizes IOSH e práticas de segurança WASH. Os participantes aprendem técnicas avançadas de operação de equipamentos de elevação, segurança no trabalho e manutenção preventiva.',
      icon: <TeamOutlined />,
      color: '#faad14'
    },
    {
      title: 'SEGURANÇA EM ALTURA',
      description: 'GENERAL MANAGING INDUSTRY',
      details: 'Voltado para segurança em trabalhos em altura, este curso ensina técnicas de prevenção de quedas, uso de equipamentos de proteção individual (EPI) e gestão de riscos em ambientes industriais. Essencial para líderes e operadores em indústrias de alto risco.',
      icon: <SafetyCertificateOutlined />,
      color: '#52c41a'
    }
  ];

  const handleCursoClick = (curso) => {
    setSelectedCurso(curso);
  };

  const handleBackClick = () => {
    setSelectedCurso(null);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {selectedCurso ? (
        <div>
          <h2 style={{ 
            color: '#1890ff', 
            marginTop: '20px',
            borderBottom: '1px solid #e8e8e8',
            paddingBottom: '10px',
            fontSize: '22px'
          }}>
            {selectedCurso.title}
          </h2>
          <div style={{
            padding: '16px',
            margin: '8px 0',
            borderRadius: '4px',
            border: '1px solid #f0f0f0',
            backgroundColor: '#fff'
          }}>
            <p style={{ fontSize: '15px', color: '#666', marginBottom: '16px' }}>
              {selectedCurso.details}
            </p>
            <Button
              type="primary"
              onClick={handleBackClick}
              style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
            >
              Voltar aos Cursos
            </Button>
          </div>
        </div>
      ) : (
        <>
          <h2 style={{ 
            color: '#1890ff', 
            marginTop: '20px',
            borderBottom: '1px solid #e8e8e8',
            paddingBottom: '10px',
            fontSize: '22px'
          }}>
            Cursos Principais
          </h2>

          <List
            itemLayout="horizontal"
            dataSource={cursosPrincipais}
            renderItem={(item) => (
              <List.Item 
                onClick={() => handleCursoClick(item)}
                style={{
                  cursor: 'pointer',
                  padding: '16px',
                  margin: '8px 0',
                  borderRadius: '4px',
                  transition: 'all 0.3s',
                  border: '1px solid #f0f0f0',
                  ':hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)',
                    borderColor: '#1890ff'
                  }
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar 
                      icon={item.icon} 
                      style={{ 
                        backgroundColor: item.color,
                        fontSize: '20px'
                      }} 
                      size="large"
                    />
                  }
                  title={<span style={{ fontSize: '18px', fontWeight: '500' }}>{item.title}</span>}
                  description={<span style={{ fontSize: '15px' }}>{item.description}</span>}
                />
              </List.Item>
            )}
          />

          <h2 style={{ 
            color: '#1890ff', 
            marginTop: '30px',
            borderBottom: '1px solid #e8e8e8',
            paddingBottom: '10px',
            fontSize: '22px'
          }}>
            Mais Cursos Disponíveis
          </h2>

          <List
            itemLayout="horizontal"
            dataSource={outrosCursos}
            renderItem={(item) => (
              <List.Item 
                onClick={() => handleCursoClick(item)}
                style={{
                  cursor: 'pointer',
                  padding: '16px',
                  margin: '8px 0',
                  borderRadius: '4px',
                  transition: 'all 0.3s',
                  border: '1px solid #f0f0f0',
                  ':hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)',
                    borderColor: '#1890ff'
                  }
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar 
                      icon={item.icon} 
                      style={{ 
                        backgroundColor: item.color,
                        fontSize: '20px'
                      }} 
                      size="large"
                    />
                  }
                  title={<span style={{ fontSize: '18px', fontWeight: '500' }}>{item.title}</span>}
                  description={<span style={{ fontSize: '15px' }}>{item.description}</span>}
                />
              </List.Item>
            )}
          />

          <div style={{ 
            textAlign: 'center', 
            marginTop: '40px',
            color: '#666',
            fontSize: '14px',
            borderTop: '1px solid #f0f0f0',
            paddingTop: '20px'
          }}>
            PRODUZIDO PELO GRUPO DA ACMA, LDA {new Date().getFullYear()}
          </div>
        </>
      )}
    </div>
  );
};

export default Cursos;