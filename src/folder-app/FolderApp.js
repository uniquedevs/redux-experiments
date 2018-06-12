import React from 'react';
import { connect } from 'react-redux';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';

const ROW_LENGTH = 4;

const splitImages = images =>
  images.reduce((all, one, idx) => {
    const row = Math.floor(idx / ROW_LENGTH);
    all[row] = [].concat((all[row] || []), one);
    return all;
    }, []
  );

const renderImage = (image, idx) => (
  <Col sm={12 / ROW_LENGTH} key={idx}>
    <Thumbnail href="#" alt={image.name} src={image.link} />
  </Col>
);

const renderRow = (row, idx) => (
  <Row className="show-grid" key={idx}>
    { row.map(renderImage) }
  </Row>
);

const FolderApp = ({ images }) => (
  images ?
    (<Grid>
      <Row className="show-grid">
        { splitImages(images).map(renderRow) }
      </Row>
    </Grid>) :
    <div>No Images</div>
);

const stateToProps = state => ({
  images: state.images
});

export default connect(stateToProps)(FolderApp);