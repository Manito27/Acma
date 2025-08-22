import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button, Tag } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

// Dados de exemplo para carros reservados
const sampleReservedCars = [
  {
    id: 1,
    name: 'Carro Econômico',
    description: 'Reservado para uso urbano com economia garantida.',
    image: 'https://via.placeholder.com/400x200?text=Carro+Econ%C3%B4mico',
    reservationDate: '2025-03-10',
    returnDate: '2025-03-15',
  },
  {
    id: 2,
    name: 'SUV Confortável',
    description: 'Ideal para viagens e final de semana prolongado.',
    image: 'https://via.placeholder.com/400x200?text=SUV+Confort%C3%A1vel',
    reservationDate: '2025-04-05',
    returnDate: '2025-04-09',
  },
  {
    id: 3,
    name: 'Carro de Luxo',
    description: 'Experiência premium com reserva confirmada.',
    image: 'https://via.placeholder.com/400x200?text=Carro+de+Luxo',
    reservationDate: '2025-05-20',
    returnDate: '2025-05-25',
  },
];

const ReservedCars = ({ cars }) => {
  return (
    <div style={{ padding: '50px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Carros Reservados</h2>
      <Row gutter={[32, 32]}>
        {cars.map((car) => (
          <Col key={car.id} xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={
                <img
                  alt={car.name}
                  src={car.image}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              }
            >
              <Card.Meta title={car.name} description={car.description} />
              <div style={{ marginTop: '16px' }}>
                <p>
                  <CalendarOutlined style={{ marginRight: '8px' }} />
                  <strong>Data de Reserva:</strong> {car.reservationDate}
                </p>
                <p>
                  <CalendarOutlined style={{ marginRight: '8px' }} />
                  <strong>Data de Devolução:</strong> {car.returnDate}
                </p>
                <Tag color="green">Reservado</Tag>
              </div>
              <Button
                type="primary"
                style={{ marginTop: '16px', width: '100%' }}
                disabled
              >
                Reservado
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

ReservedCars.propTypes = {
  cars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      reservationDate: PropTypes.string.isRequired,
      returnDate: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Componente wrapper para utilização com dados de exemplo.
// Você pode importar este componente e, se necessário, passar seus próprios dados.
export default function ReservedCarsWrapper() {
  return <ReservedCars cars={sampleReservedCars} />;
}
