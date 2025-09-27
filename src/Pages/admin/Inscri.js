import React, { useState } from "react";
import { Table, Tag, Button, Space, Popconfirm, message } from "antd";

const Inscri = () => {
  // Dados fictícios de exemplo
  const [inscricoes, setInscricoes] = useState([
    {
      key: "1",
      nome: "João Manuel",
      curso: "Engenharia Informática",
      data: "2025-09-10",
      status: "Pendente",
    },
    {
      key: "2",
      nome: "Maria Silva",
      curso: "Gestão de Empresas",
      data: "2025-09-11",
      status: "Pendente",
    },
    {
      key: "3",
      nome: "Carlos Alberto",
      curso: "Direito",
      data: "2025-09-12",
      status: "Validada",
    },
  ]);

  // Função para atualizar status
  const atualizarStatus = (key, novoStatus) => {
    setInscricoes((prev) =>
      prev.map((insc) =>
        insc.key === key ? { ...insc, status: novoStatus } : insc
      )
    );
    message.success(`Inscrição ${novoStatus.toLowerCase()} com sucesso!`);
  };

  const colunas = [
    {
      title: "Nome do Estudante",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Curso",
      dataIndex: "curso",
      key: "curso",
    },
    {
      title: "Data de Inscrição",
      dataIndex: "data",
      key: "data",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let cor = "geekblue";
        if (status === "Validada") cor = "green";
        if (status === "Rejeitada") cor = "volcano";
        return <Tag color={cor}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Tem certeza que deseja validar esta inscrição?"
            onConfirm={() => atualizarStatus(record.key, "Validada")}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="primary" size="small">
              Validar
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Tem certeza que deseja rejeitar esta inscrição?"
            onConfirm={() => atualizarStatus(record.key, "Rejeitada")}
            okText="Sim"
            cancelText="Não"
          >
            <Button danger size="small">
              Rejeitar
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: "#0D47A1" }}>
        Lista de Inscrições
      </h2>
      <Table
        columns={colunas}
        dataSource={inscricoes}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default Inscri;
