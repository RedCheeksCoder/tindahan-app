import { useState } from "react";

export function AddCustomerForm({ onAddCustomer }) {
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
