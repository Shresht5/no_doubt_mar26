import MainTextInput from "@/components/input/MainTextInput";
import HomeSlideMenu from "@/components/menu/HomeSlideMenu";
import HomeNavBar from "@/components/navbar/HomeNavBar";

export default function Home() {
  return (
    <div className="w-[100vw] min-h-[100vh] flex flex-col relative">
      <HomeNavBar />
      <div className="flex-1 flex justify-center items-center ">
        <div className="max-w-[200px] bg-red-900 w-50">
          <MainTextInput />
        </div>
      </div>
    </div>
  );
}
