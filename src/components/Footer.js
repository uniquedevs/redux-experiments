import React from 'react';

import FilterLink from './FliterLink';

const Footer = () => (
  <div>
    <FilterLink filter='ALL'>Show all</FilterLink>
    <FilterLink filter='ACTIVE'>Show only active</FilterLink>
  </div>
);

export default Footer;