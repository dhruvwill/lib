const Home = async (req, res) => {
  try {
    const response = await fetch("https://api.hamatim.com/quote");
    const data = await response.json();
    res.render("index", {
      user: req.user,
      quote: data.text,
      author: data.author,
      book: data.book,
      authorUrl: data.author_img,
    });
  } catch (error) {
    console.error(error);
    res.render("index", {
      quote: "An error occurred while fetching the quote",
    });
  }
};
module.exports = {
  Home,
};
