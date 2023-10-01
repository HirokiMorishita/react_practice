import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Link
} from "react-router-dom";
import "./styles.css";

import TicTacToe from "./tic-tac-toe-game/App";
import ToDoList from "./todo-list/App";

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <div id="sidebar">
        <h1>React Router</h1>
        <nav>
          <ul>
            <li>
              <Link to={"/tic-tac-toe"}>react tutorial game</Link>
            </li>
            <li>
              <Link to={"/todo-list"}>todo list</Link>
            </li>
          </ul>
        </nav>
      </div>,
  },
  {
    path: "/tic-tac-toe",
    element: <TicTacToe />,
  },
  {
    path: "/todo-list",
    element: <ToDoList />,
  },
],
  {
    basename: "/react_practice/"
  });

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);