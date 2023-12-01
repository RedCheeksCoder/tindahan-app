import "./App.css";
import { Container } from "./Container";

export const initialCustomer = [
  {
    id: 118836,
    name: "Gigi",
    balance: 245,
    imageUrl: "https://i.pravatar.cc/48?u=118836",
  },
  {
    id: 615478,
    name: "Rhenald",
    balance: 0,
    imageUrl: "https://i.pravatar.cc/48?u=615478",
  },
  {
    id: 982967,
    name: "Juvy",
    balance: 982,
    imageUrl: "https://i.pravatar.cc/48?u=982967",
  },
];

export const initialProductPrices = [
  { id: 1, item: "Argentina cornbeef", size: "500g", price: 85 },
  { id: 2, item: "Purefoods gisado", size: "500g", price: 102 },
  { id: 3, item: "SurfBar", size: "500g", price: 45 },
  { id: 4, item: "Ariel", size: "250g", price: 18 },
];

function App() {
  return (
    <>
      <Container />
    </>
  );
}

export default App;
