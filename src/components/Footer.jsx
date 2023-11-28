import React from "react";
import ReactDOM from "react-dom";

function Footer() {
  return (
    <footer className="mt-8 h-40 bg-gray-100 relative w-full t-full z-0">
      <div className="pt-12 pl-12">
        <p className="ml-4">logo</p>
        <div className="text-center flex justify-around w-100 m-auto">
          <div>
            <a href="https://www.facebook.com/">이용약관</a>
          </div>
          <div>
            <a href="https://www.facebook.com/">개인정보처리방침</a>
          </div>
          <div>
            <a href="https://www.facebook.com/">투자 유의 안내</a>
          </div>
          <span>© KJ, Inc</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
