import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, setSelectedOrder } from "../redux/slices/orderSlice";
import DataTable from "../components/common/DataTable";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import Card from "../components/common/Card";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders = [], loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <PageHeader
          title="All Sales Orders"
          right={
            <Button onClick={() => navigate("/order")}>+ Add New Order</Button>
          }
        />

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <Loader />
          ) : (
            <DataTable
              columns={["Order No", "Customer", "Date", "Total"]}
              data={orders.map((o) => ({
                orderNo: o.orderNo,
                customer: o.customerName,
                date: new Date(o.date).toLocaleDateString(),
                total: `Rs. ${o.grandTotal.toFixed(2)}`,
              }))}
              onRowClick={(row) => {
                const order = orders.find((o) => o.orderNo === row.orderNo);
                dispatch(setSelectedOrder(order));
                navigate("/order");
              }}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {orders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                📦
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              All sales orders in the system
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
