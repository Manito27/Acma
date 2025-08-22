import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Typography,
  message,
} from 'antd';
import { CarOutlined } from '@ant-design/icons';

// Importe as imagens dos carros
import EconomicCar from '../../assets/img/EconomicCar.jpeg';
import ConfortabelCar from '../../assets/img/ConfortabelCar.jpeg';
import CarLuxo from '../../assets/img/CarLuxo.jpg';

// Exemplo de dados para os carros disponíveis
const sampleCars = [
  {
    id: 1,
    name: 'Carro Econômico',
    description: 'Perfeito para a cidade, econômico e compacto.',
    image: EconomicCar,
    price: 'R$ 99/dia',
  },
  {
    id: 2,
    name: 'SUV Confortável',
    description: 'Espaçoso, confortável e com alta performance.',
    image: ConfortabelCar,
    price: 'R$ 149/dia',
  },
  {
    id: 3,
    name: 'Carro de Luxo',
    description: 'Elegância e conforto para viagens especiais.',
    image: CarLuxo,
    price: 'R$ 199/dia',
  },
];

const { Title, Text } = Typography;

const AvailableCars = ({ cars }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  // Função para abrir o modal
  const handleReserveClick = (car) => {
    setSelectedCar(car);
    setIsModalVisible(true);
  };

  // Fechar o modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Submeter o formulário
  const onFinish = (values) => {
    message.success(`Pedido de reserva enviado para ${selectedCar.name}!`);
    console.log('Form values:', values);
    setIsModalVisible(false); // Fecha o modal após envio
  };

  return (
    <div style={{ padding: '50px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
        Carros Disponíveis
      </Title>
      <Row gutter={[32, 32]}>
        {cars.map((car) => (
          <Col key={car.id} xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={
                <img
                  alt={car.name}
                  src={car.image}
                  style={{ height: '200px', objectFit: 'cover', borderRadius: '10px' }}
                />
              }
            >
              <Card.Meta title={car.name} description={car.description} />
              <div
                style={{
                  marginTop: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text strong>{car.price}</Text>
                <Button
                  type="primary"
                  icon={<CarOutlined />}
                  onClick={() => handleReserveClick(car)}
                  style={{ borderRadius: '5px' }}
                >
                  Reservar
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal de Reserva */}
      <Modal
        title={<Title level={3}>Reservar {selectedCar?.name}</Title>}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        style={{ top: 20 }}
      >
        <Form layout="vertical" onFinish={onFinish} style={{ padding: '20px' }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<Text strong>Nome Completo</Text>}
                name="name"
                rules={[
                  { required: true, message: 'Por favor, insira seu nome completo!' },
                ]}
              >
                <Input placeholder="Seu Nome Completo" bordered={false} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<Text strong>E-mail</Text>}
                name="email"
                rules={[
                  { required: true, message: 'Por favor, insira seu e-mail!' },
                  { type: 'email', message: 'Por favor, insira um e-mail válido!' },
                ]}
              >
                <Input placeholder="Seu E-mail" bordered={false} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<Text strong>Telefone</Text>}
                name="phone"
                rules={[
                  { required: true, message: 'Por favor, insira seu telefone!' },
                ]}
              >
                <Input placeholder="Seu Telefone" bordered={false} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<Text strong>Número de Passageiros</Text>}
                name="passengers"
                rules={[
                  { required: true, message: 'Por favor, selecione o número de passageiros!' },
                ]}
              >
                <Select placeholder="Número de Passageiros" bordered={false}>
                  <Select.Option value="1">1 Passageiro</Select.Option>
                  <Select.Option value="2">2 Passageiros</Select.Option>
                  <Select.Option value="3">3 Passageiros</Select.Option>
                  <Select.Option value="4">4+ Passageiros</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<Text strong>Data de Retirada</Text>}
                name="pickupDate"
                rules={[
                  { required: true, message: 'Por favor, selecione a data de retirada!' },
                ]}
              >
                <DatePicker placeholder="Data de Retirada" style={{ width: '100%' }} bordered={false} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<Text strong>Data de Devolução</Text>}
                name="returnDate"
                rules={[
                  { required: true, message: 'Por favor, selecione a data de devolução!' },
                ]}
              >
                <DatePicker placeholder="Data de Devolução" style={{ width: '100%' }} bordered={false} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<Text strong>Local de Retirada</Text>}
                name="pickupLocation"
                rules={[
                  { required: true, message: 'Por favor, selecione o local de retirada!' },
                ]}
              >
                <Select placeholder="Local de Retirada" bordered={false}>
                  <Select.Option value="airport">Aeroporto</Select.Option>
                  <Select.Option value="city-center">Centro da Cidade</Select.Option>
                  <Select.Option value="hotel">Hotel</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<Text strong>Local de Devolução</Text>}
                name="returnLocation"
                rules={[
                  { required: true, message: 'Por favor, selecione o local de devolução!' },
                ]}
              >
                <Select placeholder="Local de Devolução" bordered={false}>
                  <Select.Option value="airport">Aeroporto</Select.Option>
                  <Select.Option value="city-center">Centro da Cidade</Select.Option>
                  <Select.Option value="hotel">Hotel</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={<Text strong>Observações</Text>}
            name="notes"
          >
            <Input.TextArea placeholder="Insira observações ou requisitos adicionais" bordered={false} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                background: '#08c',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '5px',
                padding: '10px',
              }}
            >
              Enviar Reserva
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

AvailableCars.propTypes = {
  cars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Exporta o componente utilizando os dados de exemplo, se não estiver passando via props
export default function AvailableCarsWrapper() {
  return <AvailableCars cars={sampleCars} />;
}