
export type Column<T> = {
    key: keyof T | "action";
    label: string;
    textFloat?: "left" | "right";
    render?: (row: T) => React.ReactNode;
}

type TableProps<T> = {
    columns: Column<T>[],
    data: T[]
}
const Table = <T,>({ columns, data }: TableProps<T>) => {

    return (
        <div className="border border-primary-30 rounded-lg overflow-hidden mt-5">
            <table className="w-full text-sm caption-bottom border-collapse">
                <thead>
                    <tr className="hover:bg-muted/50 text-left border-b border-[color:var(--color-primary-30)]">
                        {columns.map(col => (
                            <th key={String(col.key)} className="p-2">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-muted/50 border-b border-[color:var(--color-primary-30)] last:border-b-0">
                            {columns.map(col => (
                                <td key={String(col.key)} className="p-2 text-color-text">
                                    {col.render ? col.render(row) : (
                                        col.key !== "action" ? String(row[col.key]) : null                           
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;