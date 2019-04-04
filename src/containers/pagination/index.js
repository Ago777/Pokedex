import ReactPaginate from 'react-paginate';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react";

@inject('MainStore')
@observer
class Pagination extends Component {

  handlePageClick = (data) => {
    console.log(data)
  };

  render() {
    const {MainStore: {getSearchError}} = this.props;
    if (getSearchError) {
      return null;
    }

    return (
      <div className='paginate'>
        <ReactPaginate
          previousLabel={'Prev'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={20}
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

Pagination.propTypes = {};

export default Pagination;