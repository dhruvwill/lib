const { db } = require("../models/db.js");
const { render } = require("ejs");

const AllBooks = (req, res) => {
  console.log(db);
  db.query(
    `SELECT b.BookID,b.Title AS Bookname, a.AuthorName, p.PublisherName,
    b.NumCopies - COUNT(br.BookID) AS AvailableCount,
    b.NumCopies AS TotalCount,
    CASE WHEN EXISTS (SELECT * FROM borrowed WHERE BookID = b.BookID AND UserID = ?) THEN 1 ELSE 0 END AS Borrowed
    FROM books b
    INNER JOIN authors a ON b.AuthorID = a.AuthorID
    INNER JOIN publishers p ON b.PublisherID = p.PublisherID
    LEFT JOIN borrowed br ON b.BookID = br.BookID
    GROUP BY b.BookID
    ORDER BY b.Title ASC;
    `,
    [req.user.UID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.render("allbooks", { user: req.user, books: result });
      }
    }
  );
};

const BorrowBook = (req, res) => {
  const { bookid } = req.body;

  const TodayDate = new Date().toISOString().slice(0, 10);
  console.log(TodayDate);

  db.query(
    `INSERT INTO borrowed (BookID, UserID) VALUES (?, ?);
    `,
    [bookid, req.user.UID, bookid, req.user.UID, TodayDate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.status(200).redirect("/books");
      }
    }
  );
  db.query(
    `INSERT INTO borrow_history (BookID, UserID, BorrowDate, ReturnDate) VALUES (?, ?, ?, NULL)`,
    [bookid, req.user.UID, TodayDate],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
};

const ReturnBook = (req, res) => {
  const { bookid } = req.body;
  db.query(
    `DELETE FROM borrowed WHERE BookID = ? AND UserID = ?`,
    [bookid, req.user.UID],
    (err, result) => {
      if (err) {
        res.status(403);
        console.log(err);
      } else {
        console.log(result);
        res.status(200).redirect("/books");
      }
    }
  );
};


const BorrowedBooks = (req, res) => {
  db.query(
    `SELECT b.BookID, b.Title AS Bookname, a.AuthorName, p.PublisherName
    FROM books b
    INNER JOIN authors a ON b.AuthorID = a.AuthorID
    INNER JOIN publishers p ON b.PublisherID = p.PublisherID
    INNER JOIN borrowed br ON b.BookID = br.BookID
    WHERE br.UserID = ?;    
    `,
    [req.user.UID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.render("borrowedbooks", { user: req.user, books: result });
      }
    }
  );
};



module.exports = {
  AllBooks,
  BorrowBook,
  ReturnBook,
  BorrowedBooks,
};
