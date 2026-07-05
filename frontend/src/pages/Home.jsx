import { useNavigate } from "react-router-dom";
import { getOrders } from "../services/orderService";
import useFetch from "../hooks/useFetch";
import DataTable from "../components/common/DataTable";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/common/Button";

// A component that renders the home page, displaying a list of sales orders in a data table and providing a button to add a new order
export default function Home() {
  const navigate = useNavigate();
  const { data: orders = [] } = useFetch(getOrders);

  return (
    <div className="p-6">
      {/* Page Header Component */}
      <PageHeader
        title="Sales Orders"
        right={<Button onClick={() => navigate("/order")}>Add New</Button>}
      />

      {/* Data Table Component */}
      <DataTable
        columns={["Order No", "Customer", "Date", "Total"]}
        data={orders.map((o) => ({
          orderNo: o.orderNo,
          customer: o.customerName,
          date: o.date,
          total: o.grandTotal,
        }))}
        onRowClick={(row) => {
          const order = orders.find((o) => o.orderNo === row.orderNo);
          navigate("/order", { state: order });
        }}
      />
    </div>
  );
}
