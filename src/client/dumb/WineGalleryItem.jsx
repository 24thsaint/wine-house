import React from 'react';
import { Typography, Paper } from '@material-ui/core';

class WineGalleryItem extends React.Component {
  render() {
    const wine = this.props.wine;

    return (
      <div>
        <Paper style={{margin: 10, padding: 20}}>
          <Typography variant="subheading">Wine ID: {wine.key}</Typography>
          <Typography>Back Label: {wine.backLabel}</Typography>
          <Typography>Front Label: {wine.frontLabel}</Typography>
          <Typography>Bottle: {wine.bottle}</Typography>
          <Typography>Capsule: {wine.capsule}</Typography>
          <Typography>Cork: {wine.cork}</Typography>
          <Typography>Glass: {wine.glass}</Typography>
        </Paper>
      </div>
    );
  }
}

export default WineGalleryItem;