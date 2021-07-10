import "bootstrap";
import "./styles/main.scss";
import Home from "./scripts/Home";

window.onload = () => {
  document.addEventListener("DOMContentLoaded", stopSpinner);

  const myHome = new Home();
  myHome.addEventListenerOnElements();
};

function stopSpinner() {
  document.querySelector(body).classList.add("fully-load");
}
