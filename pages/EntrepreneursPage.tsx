
import React from 'react';
import GenericPage from './GenericPage';
import { ICONS } from '../constants';

const EntrepreneursPage: React.FC = () => {
  return (
    <GenericPage
      title="Entrepreneurs & Business"
      description="Tools and resources to start, run, and grow your business."
      Icon={ICONS.Entrepreneur}
    />
  );
};

export default EntrepreneursPage;
