export function TotalFooter({
  total,
  onShowCustomerForm,
  onShowAddCustomerForm,
}) {
  return (
    <footer>
      <div className="footer total">
        <h3>TOTAL: {total}</h3>
        <button onClick={onShowCustomerForm}>
          {onShowAddCustomerForm ? "CLOSE" : "ADD"}
        </button>
      </div>
    </footer>
  );
}
