import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <IconButton onClick={handlePrevPage} disabled={currentPage === 1}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <Box mx={2}>
        Page {currentPage} of {totalPages}
      </Box>
      <IconButton
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default CustomPagination;
