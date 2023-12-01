import { useState } from "react";
import { AddNewProductForm } from "./AddNewProductForm";
import { Item } from "./Item";

export function ItemPrice({
  items,
  onAddNewProduct,
  onAddNewProductForm,
  onShowNewProductForm,
  onProductSelection,
  onDeleteProduct,
  onIncrementStock,
  onDecrementStock,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems = [];

  if (sortBy === "size") {
    sortedItems = items.slice().sort((a, b) => a.size - b.size);
  } else if (sortBy === "price") {
    sortedItems = items.slice().sort((a, b) => a.price - b.price);
  } else if (sortBy === "input") {
    sortedItems = items;
  } else if (sortBy === "stock") {
    sortedItems = items.slice().sort((a, b) => a.stock - b.stock);
  }

  return (
    <div className="prices container">
      <header>
        <h1>Stocks and Prices</h1>
      </header>
      <main className="main">
        {sortedItems.map((product) => (
          <Item
            onDeleteProduct={onDeleteProduct}
            product={product}
            onShowNewProductForm={onShowNewProductForm}
            onProductSelection={onProductSelection}
            item={product.item}
            size={product.size}
            price={product.price}
            stock={product.stock}
            key={product.id}
            onDecrementStock={onDecrementStock}
            onIncrementStock={onIncrementStock}
          />
        ))}
      </main>
      <footer>
        <div className="footer sort-prices">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="size">Sort by size</option>
            <option value="price">Sort by price</option>
            <option value="input">Sort by input</option>
            <option value="stock">Sort by stock</option>
          </select>
          <div className="buttons">
            <button
              className="button"
              onClick={() => {
                onShowNewProductForm();
                onProductSelection(items);
              }}
            >
              {onAddNewProductForm ? "Close Form" : "Add Product"}
            </button>
          </div>
        </div>
      </footer>
      {onAddNewProductForm && (
        <AddNewProductForm onAddNewProduct={onAddNewProduct} />
      )}
    </div>
  );
}
