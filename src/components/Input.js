const Input = ({ money, updateMoney, type, layout, children }) => {
    layout = layout === 'flex' ? 'sm:flex items-center' : layout
    return (
        <div className={layout}>
            <label className={`text-2xl text-end mr-2 font-bold w-[180px] text-white ${children ? "" : "hidden"}`}>
                {children}
            </label>
            <input
                className="h-[40px] w-[250px] appearance-none block text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type={type} id="inputMidPrice"
                value={money}
                onChange={updateMoney}
            />
        </div >
    )
}

export default Input