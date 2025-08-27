
import React from 'react';
import GenericPage from './GenericPage';
import { ICONS } from '../constants';

const WorkersPage: React.FC = () => {
  return (
    <GenericPage
      title="Workers & Laborers"
      description="Find jobs, access social security schemes, and know your rights."
      Icon={ICONS.Worker}
    />
  );
};

export default WorkersPage;
