import React, { useEffect, useState } from "react";
/* eslint-disable */
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const InvoicePagination = ({
  totalPosts,
  invoicesPerPage,
  pageChange,
  currentPage,
  pageChangeArrows,
}) => {
  let [pages, setPages] = useState([]);

  useEffect(() => {
    console.log(Math.ceil(totalPosts / invoicesPerPage));
    if (Math.ceil(totalPosts / invoicesPerPage) <= 1) {
      setPages([currentPage]);
    } else if (
      Math.ceil(totalPosts / invoicesPerPage) > 1 &&
      Math.ceil(totalPosts / invoicesPerPage) <= 2
    ) {
      if (currentPage === 2) {
        setPages([currentPage - 1, currentPage]);
      } else setPages([currentPage, currentPage + 1]);
    } else {
      if (currentPage === 1) {
        setPages([currentPage, currentPage + 1, currentPage + 2]);
      } else if (currentPage === Math.ceil(totalPosts / invoicesPerPage))
        setPages([currentPage - 2, currentPage - 1, currentPage]);
      else setPages([currentPage - 1, currentPage, currentPage + 1]);
    }
  }, [currentPage, invoicesPerPage]);
  return (
    <nav aria-label="...">
      <Pagination
        className="pagination justify-content-end mb-0"
        listClassName="justify-content-end mb-0"
      >
        <PaginationItem className={currentPage === 1 ? "disabled" : ""}>
          <PaginationLink onClick={(e) => pageChangeArrows("prev")}>
            <i className="fas fa-angle-left" />
            <span className="sr-only">Previous</span>
          </PaginationLink>
        </PaginationItem>
        {pages.map((number, index) => {
          return (
            <PaginationItem
              key={index}
              className={currentPage === number ? "active" : ""}
            >
              <PaginationLink
                onClick={() => {
                  pageChange(number);
                }}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem
          className={currentPage === pages[pages.length - 1] ? "disabled" : ""}
        >
          <PaginationLink onClick={(e) => pageChangeArrows("next")}>
            <i className="fas fa-angle-right" />
            <span className="sr-only">Next</span>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </nav>
  );
};

export default InvoicePagination;
