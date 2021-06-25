import "bootstrap";
import "./styles/main.scss";
import Home from "./scripts/Home";

window.onload = () => {
  const myHome = new Home();
  myHome.addEventListenerOnElements();
};
