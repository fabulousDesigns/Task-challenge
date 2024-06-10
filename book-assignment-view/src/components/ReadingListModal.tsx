import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CustomPagination from "./CustomPagination";
import EmptyListSvg from "./EmptyListSvg";
import BookCard from "./BookCard";

interface ReadingListModalProps {
  open: boolean;
  handleClose: () => void;
  readingList: any[];
  paginatedReadingList: any[];
  totalReadingPages: number;
  readingPage: number;
  handleReadingPageChange: (newPage: number) => void;
  isMobile: boolean;
}

const ReadingListModal: React.FC<ReadingListModalProps> = ({
  open,
  handleClose,
  readingList,
  paginatedReadingList,
  totalReadingPages,
  readingPage,
  handleReadingPageChange,
  isMobile,
}) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="reading-list-modal"
    aria-describedby="reading-list-modal-description"
  >
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        height: "75%",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
          pb: 1,
          mb: 2,
          width: "100%",
          backgroundColor: "#fff",
          height: "50px",
        }}
      >
        <Typography id="reading-list-modal" variant="h6" component="h2">
          Reading List
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
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
      {!isMobile && totalReadingPages > 1 && (
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
  </Modal>
);

export default ReadingListModal;
