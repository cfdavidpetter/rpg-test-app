interface TableProps<T extends Record<string, any>> {
  headers: string[];
  data: T[];
  renderAction?: (item: T) => JSX.Element;
}

const Table = <T extends Record<string, any>,>({ headers, data, renderAction }: TableProps<T>) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3 whitespace-nowrap">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900'} border-b dark:border-gray-700`}>
              {Object.values(item).map((value, idx) => (
                <>
                  { idx !== 0 && 
                    <td key={idx} className="px-6 py-4 whitespace-nowrap">
                      {value}
                    </td> 
                  }
                </>
              ))}
              { renderAction &&
                <td className="px-6 py-4 whitespace-nowrap">
                  { renderAction(item)}
                </td>
              }
            </tr>
          ))}
          { data.length === 0 && <tr><td className="text-center py-4" colSpan={headers.length}>Registros não encontrados.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default Table;