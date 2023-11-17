import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="mx-auto text-center">
        <div>
          <a
            target="_blank"
            href="https://www.sslcommerz.com/"
            title="SSLCommerz"
            alt="SSLCommerz"
            className="flex justify-center"
          >
            <img
              className="w-[2000px] my-5 hidden lg:block"
              src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-03.png"
            />
          </a>
          <a
            target="_blank"
            href="https://www.sslcommerz.com/"
            title="SSLCommerz"
            alt="SSLCommerz"
            className="flex justify-center"
          >
            <img
              className="w-[2000px] my-5 hidden md:block lg:hidden"
              src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-01.png"
            />
          </a>
          <a
            target="_blank"
            href="https://www.sslcommerz.com/"
            title="SSLCommerz"
            alt="SSLCommerz"
            className="flex justify-center"
          >
            <img
              className="w-[500px] my-5 md:hidden lg:hidden"
              src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-05.png"
            />
          </a>
        </div>
        <div>
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-lg font-bold italic">
              PHP <span className="text-xs">Hospital</span>
            </span>
          </p>
          <p>We are here to serve you with our best</p>
        </div>
      </div>
    </footer>
  );
};
