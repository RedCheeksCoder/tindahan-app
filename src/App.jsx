import { useState } from "react";
import "./App.css";

const initialCustomer = [
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

function App() {
  return (
    <>
      <Container />
    </>
  );
}

function Container() {
  const [customers, setCustomers] = useState(initialCustomer);
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);

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
    console.log(selectedCustomer?.id);
  }
  const [showNewBalanceForm, setShowNewBalanceForm] = useState(false);
  function handleShowNewBalanceForm() {
    setShowNewBalanceForm(!showNewBalanceForm);
  }
  function handleUpdateBalance(balance) {
    setCustomers(
      customers.map((customer) =>
        customer.id === selectedCustomer.id
          ? { ...customer, balance: balance }
          : customer
      )
    );
  }

  let total = 0;
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
        </div>
      </div>
      {(total = customers.reduce((p, c) => p + c.balance, 0))}
      <TotalFooter total={total} onShowCustomerForm={handleOpenCustomerForm} />

      {/* 
      <ItemPrice />
      <InventoryStock />
      <AddStockForm /> */}
    </>
  );
}
function Customer({
  customer,
  onDeleteCustomer,
  onSelection,
  onShowNewBalanceForm,
}) {
  return (
    <div className="customer">
      <img src={customer.imageUrl} alt={customer.name} />
      <span>{customer.name}</span> <span>{customer.balance} PHP</span>
      <div className="buttons">
        <button
          className="button"
          onClick={() => {
            onShowNewBalanceForm();
            onSelection(customer);
          }}
        >
          Update
        </button>
        <button
          className="button"
          onClick={() => onDeleteCustomer(customer.id)}
        >
          Paid
        </button>
      </div>
    </div>
  );
}
function TotalFooter({ total, onShowCustomerForm }) {
  return (
    <footer>
      <div className="footer total">
        <h3>TOTAL: {total}</h3>
        <button onClick={onShowCustomerForm}>ADD</button>
      </div>
    </footer>
  );
}
function AddCustomerForm({ onAddCustomer }) {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !balance) return;

    const id = crypto.randomUUID();
    const newCustomer = {
      id,
      name,
      imageUrl: `${"https://i.pravatar.cc/48"}?=${id}`,
      balance: balance,
    };
    console.log(newCustomer);
    onAddCustomer(newCustomer);
    setName("");
    setBalance(0);
  }
  return (
    <form className="form customer-form" onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Balance</label>
      <input
        type="text"
        value={balance}
        onChange={(e) => setBalance(+e.target.value)}
      />
      <button>Add Customer</button>
    </form>
  );
}
function NewBalanceForm({ updateBalance }) {
  const [balance, setBalance] = useState();
  function handleSubmit(e) {
    e.preventDefault();

    if (!balance) return;
    updateBalance(balance);
  }
  return (
    <form className="form update-balance-form" onSubmit={handleSubmit}>
      <label>New Balance</label>
      <input
        type="text"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
      />
      <button>Add Customer</button>
    </form>
  );
}
function ItemPrice() {}
function InventoryStock() {}
function AddStockForm() {}

export default App;
