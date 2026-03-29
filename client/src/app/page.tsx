import MainTextInput from "@/components/input/MainTextInput";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-[100vw] min-h-[100vh] ">
      <div className="max-w-[200px] bg-red-900 w-50">
        <MainTextInput />
      </div>
    </div>
  );
}
