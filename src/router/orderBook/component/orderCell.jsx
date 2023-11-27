export default function OrderCell({ orderInfo }) {
  return (
    <div className="flex flex-col border-b hover:scale-105 hover:cursor-pointer border-gray-600 rounded-xl">
      <div>quantity:{orderInfo.quantity}</div>
      <div>price:{orderInfo.price}</div>
      <div>trader:{orderInfo.trader}</div>
    </div>
  );
}
