// eslint-disable-next-line
import React from "react";
import { Link } from "react-router-dom";

function Nav() {

  return (
    <div>
      <section className="p-3 background-color-purple" id="title">
        <Link to="/"><h1 className="text-5xl text-gray-50	">Super Scout</h1></Link>
        <div className="flex flex-row space-x-4">
          <Link
              className="text-2xl no-underline hover:underline color-yellow"
              to="/"
            >
            Create QR Code
          </Link>
          <Link
            className="text-2xl no-underline hover:underline color-yellow"
            to="/scanner"
          >
            Scan QR Code
          </Link>
        </div>
      </section>
    </div>
  );
}
//for commit

export default Nav;
