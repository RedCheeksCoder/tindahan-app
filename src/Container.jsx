import { useState } from "react";
import { TotalFooter } from "./TotalFooter";
import { AddCustomerForm } from "./AddCustomerForm";
import { Customer } from "./Customer";
import { initialCustomer } from "./App";
import { NewBalanceForm } from "./NewBalanceForm";
import { initialProductPrices } from "./App";
import { ItemPrice } from "./ItemPrice";

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
  /* NEW CUSTOMER */
  function handleAddCustomer(newCustomer) {
    setCustomers((customers) => [...customers, newCustomer]);
    setShowAddCustomerForm(!showAddCustomerForm);
  }

  function handleOpenCustomerForm() {
    setShowAddCustomerForm((show) => !show);
  }
  /* DELETION */
  function handleDeleteCustomer(id) {
    const confirmed = window.confirm("Are you sure to delete this customer?");
    {
      confirmed &&
        setCustomers((customers) =>
          customers.filter((customer) => customer.id !== id)
        );
    }
  }

  function handleDeleteProduct(id) {
    const confirmed = window.confirm("Are you sure to delete this product?");
    {
      confirmed && setItems((items) => items.filter((item) => item.id !== id));
    }
  }

  /* BALANCE */
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

  /* STOCKS */
  function handleDecrementStock(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, stock: item.stock - 1 } : item
      )
    );
  }

  function hanldeIncrementStock(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, stock: item.stock + 1 } : item
      )
    );
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
            <h1>Customer Debt</h1>
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
            onShowAddCustomerForm={showAddCustomerForm}
          />
        </div>
        <ItemPrice
          items={items}
          onDeleteProduct={handleDeleteProduct}
          onAddNewProduct={handleAddNewProduct}
          onAddNewProductForm={showAddProductForm}
          onShowNewProductForm={handleShowAddNewProductForm}
          onProductSelection={handleSelectedProduct}
          onDecrementStock={handleDecrementStock}
          onIncrementStock={hanldeIncrementStock}
        />
        {/* <InventoryStock /> */}
      </div>
    </>
  );
}
