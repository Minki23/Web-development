import Product from "./Products"
import Categories from "./Categories"
import {LogoutButton} from "@/app/LogoutButton"
export default function Home() {

  return (
    <>
    <div className="flex flex-col items-center gap-20 my-10">
      <LogoutButton/>
      <h1 className="text-5xl">Kategorie i produkty</h1>
      <div className="w-9/12 m-auto">
        <Product/>
      </div>
      <div className="w-9/12 m-auto">
        <Categories/>
      </div>
    </div>
    </>
  );
}
