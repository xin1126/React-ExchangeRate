const Table = ({ data }) => {
    return (
        <div className="overflow-x-auto relative shadow-md rounded-lg mb-10">
            <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-64 w-full px-10 rounded">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6 text-lg">
                            幣種
                        </th>
                        <th scope="col" className="py-3 px-6 text-lg">
                            匯率
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        return (
                            <tr key={item.name} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.name}
                                </th>
                                <td className="py-4 px-6">
                                    {item.money}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table
