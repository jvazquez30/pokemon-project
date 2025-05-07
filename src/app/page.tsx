import WelcomePage from "./components/WelcomePage";
import Image from "next/image";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen  pb-20 gap-16 ">
      <header className="flex justify-center items-center w-full bg-red-600">

        <Image src="/pokeTrainer.png" alt="Pokemon" width={300} height={300} />
      </header>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <WelcomePage />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
