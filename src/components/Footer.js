import { Gamepad2, Github, Instagram } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <footer className="pt-8 pb-6 mt-[9rem] bottom-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4 flex flex-col items-center justify-center">
            <h4 className="text-3xl fonat-semibold text-blue-700 baloo-font">
              JustinSight
            </h4>
            <p className="text-sm mt-0 mb-2 text-slate-400 text-center">
              Movies that I enjoyed watching, songs that I enjoyed, and things
              that I thought I bought well this year
            </p>
            <div className="mt-6 lg:mb-0 mb-6">
              <Button className="text-4xl h-15 w-15 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">
                <Link
                  href="https://www.instagram.com/justintime_0627"
                  target="_blank"
                >
                  <Instagram className="text-4xl text-white" />
                </Link>
              </Button>
              <Button className="text-4xl h-15 w-15 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">
                <Link href="https://github.com/jcmaker" target="_blank">
                  <Github className="text-4xl text-white" />
                </Link>
              </Button>
              <Button className="text-4xl h-15 w-15 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">
                <Link href="https://discord.gg/eAvyf9qE" target="_blank">
                  <Gamepad2 className="text-4xl text-white" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                  Site referenced
                </span>
                <div className="flex flex-col">
                  <Image src="/imdb.png" alt="imdb" width={100} height={20} />
                  <Image
                    src="/youtube.png"
                    alt="yt"
                    width={150}
                    height={20}
                    className="mt-4 mb-4"
                  />
                  <Image src="/coupang.png" alt="yt" width={150} height={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-slate-500 font-semibold py-1">
              Copyright © 2024 JustinSight by Justin
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
