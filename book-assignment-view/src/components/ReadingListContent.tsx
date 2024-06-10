import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CustomPagination from "./CustomPagination";
import EmptyListSvg from "./EmptyListSvg";
import BookCard from "./BookCard";

interface ReadingListContentProps {
  readingList: any[];
  paginatedReadingList: any[];
  totalReadingPages: number;
  readingPage: number;
  handleReadingPageChange: (newPage: number) => void;
}

const ReadingListContent: React.FC<ReadingListContentProps> = ({
  readingList,
  paginatedReadingList,
  totalReadingPages,
  readingPage,
  handleReadingPageChange,
}) => (
  <Box>
    {readingList.length === 0 ? (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={4}
      >
        <EmptyListSvg />
        <Typography
          textAlign="center"
          fontSize="13px"
          padding="10px"
          fontWeight="500"
          color="secondary"
          mt={2}
        >
          Your List is Empty
        </Typography>
      </Box>
    ) : (
      <Grid container spacing={3}>
        {paginatedReadingList.map((book, index) => (
          <BookCard book={book} key={index} />
        ))}
      </Grid>
    )}
    {totalReadingPages > 1 && (
      <Box
        position="fixed"
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        pt={5}
      >
        <CustomPagination
          currentPage={readingPage}
          totalPages={totalReadingPages}
          handlePageChange={handleReadingPageChange}
        />
      </Box>
    )}
  </Box>
);

export default ReadingListContent;
