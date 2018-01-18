import { setVisibilityFilter } from '../actions';

const visibilityFilter = (state = 'ALL', action) => {
  switch(action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export default visibilityFilter;

export const mapStateToLinkProps = (store, ownProps ) => ({
  active: ownProps.filter === store.visibilityFilter,
  text: ownProps.children
});

export const mapDispatchToLinkProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  }
});