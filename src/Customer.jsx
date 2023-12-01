export function Customer({
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
