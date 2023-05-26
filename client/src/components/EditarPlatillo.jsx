import React from "react";
import Aside from "./Aside";
import Main from "./Main";

export default function EditarPlatillos() {
  return (
    <div className="min-h-100 bg-gray-200">
      <div className="md:flex min-h-screen md:align-top">
        <Aside />
        <Main />
      </div>
    </div>
  );
}
