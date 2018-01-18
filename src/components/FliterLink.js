import {connect} from "react-redux";
import React from 'react';

import Link from './Link';
import { mapStateToLinkProps, mapDispatchToLinkProps } from '../reducers/visibilityFilter';

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

export default FilterLink;