export function Item({
  product,
  item,
  size,
  price,
  stock,
  onDeleteProduct,
  onDecrementStock,
  onIncrementStock,
}) {
  return (
    <div className="product">
      <span>{item} </span>
      <span>{size} grams</span>
      <span>{price} PHP</span>
      <span>
        <button onClick={() => onIncrementStock(product.id)}>+</button>
        {stock} pcs
        <button onClick={() => onDecrementStock(product.id)}>-</button>
      </span>
      <button
        className="button"
        onClick={() => {
          onDeleteProduct(product.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}
