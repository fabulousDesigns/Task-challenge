import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useBookContext } from "../contexts/BookContext";
import "../App.css";
import "./Card.css";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";

interface BookListProps {
  books: any[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const { addBookToReadingList, readingList } = useBookContext();
  const { enqueueSnackbar } = useSnackbar(); // Initialize enqueueSnackbar using the hook

  const handleAddBook = (book: any) => {
    enqueueSnackbar(`"${book.title}" added to Reading List!`, {
      variant: "success",
      autoHideDuration: 2000,
    });

    addBookToReadingList(book);
  };

  const isInReadingList = (title: string) => {
    return readingList.some((book) => book.title === title);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      sx={{
        overflowY: isMobile ? "scroll" : "hidden",
        maxHeight: isMobile ? "80vh" : "auto",
      }}
      container
      spacing={3}
    >
      {books
        .filter((book) => !isInReadingList(book.title))
        .map((book, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            mb={isMobile && index === books.length - 1 ? 4 : 0}
          >
            <Card className={`card neumorphism`}>
              <CardMedia
                component="img"
                height="120"
                image={book.coverPhotoURL}
                alt={book.title}
                className="card-media"
              />
              <CardContent className="cardContent">
                <Typography
                  variant="h6"
                  fontSize="14px"
                  textTransform="uppercase"
                  textAlign="justify"
                  fontWeight="bold"
                  color="secondary"
                >
                  📚 {book.title}
                </Typography>
                <Typography variant="subtitle2" color="secondary">
                  👤 Author - {book.author}
                </Typography>
                <Typography variant="subtitle2" color="secondary">
                  📖 Level - {book.readingLevel}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddBook(book)}
                >
                  <AddIcon
                    style={{
                      color: "white",
                    }}
                  />
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default BookList;
