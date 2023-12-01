import { useState } from "react";

export function NewBalanceForm({ updateBalance, customers, onSetCustomers }) {
  const [newBalance, setNewBalance] = useState();
  function handleSubmit(e) {
    e.preventDefault();

    if (!newBalance) return;

    updateBalance(newBalance);
  }
  return (
    <form className="form update-balance-form" onSubmit={handleSubmit}>
      <label>New Balance</label>
      <input
        type="text"
        value={newBalance}
        onChange={(e) => setNewBalance(+e.target.value)}
      />
      <button>Add balance</button>
    </form>
  );
}
