export function TotalFooter({ total, onShowCustomerForm }) {
  return (
    <footer>
      <div className="footer total">
        <h3>TOTAL: {total}</h3>
        <button onClick={onShowCustomerForm}>ADD</button>
      </div>
    </footer>
  );
}
