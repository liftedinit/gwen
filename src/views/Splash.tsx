import cube from "../assets/cube.png";
import "./Splash.css";

export function Splash() {
  return (
    <div className="Splash" data-testid="splash-screen">
      <img src={cube} alt="Gwen Logo" />
      <h1>Gwen</h1>
      <h2>Lifted Initiative</h2>
    </div>
  );
}
