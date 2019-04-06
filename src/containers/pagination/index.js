import ReactPaginate from 'react-paginate';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react";

@inject('MainStore')
@observer
class Pagination extends Component {
  static propTypes = {
    MainStore: PropTypes.shape({
      getShowItemsCount: PropTypes.number.isRequired,
      getSearchByValue: PropTypes.object.isRequired,
      getSearchError: PropTypes.string.isRequired,
      getPage: PropTypes.number.isRequired,
      setPage: PropTypes.func.isRequired
    }),
    pokemonCounts: PropTypes.number.isRequired,
  };

  handlePageClick = (data) => {
    const {MainStore: {setPage}} = this.props;
    const page = data.selected + 1;
    setPage(page);
  };

  render() {
    const {
      MainStore: {
        getShowItemsCount,
        getSearchError,
        getSearchByValue,
        getPage
      },
      pokemonCounts
    } = this.props;

    if (getSearchError || getSearchByValue['isSearchByName']) {
      return null;
    }

    return (
      <div className='paginate'>
        <ReactPaginate
          forcePage={getPage - 1}
          previousLabel={'Prev'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(pokemonCounts / getShowItemsCount)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

export default Pagination;