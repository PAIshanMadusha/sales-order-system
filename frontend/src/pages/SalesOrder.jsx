import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClients } from "../services/clientService";
import { getItems } from "../services/itemService";
import { createOrder } from "../services/orderService";
import { useSelector } from "react-redux";
import PageHeader from "../components/common/PageHeader";
import Select from "../components/common/Select";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import OrderItemRow from "../components/sales-order/OrderItemRow";
import {
  calculateExcl,
  calculateTax,
  calculateIncl,
} from "../utils/calculations";

export default function SalesOrder() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [items, setItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const selectedOrder = useSelector((state) => state.orders.selectedOrder);
  const isEdit = !!selectedOrder;

  // Initialize form state with default values for a new order
  const [form, setForm] = useState({
    clientId: "",
    address1: "",
    address2: "",
    address3: "",
    suburb: "",
    state: "",
    postCode: "",
    referenceNo: "",
    invoiceNo: "",
    invoiceDate: "",
  });

  // Load dropdown data
  useEffect(() => {
    getClients().then((res) => setClients(res.data));
    getItems().then((res) => setItems(res.data));
  }, []);

  // Load selected order data if editing
  useEffect(() => {
    if (!selectedOrder) return;
    const selectedForm = {
      clientId: selectedOrder.clientId,
      address1: selectedOrder.address1,
      address2: selectedOrder.address2,
      address3: selectedOrder.address3,
      suburb: selectedOrder.suburb,
      state: selectedOrder.state,
      postCode: selectedOrder.postCode,
      referenceNo: selectedOrder.referenceNo,
      invoiceNo: selectedOrder.orderNo,
      invoiceDate: selectedOrder.date?.split("T")[0],
    };
    const selectedItems = selectedOrder.items || [];
    Promise.resolve().then(() => {
      setForm(selectedForm);
      setOrderItems(selectedItems);
    });
  }, [selectedOrder]);

  // Handle client selection change and update address fields accordingly
  const handleClientChange = (id) => {
    const c = clients.find((x) => x.id === +id);
    setForm((prev) => ({
      ...prev,
      clientId: id,
      address1: c?.address1 || "",
      address2: c?.address2 || "",
      address3: c?.address3 || "",
      suburb: c?.suburb || "",
      state: c?.state || "",
      postCode: c?.postCode || "",
    }));
  };

  // Update a specific order item in the orderItems state when its values change
  const updateItem = (index, value) => {
    const updated = [...orderItems];
    updated[index] = value;
    setOrderItems(updated);
  };

  // Add a new empty order item row to the orderItems state
  const addRow = () => {
    setOrderItems([
      ...orderItems,
      { itemId: "", note: "", quantity: 1, taxRate: 10 },
    ]);
  };

  // Calculate totals for the order based on the orderItems and their respective prices and tax rates
  const totals = orderItems.reduce(
    (acc, item) => {
      const product = items.find((i) => i.id === item.itemId);
      const price = product?.price || 0;
      const excl = calculateExcl(item.quantity, price);
      const tax = calculateTax(excl, item.taxRate);
      const incl = calculateIncl(excl, tax);
      acc.excl += excl;
      acc.tax += tax;
      acc.incl += incl;
      return acc;
    },
    { excl: 0, tax: 0, incl: 0 },
  );

  // Handle saving the order by sending the form data and order items to the backend
  const handleSave = async () => {
    const payload = {
      clientId: Number(form.clientId),
      address1: form.address1,
      address2: form.address2,
      address3: form.address3,
      suburb: form.suburb,
      state: form.state,
      postCode: form.postCode,
      referenceNo: form.referenceNo,
      invoiceNo: form.invoiceNo,
      invoiceDate: form.invoiceDate,
      items: orderItems,
    };
    await createOrder(payload);
    navigate("/");
    alert("Order saved successfully!");
  };

  // Reset the form and order items to their initial state
  const handleReset = () => {
    setForm({
      clientId: "",
      address1: "",
      address2: "",
      address3: "",
      suburb: "",
      state: "",
      postCode: "",
      referenceNo: "",
      invoiceNo: "",
      invoiceDate: "",
    });

    setOrderItems([{ itemId: "", note: "", quantity: 1, taxRate: 10 }]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <PageHeader
          title={isEdit ? "Edit Sales Order" : "New Sales Order"}
          right={
            <div className="flex gap-2">
              <Button onClick={() => navigate("/")}>Back to List</Button>
              <Button onClick={handleReset}>Reset Form</Button>
            </div>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Customer Details */}
          <Card className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">
              Customer Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Customer"
                value={form.clientId}
                onChange={(e) => handleClientChange(e.target.value)}
              >
                <option value="">Select</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.customerName}
                  </option>
                ))}
              </Select>
              <Input
                label="Address 1"
                value={form.address1}
                onChange={(e) => setForm({ ...form, address1: e.target.value })}
              />
              <Input
                label="Address 2"
                value={form.address2}
                onChange={(e) => setForm({ ...form, address2: e.target.value })}
              />
              <Input
                label="Address 3"
                value={form.address3}
                onChange={(e) => setForm({ ...form, address3: e.target.value })}
              />
              <Input
                label="Suburb"
                value={form.suburb}
                onChange={(e) => setForm({ ...form, suburb: e.target.value })}
              />
              <Input
                label="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
              />
              <Input
                label="Post Code"
                value={form.postCode}
                onChange={(e) => setForm({ ...form, postCode: e.target.value })}
              />
            </div>
          </Card>

          {/* Invoice Details */}
          <Card>
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">
              Invoice Details
            </h2>
            <Input
              label="Reference No"
              value={form.referenceNo}
              onChange={(e) =>
                setForm({ ...form, referenceNo: e.target.value })
              }
            />
            <Input
              label="Invoice No"
              value={form.invoiceNo}
              readOnly
              onChange={(e) => setForm({ ...form, invoiceNo: e.target.value })}
            />
            <Input
              type="date"
              label="Invoice Date"
              value={form.invoiceDate}
              onChange={(e) =>
                setForm({ ...form, invoiceDate: e.target.value })
              }
            />
          </Card>

          {/* Items Table */}
          <div className="lg:col-span-3">
            <Card>
              <div className="flex justify-between mb-4">
                <h2 className="text-lg font-semibold">Items</h2>
                <Button onClick={addRow}>+ Add New Item</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="p-3 text-left">Item</th>
                      <th>Description</th>
                      <th>Note</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Excl</th>
                      <th>Tax</th>
                      <th>Incl</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.length === 0 ? (
                      <tr>
                        <td
                          colSpan="8"
                          className="text-center p-6 text-gray-400"
                        >
                          No items added yet! Click "Add New Item"
                        </td>
                      </tr>
                    ) : (
                      orderItems.map((item, index) => (
                        <OrderItemRow
                          key={index}
                          items={items}
                          value={item}
                          onChange={(val) => updateItem(index, val)}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Totals */}
          <div className="lg:col-span-3 flex justify-end">
            <div className="w-full max-w-md md:max-w-xl lg:max-w-md">
              <Card>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{totals.excl.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>{totals.tax.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{totals.incl.toFixed(2)}</span>
                  </div>
                  <Button className="w-full mt-4" onClick={handleSave}>
                    {isEdit ? "Update Order" : "Save Order"}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
