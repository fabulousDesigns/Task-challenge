import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import { useBookContext } from "../contexts/BookContext";

interface BookCardProps {
  book: any;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { removeBookFromReadingList } = useBookContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleRemoveBook = (title: string) => {
    removeBookFromReadingList(title);
    enqueueSnackbar(`Book '${title}' has been removed from the reading list!`, {
      variant: "warning",
      autoHideDuration: 2000,
    });
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={`card neumorphism`}>
        <CardMedia
          component="img"
          height="140"
          image={book.coverPhotoURL}
          alt={book.title}
          className="card-media"
        />
        <CardContent>
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
          <IconButton onClick={() => handleRemoveBook(book.title)}>
            <DeleteIcon style={{ color: "#FA4343" }} />
          </IconButton>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BookCard;
