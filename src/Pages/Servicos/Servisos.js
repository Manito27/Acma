// src/Pages/Registro/Registro.js
import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Table, Modal, Tabs } from 'antd';
import './Registro.css'; // Adicione o arquivo de CSS para estilização

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const Registro = () => {
  const [form] = Form.useForm();
  const [services, setServices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleFinish = (values) => {
    const newService = {
      ...values,
      key: services.length + 1,
    };
    setServices([...services, newService]);
    form.resetFields();
  };

  const showModal = (record) => {
    setSelectedService(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Concurso', value: 'Concurso' },
        { text: 'Aviso', value: 'Aviso' },
        { text: 'Serviço', value: 'Serviço' },
        { text: 'Aquisição', value: 'Aquisicão' },
      ],
      onFilter: (value, record) => record.type.includes(value),
    },
    {
      title: 'Agência',
      dataIndex: 'agency',
      key: 'agency',
    },
    {
      title: 'Abertura',
      dataIndex: 'openDate',
      key: 'openDate',
      sorter: (a, b) => new Date(a.openDate) - new Date(b.openDate),
    },
    {
      title: 'Encerramento',
      dataIndex: 'closeDate',
      key: 'closeDate',
      sorter: (a, b) => new Date(a.closeDate) - new Date(b.closeDate),
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (text, record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          Detalhes
        </Button>
      ),
    },
  ];

  return (
    <div className="registro-container">
      <h1>Registro de Serviços e Aquisições</h1>
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item name="title" label="Título" rules={[{ required: true, message: 'Por favor insira o título' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Tipo" rules={[{ required: true, message: 'Por favor selecione o tipo' }]}>
          <Select>
            <Option value="Concurso">Concurso</Option>
            <Option value="Aviso">Aviso</Option>
            <Option value="Serviço">Serviço</Option>
            <Option value="Aquisicão">Aquisição</Option>
          </Select>
        </Form.Item>
        <Form.Item name="agency" label="Agência" rules={[{ required: true, message: 'Por favor insira a agência' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="openDate" label="Data de Abertura" rules={[{ required: true, message: 'Por favor selecione a data de abertura' }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="closeDate" label="Data de Encerramento" rules={[{ required: true, message: 'Por favor selecione a data de encerramento' }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="description" label="Descrição" rules={[{ required: true, message: 'Por favor insira a descrição' }]}>
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Registrar
          </Button>
        </Form.Item>
      </Form>
      <Table
        dataSource={services}
        columns={columns}
        rowKey="key"
        pagination={{ pageSize: 5 }}
        style={{ marginTop: '20px' }}
      />
      <Modal
        title={selectedService?.title}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Geral" key="1">
            <p><strong>Tipo:</strong> {selectedService?.type}</p>
            <p><strong>Agência:</strong> {selectedService?.agency}</p>
            <p><strong>Data de Abertura:</strong> {selectedService?.openDate}</p>
            <p><strong>Data de Encerramento:</strong> {selectedService?.closeDate}</p>
          </TabPane>
          <TabPane tab="Descrição" key="2">
            <p>{selectedService?.description}</p>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

export default Registro;
/*
// src/Pages/Registro/Registro.css
.registro-container {
  padding: 20px;
}

.registro-container .ant-form-item {
  margin-bottom: 12px;
}

.registro-container .ant-btn {
  width: 100%;
}

.registro-container .ant-table {
  margin-top: 20px;
}
*/