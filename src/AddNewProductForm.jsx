import { useState } from "react";

export function AddNewProductForm({ onAddNewProduct }) {
  const [item, setItem] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!item || !size || !price || !stock) return;
    const id = crypto.randomUUID();
    const newProduct = {
      id,
      item,
      size,
      price,
      stock,
    };
    onAddNewProduct(newProduct);
    setItem("");
    setSize("");
    setPrice("");
    setStock("");
  }

  return (
    <form className="new-item-form" onSubmit={handleSubmit}>
      <label>Item</label>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <label>Size</label>
      <input
        type="text"
        value={size}
        placeholder="in grams"
        onChange={(e) => setSize(e.target.value)}
      />
      <label>Price</label>
      <input
        type="text"
        value={price}
        placeholder="in pesos"
        onChange={(e) => setPrice(e.target.value)}
      />
      <label>Stock</label>
      <input
        type="text"
        value={stock}
        placeholder="in pieces"
        onChange={(e) => setStock(e.target.value)}
      />
      <button>Add item</button>
    </form>
  );
}
