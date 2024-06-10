import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import ReadingList from "./components/ReadingList";
import { BookProvider } from "./contexts/BookContext";
import CustomPagination from "./components/CustomPagination";
import { useMediaQuery, useTheme } from "@mui/material";

const GET_BOOKS = gql`
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

const App: React.FC = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [_searchTerm, setSearchTerm] = useState<string>("");
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const itemsPerPage = isTablet ? 4 : 6;

  useEffect(() => {
    if (data) {
      setFilteredBooks(data.books);
    }
  }, [data]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const results = data.books.filter((book: any) =>
      book.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBooks(results);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const paginatedBooks = filteredBooks.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <BookProvider>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <SearchBar onSearch={handleSearch} books={data.books} />
            <Box
              display="flex"
              flexDirection="column"
              minHeight="90%"
              alignItems="center"
              justifyContent="center"
            >
              <BookList books={paginatedBooks} />
              <Box
                position="fixed"
                bottom={0}
                display="flex"
                justifyContent="space-between"
                pt={5}
              >
                {totalPages > 1 && (
                  <CustomPagination
                    currentPage={page}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                  />
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            {!isMobile && (
              <Typography
                variant="h6"
                textAlign="center"
                textTransform="uppercase"
                fontSize="15px"
                padding="10px"
                letterSpacing="1px"
                fontWeight="500"
              >
                Reading List
              </Typography>
            )}
            <ReadingList />
          </Grid>
        </Grid>
      </Container>
    </BookProvider>
  );
};

export default App;
