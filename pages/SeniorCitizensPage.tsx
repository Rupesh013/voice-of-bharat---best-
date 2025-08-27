
import React from 'react';
import GenericPage from './GenericPage';
import { ICONS } from '../constants';

const SeniorCitizensPage: React.FC = () => {
  return (
    <GenericPage
      title="Senior Citizens"
      description="Easy access to pension schemes, healthcare, and support services."
      Icon={ICONS.Senior}
    />
  );
};

export default SeniorCitizensPage;
