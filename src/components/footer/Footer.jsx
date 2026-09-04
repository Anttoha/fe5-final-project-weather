import React from "react";
import Container from "../ui/Container";
import Logo from "../ui/Logo";

const Footer = () => {
  return (
    <section className="relative bg-brand pt-7.5 pb-15 site-md:pt-8.75 site-xl:pt-10 site-xl:pb-16">
      <Container>
        <div className="grid grid-cols-[max-content_1fr] site-md:grid-cols-[repeat(3,max-content)] gap-x-18.75 site-md:gap-25 site-xl:gap-25.75 gap-y-6.25">
          <div className="w-18 site-md:w-19 site-xl:w-25">
            <Logo className="w-full" />
          </div>
          <div className="font-medium font-alternates space-y-3.75 site-xl:space-y-2.5">
            <h3 className="text-[16px] site-md:text-[18px]">Address</h3>
            <address className="text-[12px] site-md:text-[14px] not-italic">
              <a
                href="https://www.google.com/maps/place/%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82+%D0%A1%D0%B2%D0%BE%D0%B1%D0%BE%D0%B4%D0%B8,+35,+%D0%9A%D0%B8%D1%97%D0%B2,+%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0,+02000/@50.5147071,30.4191935,690m/data=!3m2!1e3!4b1!4m5!3m4!1s0x40d4cd605d372af1:0x169b7e7e319445e8!8m2!3d50.5147037!4d30.4217684?entry=ttu&g_ep=EgoyMDI2MDkwMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                className="hover:underline"
              >
                Svobody str. 35
                <br />
                Kyiv
                <br />
                Ukraine
              </a>
            </address>
          </div>
          <div className="font-alternates col-span-2 site-md:col-span-1 mx-auto space-y-4.25 site-md:space-y-3.75 site-xl:space-y-2.5">
            <h3 className="text-[16px] site-md:text-[18px] font-medium text-center site-md:text-start">
              Contact us
            </h3>
            <ul className="flex gap-5">
              <li className="group relative size-10 xl:size-12 isolate rounded-full bg-brand transition-all duration-250 before:absolute before:inset-0 before:-z-1 before:rounded-full before:bg-gradient-to-bl before:from-[#833ab4] before:via-[#fd1d1d] before:to-[#fcb045] before:transition-opacity before:duration-250 hover:before:opacity-0">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex size-full items-center justify-center rounded-full text-white transition-colors"
                >
                  <svg className="size-[60%] fill-white">
                    <defs>
                      <linearGradient
                        id="instagram-gradient"
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#fcb045" />
                        <stop offset="50%" stopColor="#fd1d1d" />
                        <stop offset="100%" stopColor="#833ab4" />
                      </linearGradient>
                    </defs>

                    <use
                      href="/symbol-defs.svg#icon-instagram"
                      className="group-hover:fill-[url(#instagram-gradient)]"
                    />
                  </svg>
                </a>
              </li>

              <li className="group size-10 site-xl:size-12 rounded-full bg-[#3a559f] hover:bg-brand transition-all duration-250">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex size-full items-center justify-center rounded-full"
                >
                  <svg className="size-[60%] fill-white transition-all group-hover:fill-[#3a559f]">
                    <use href="/symbol-defs.svg#icon-facebook" />
                  </svg>
                </a>
              </li>

              <li className="group size-10 site-xl:size-12 rounded-full bg-[#67d449] hover:bg-brand transition-all duration-250">
                <a
                  href="#"
                  aria-label="WhatsApp"
                  className="flex size-full items-center justify-center rounded-full"
                >
                  <svg className="size-[60%] fill-white transition-all group-hover:fill-[#67d449]">
                    <use href="/symbol-defs.svg#icon-whatsapp" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-[10px] text-center mt-5 absolute bottom-0 site-md:bottom-2 left-1/2 -translate-x-1/2">
          The site was made using a{" "}
          <a
            href="https://www.figma.com/design/kU9kMSMjS66gyzv1fQx0jM/Untitled--Copy-?node-id=11-110&t=khjmmjrXLrnNa2c8-0"
            target="_blank"
            className="underline hover:opacity-80"
          >
            Figma layout
          </a>{" "}
          from Front-End courses.
        </p>
      </Container>
    </section>
  );
};

export default Footer;
