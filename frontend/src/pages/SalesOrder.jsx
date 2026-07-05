import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getClients } from "../services/clientService";
import { getItems } from "../services/itemService";
import { createOrder } from "../services/orderService";

import PageHeader from "../components/common/PageHeader";
import Select from "../components/common/Select";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import OrderItemRow from "../components/sales-order/OrderItemRow";

export default function SalesOrder() {
  const navigate = useNavigate();
  const location = useLocation();

  const [clients, setClients] = useState([]);
  const [items, setItems] = useState([]);

  const [orderItems, setOrderItems] = useState([]);

  const [form, setForm] = useState({
    clientId: "",
    address1: "",
    address2: "",
    address3: "",
    suburb: "",
    state: "",
    postCode: "",
    invoiceNo: "",
    referenceNo: "",
    invoiceDate: "",
  });

  // Load dropdown data
  useEffect(() => {
    getClients().then((res) => setClients(res.data));
    getItems().then((res) => {
      setItems(res.data);
      setOrderItems([
        {
          itemId: "",
          note: "",
          quantity: 1,
          taxRate: 10,
        },
      ]);
    });
  }, []);

  // Edit mode support
  useEffect(() => {
    if (location.state) {
      const order = location.state;

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        clientId: order.clientId,
        address1: order.address1,
        address2: order.address2,
        address3: order.address3,
        suburb: "",
        state: "",
        postCode: "",
        referenceNo: order.referenceNo,
        invoiceNo: order.invoiceNo,
      });

      setOrderItems(order.items || []);
    }
  }, [location.state]);

  // Auto fill customer
  const handleClientChange = (id) => {
    const c = clients.find((x) => x.id === +id);

    setForm({
      ...form,
      clientId: id,
      address1: c?.address1 || "",
      address2: c?.address2 || "",
      address3: c?.address3 || "",
      suburb: c?.suburb || "",
      state: c?.state || "",
      postCode: c?.postCode || "",
    });
  };

  // Update item row
  const updateItem = (index, value) => {
    const updated = [...orderItems];
    updated[index] = value;
    setOrderItems(updated);
  };

  // Add new row
  const addRow = () => {
    setOrderItems([
      ...orderItems,
      { itemId: "", note: "", quantity: 1, taxRate: 10 },
    ]);
  };

  // Totals
  const totals = orderItems.reduce(
    (acc, item) => {
      const product = items.find((i) => i.id === item.itemId) || {};
      const price = product.price || 0;

      const excl = (item.quantity || 0) * price;
      const tax = (excl * (item.taxRate || 0)) / 100;
      const incl = excl + tax;

      acc.excl += excl;
      acc.tax += tax;
      acc.incl += incl;

      return acc;
    },
    { excl: 0, tax: 0, incl: 0 },
  );

  // Save order
  const handleSave = async () => {
    const payload = {
      clientId: Number(form.clientId),
      address1: form.address1,
      address2: form.address2,
      address3: form.address3,
      invoiceDate: form.invoiceDate,
      referenceNo: form.referenceNo,
      items: orderItems,
    };

    await createOrder(payload);
    alert("Order Saved!");
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Sales Order"
        right={<Button onClick={() => navigate("/")}>Back</Button>}
      />
      <div className="p-6 grid grid-cols-2 gap-4">
        {/* Customer Details Card */}
        <Card>
          <h2 className="font-bold mb-3">Customer Details</h2>

          <Select
            label="Customer Name"
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
        </Card>

        {/* Invoice Details Card */}
        <Card>
          <h2 className="font-bold mb-3">Invoice Details</h2>
          <Input
            label="Invoice No"
            value={form.invoiceNo}
            onChange={(e) => setForm({ ...form, invoiceNo: e.target.value })}
          />
          <Input
            label="Invoice Date"
            type="date"
            value={form.invoiceDate}
            onChange={(e) => setForm({ ...form, invoiceDate: e.target.value })}
          />
          <Input
            label="Reference No"
            value={form.referenceNo}
            onChange={(e) => setForm({ ...form, referenceNo: e.target.value })}
          />
        </Card>

        {/* Items Table Card */}
        <div className="col-span-2">
          <Card>
            <div className="flex justify-between mb-3">
              <h2 className="font-bold">Items</h2>

              <Button onClick={addRow}>Add Row</Button>
            </div>

            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th>Item</th>
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
                {orderItems.map((item, index) => (
                  <OrderItemRow
                    key={index}
                    items={items}
                    value={item}
                    onChange={(val) => updateItem(index, val)}
                  />
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Totals and Save Card */}
        <div className="col-span-2 flex justify-end">
          <Card className="w-1/3">
            <p>Total Excl: {totals.excl.toFixed(2)}</p>
            <p>Total Tax: {totals.tax.toFixed(2)}</p>
            <p className="font-bold">Total Incl: {totals.incl.toFixed(2)}</p>

            <Button className="mt-3 w-full" onClick={handleSave}>
              Save Order
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
