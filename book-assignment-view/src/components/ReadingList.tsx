import React, { useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useBookContext } from "../contexts/BookContext";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ReadingListModal from "./ReadingListModal";
import ReadingListContent from "./ReadingListContent";
import "./Card.css";

const ReadingList: React.FC = () => {
  const { readingList } = useBookContext();
  const [open, setOpen] = useState(false);
  const [readingPage, setReadingPage] = useState<number>(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const readingItemsPerPage = isTablet ? 4 : 6;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleReadingPageChange = (newPage: number) => {
    setReadingPage(newPage);
  };

  const paginatedReadingList = readingList.slice(
    (readingPage - 1) * readingItemsPerPage,
    readingPage * readingItemsPerPage
  );

  const totalReadingPages = Math.ceil(readingList.length / readingItemsPerPage);

  return (
    <Box>
      {isMobile && (
        <Fab
          color="primary"
          aria-label="Reading List"
          onClick={handleOpen}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
          }}
        >
          <BookmarkIcon style={{ color: "#fff" }} />
        </Fab>
      )}
      <ReadingListModal
        open={open}
        handleClose={handleClose}
        readingList={readingList}
        paginatedReadingList={paginatedReadingList}
        totalReadingPages={totalReadingPages}
        readingPage={readingPage}
        handleReadingPageChange={handleReadingPageChange}
        isMobile={isMobile}
      />
      {!isMobile && (
        <ReadingListContent
          readingList={readingList}
          paginatedReadingList={paginatedReadingList}
          totalReadingPages={totalReadingPages}
          readingPage={readingPage}
          handleReadingPageChange={handleReadingPageChange}
        />
      )}
    </Box>
  );
};

export default ReadingList;
