import React from "react";
import ReactDOM from "react-dom";
import { calendar } from 'antd';
const Hello = function(name) {
  return (
  <Calendar />
  );
};

const view = Hello("Deva");

const element = document.getElementById("app");
ReactDOM.render(view, element);
 