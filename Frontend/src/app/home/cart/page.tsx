import CartView from "./CartView"
import {LogoutButton} from "@/app/LogoutButton"
export default function Home() {

  return (
    <>
    <div className="flex flex-col items-center gap-20 my-10">
      <LogoutButton/>
      <h1 className="text-5xl">Koszyk</h1>
      <div className="w-9/12 m-auto">
        <CartView/>
      </div>
    </div>
    </>
  );
}
