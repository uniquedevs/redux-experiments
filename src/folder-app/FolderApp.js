import React from 'react';
import { connect } from 'react-redux';

import Grid from 'react-bootstrap/src/Grid';
import Row from 'react-bootstrap/src/Row';
import Col from 'react-bootstrap/src/Col';

const splitImages = images =>

const renderImage = (image, idx) => (
  idx % 4 === 0 && (
      </Row>
      <Row className="show-grid">
    ) || (
      <Col md={3}>
        <img src={image.link} alt={image.name}/>
      </Col>
    )
);

const FolderApp = ({ images }) => (
  images ?
    (<Grid>
      <Row className="show-grid">
        { images.forEach(renderImage) }
      </Row>
    </Grid>) :
    <div>No Images</div>
);

const stateToProps = state => ({
  images: state.images
});

export default connect(stateToProps)(FolderApp);