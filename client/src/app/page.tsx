import MainTextInput from "@/components/input/MainTextInput";
import HomeSlideMenu from "@/components/menu/HomeSlideMenu";
import HomeNavBar from "@/components/navbar/HomeNavBar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black to-gray-900 text-white">

      {/* Navbar */}
      <HomeNavBar heading="No doubt" />

      {/* Main Section */}
      <div className="flex-1 flex justify-center items-center px-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6">
          <MainTextInput />
        </div>
      </div>
    </div>
  );
}
