import ReactPaginate from 'react-paginate';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Pagination extends Component {

  handlePageClick = (data) => {
    console.log(data)
  };

  render() {
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