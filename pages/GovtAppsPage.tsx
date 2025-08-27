import React from 'react';
import GenericPage from './GenericPage';
import { ICONS } from '../constants';

const GovtAppsPage: React.FC = () => {
  return (
    <GenericPage
      title="Government Utility Apps"
      description="Learn how to use essential government apps like DigiLocker, UMANG, and more."
      Icon={ICONS.GovtApps}
    />
  );
};

export default GovtAppsPage;