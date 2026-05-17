import "./Table.css";

type TableProps<T> = {
  data: T[];
  renderActions?: (item: T) => React.ReactNode;
  excludeKeys?: Array<keyof T>;
};

function Table<T extends object>({
  data,
  renderActions,
  excludeKeys = [],
}: TableProps<T>) {
  if (data.length === 0) {
    return <div className="no-data">No records to display.</div>;
  }

  // 💡 Dynamically filter headers based on the excludeKeys prop
  const headers = (Object.keys(data[0] as object) as Array<keyof T>).filter(
    (key) => !excludeKeys.includes(key),
  );

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {headers.map((key) => (
              <th key={String(key).toLocaleUpperCase()}>
                {String(key).toLocaleUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={"id" in row ? String(row["id"]) : rowIndex}>
              {headers.map((header) => (
                <td key={String(header)}>{String(row[header])}</td>
              ))}
              {renderActions && <td>{renderActions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
