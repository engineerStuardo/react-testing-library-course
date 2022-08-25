import { Form, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

export default function ToppingOption({ name, imagePath, updateItemCount }) {
  const handleChange = e => {
    updateItemCount(name, e.target.checked ? 1 : 0);
  };

  return (
    <Col xm={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type='checkbox' onChange={handleChange} label={name} />
      </Form.Group>
    </Col>
  );
}
