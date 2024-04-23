function switchMode() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
switchMode();
function toggleMenu() {
  let svgs = document.querySelectorAll(".ham");
  let mobilemenu = document.getElementById("mobile-menu");
  svgs.forEach((svg) => {
    svg.classList.toggle("hidden");
    svg.classList.toggle("block");
  });
  mobilemenu.classList.toggle("hidden");
  mobilemenu.classList.add("sm:hidden");
}
function toggleTheme() {
  if (localStorage.theme === "dark") {
    localStorage.theme = "light";
  } else {
    localStorage.theme = "dark";
  }
  switchMode();
}

function showProfileMenu(bool) {
  document.getElementById("profile-menu").classList.toggle("hidden"); 
  if(!bool){
    document.getElementById("profile-menu").classList.add("hidden");
    console.log("hidden");
  }
}
document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.code === 'KeyK') {
    event.preventDefault();
    searchBooks.focus();
  }
});
