import MainTextInput from "@/components/input/MainTextInput";
import HomeSlideMenu from "@/components/menu/HomeSlideMenu";
import AbyssCanvas from "@/components/screen/AbyssCanvas";
import HomeNavBar from "@/components/navbar/HomeNavBar";
import HomeSlideMenuData from "@/components/section/HomeSlideMenuData";

export default function Home() {
  return (
    <AbyssCanvas>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-black to-gray-900 text-white">

        {/* Navbar */}
        <div className="relative z-10">
          <HomeNavBar heading="No doubt" >
            <HomeSlideMenuData />
          </HomeNavBar>
        </div>

        {/* Main Section */}
        <div className="flex  justify-center  px-4 pt-23.5">
          <div className="  w-full max-w-md backdrop-blur-md rounded-2xl shadow-xl p-6">
            <MainTextInput />
          </div>
        </div>
      </div>
    </AbyssCanvas>

  );
}
