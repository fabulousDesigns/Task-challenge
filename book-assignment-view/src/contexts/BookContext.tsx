import React, { createContext, useContext, useState, ReactNode } from "react";

interface Book {
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
  isRead: boolean;
}

interface BookContextProps {
  readingList: Book[];
  addBookToReadingList: (book: Book) => void;
  removeBookFromReadingList: (title: string) => void;
  markBookAsRead: (title: string) => void;
}

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [readingList, setReadingList] = useState<Book[]>([]);

  const addBookToReadingList = (book: Book) => {
    setReadingList((prevList) => [...prevList, book]);
  };

  const removeBookFromReadingList = (title: string) => {
    setReadingList((prevList) =>
      prevList.filter((book) => book.title !== title)
    );
  };

  const markBookAsRead = (title: string) => {
    setReadingList((prevList) =>
      prevList.map((book) =>
        book.title === title ? { ...book, isRead: true } : book
      )
    );
  };

  return (
    <BookContext.Provider
      value={{
        readingList,
        addBookToReadingList,
        removeBookFromReadingList,
        markBookAsRead,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used within a BookProvider");
  }
  return context;
};
