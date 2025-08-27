import React from 'react';
import { Form, Input, Button, Radio } from 'antd';

const MyForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
    // Aqui você pode adicionar lógica para enviar os dados, como uma chamada API
  };

  return (
    <Form
      form={form}
      name="registration_form"
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Por favor, insira o email!', type: 'email' }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="type"
        label="Tipo: Empresa ou Individual"
        rules={[{ required: true, message: 'Por favor, selecione o tipo!' }]}
      >
        <Radio.Group>
          <Radio value="company">Empresa</Radio>
          <Radio value="individual">Individual</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
      >
        {({ getFieldValue }) =>
          getFieldValue('type') === 'company' ? (
            <Form.Item
              name="companyName"
              label="Nome da Empresa"
              rules={[{ required: true, message: 'Por favor, insira o nome da empresa!' }]}
            >
              <Input placeholder="Nome da Empresa" />
            </Form.Item>
          ) : null
        }
      </Form.Item>

      <Form.Item
        name="firstName"
        label="Primeiro Nome"
        rules={[{ required: true, message: 'Por favor, insira o primeiro nome!' }]}
      >
        <Input placeholder="Primeiro Nome" />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Último Nome"
        rules={[{ required: true, message: 'Por favor, insira o último nome!' }]}
      >
        <Input placeholder="Último Nome" />
      </Form.Item>

      <Form.Item
        name="contact"
        label="Contacto"
        rules={[{ required: true, message: 'Por favor, insira o contacto!' }]}
      >
        <Input placeholder="Contacto (ex: número de telefone)" />
      </Form.Item>

      <Form.Item
        name="nuit"
        label="NUIT"
        rules={[{ required: true, message: 'Por favor, insira o NUIT!' }]}
      >
        <Input placeholder="NUIT" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submeter
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MyForm;