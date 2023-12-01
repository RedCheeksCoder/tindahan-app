import { useState } from "react";
import { TotalFooter } from "./TotalFooter";
import { AddCustomerForm } from "./AddCustomerForm";
import { Customer } from "./Customer";
import { initialCustomer } from "./App";
import { NewBalanceForm } from "./NewBalanceForm";
import { initialProductPrices } from "./App";

export function Container() {
  const [customers, setCustomers] = useState(initialCustomer);
  const [items, setItems] = useState(initialProductPrices);
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);

  const [showAddProductForm, setShowAddProductForm] = useState(false);
  function handleShowAddNewProductForm() {
    setShowAddProductForm(!showAddProductForm);
  }

  function handleAddNewProduct(newProduct) {
    setItems((items) => [...items, newProduct]);
    setShowAddProductForm(!showAddProductForm);
  }

  const [selectedProduct, setSelectedProduct] = useState(null);
  function handleSelectedProduct(product) {
    setSelectedProduct((cur) => {
      return cur?.id === product?.id ? null : product;
    });
  }

  function handleAddCustomer(newCustomer) {
    setCustomers((customers) => [...customers, newCustomer]);
    setShowAddCustomerForm(!showAddCustomerForm);
  }

  function handleOpenCustomerForm() {
    setShowAddCustomerForm((show) => !show);
  }

  function handleDeleteCustomer(id) {
    const confirmed = window.confirm("Are you sure to delete this customer?");
    {
      confirmed &&
        setCustomers((customers) =>
          customers.filter((customer) => customer.id !== id)
        );
    }
  }
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  function handleSelectedCustomer(customer) {
    setSelectedCustomer((cur) => {
      return cur?.id === customer?.id ? null : customer;
    });
  }
  const [showNewBalanceForm, setShowNewBalanceForm] = useState(false);
  function handleShowNewBalanceForm() {
    setShowNewBalanceForm(!showNewBalanceForm);
  }

  function handleUpdateBalance(value) {
    setCustomers((customers) =>
      customers.map((customer) =>
        customer.id === selectedCustomer.id
          ? { ...customer, balance: customer.balance + value }
          : customer
      )
    );
    setShowNewBalanceForm(!showNewBalanceForm);
  }

  let total = 0;
  {
    total = customers.reduce((p, c) => p + c.balance, 0);
  }
  return (
    <>
      <div className="main-container">
        <div className="container">
          <header>
            <h1>Customer Utangsss</h1>
          </header>
          <main className="main">
            {customers.map((customer) => (
              <Customer
                customer={customer}
                key={customer.id}
                onDeleteCustomer={handleDeleteCustomer}
                onSelection={handleSelectedCustomer}
                onShowNewBalanceForm={handleShowNewBalanceForm}
              />
            ))}
          </main>
          {console.log(showNewBalanceForm)}
          {showNewBalanceForm && (
            <NewBalanceForm
              onSetCustomers={setCustomers}
              customers={customers}
              updateBalance={handleUpdateBalance}
            />
          )}
          {showAddCustomerForm && (
            <AddCustomerForm
              onAddCustomer={handleAddCustomer}
              customers={customers}
              onSetCustomer={setCustomers}
            />
          )}
          <TotalFooter
            total={total}
            onShowCustomerForm={handleOpenCustomerForm}
          />
        </div>
        <ItemPrice
          items={items}
          onAddNewProduct={handleAddNewProduct}
          onAddNewProductForm={showAddProductForm}
          onShowNewProductForm={handleShowAddNewProductForm}
          onProductSelection={handleSelectedProduct}
        />
        <InventoryStock />
      </div>
    </>
  );
}

function ItemPrice({
  items,
  onAddNewProduct,
  onAddNewProductForm,
  onShowNewProductForm,
  onProductSelection,
}) {
  return (
    <div className="prices container">
      <header>
        <h1>Prices</h1>
      </header>
      <main className="main">
        {items.map((product) => (
          <Item
            items={items}
            onShowNewProductForm={onShowNewProductForm}
            onProductSelection={onProductSelection}
            item={product.item}
            size={product.size}
            price={product.price}
            key={product.id}
          />
        ))}
      </main>
      <footer>
        <div className="footer sort-prices">
          <select>
            <option value="size">Sort by size</option>
            <option value="price">Sort by price</option>
            <option value="input">Sort by input</option>
          </select>
          <div className="buttons">
            <button
              className="button"
              onClick={() => {
                onShowNewProductForm();
                onProductSelection(items);
              }}
            >
              Add Product
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

function Item({ onShowNewProductForm, item, size, price }) {
  return (
    <div className="product">
      <span>{item} </span>
      <span>{size} grams</span>
      <span>{price} PHP</span>
    </div>
  );
}

function AddNewProductForm({ onAddNewProduct }) {
  const [item, setItem] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    if (!item || !size || !price) return;
    const id = crypto.randomUUID();
    const newProduct = {
      id,
      item,
      size,
      price,
    };
    onAddNewProduct(newProduct);
    setItem("");
    setSize("");
    setPrice("");
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
        onChange={(e) => setSize(e.target.value)}
      />
      <label>Price</label>
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button>Add item</button>
    </form>
  );
}

function InventoryStock() {
  return (
    <div className="inventory container">
      <header>
        <h1>Inventory</h1>
      </header>
      <main className="main">
        <div className="item">
          <span>Cornbeef </span>
          <span>30 pcs</span>
          <div className="buttons">
            <button className="button">Update</button>
          </div>
        </div>
      </main>
      <footer>
        <div className="footer sort-inventory">
          <select>
            <option value="tag">Sort by tag</option>
            <option value="price">Sort by price</option>
            <option value="input">Sort by input</option>
          </select>
        </div>
      </footer>
    </div>
  );
}

{
  /*
            <ItemPrice />
            
            <AddStockForm /> */
}
