import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useBookContext } from "../contexts/BookContext";
import AddIcon from "@mui/icons-material/Add";

interface SearchBarProps {
  onSearch: (term: string) => void;
  books: any[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, books }) => {
  const { addBookToReadingList } = useBookContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSearch = (term: string | null) => {
    if (term !== null) {
      setSearchTerm(term);
      onSearch(term);
    }
  };

  const handleAddToReadingList = (book: any) => {
    addBookToReadingList(book);
    setSnackbarMessage(`${book.title} has been added to your reading list`);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const renderSuggestion = (option: any) => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <Box display="flex" alignItems="center">
        <Box
          mr={2}
          width={60}
          height={90}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={option.coverPhotoURL}
            alt={option.title}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
        <Typography variant="body1">{option.title}</Typography>
      </Box>
      <IconButton
        aria-label="Add to Reading List"
        color="primary"
        onClick={() => handleAddToReadingList(option)}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );

  return (
    <Box mb={3}>
      <Autocomplete
        freeSolo
        options={books}
        getOptionLabel={(option) => option.title || ""}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Books"
            variant="outlined"
            fullWidth
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginTop: "15px" }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.title}>
            {renderSuggestion(option)}
          </li>
        )}
        value={searchTerm}
        onChange={(_event, newValue) => handleSearch(newValue)}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SearchBar;
