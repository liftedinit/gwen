import { cubePng } from "@liftedinit/ui";
import "./splash.css";

export function Splash() {
  return (
    <div className="Splash" data-testid="splash-screen">
      <img src={cubePng} alt="Gwen Logo" />
      <h1>Gwen</h1>
      <h2>Lifted Initiative</h2>
    </div>
  );
}
