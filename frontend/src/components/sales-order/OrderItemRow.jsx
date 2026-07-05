import Select from "../common/Select";
import Input from "../common/Input";

// A component that renders a row for a sales order item, allowing selection of an item, input of quantity and note, and displaying calculated prices
export default function OrderItemRow({ items, value, onChange }) {
  const selectedItem = items.find((i) => i.id === value.itemId);

  const handleChange = (field, val) => {
    onChange({ ...value, [field]: val });
  };

  const price = selectedItem?.price || 0;

  const excl = value.quantity * price;
  const tax = (excl * value.taxRate) / 100;
  const incl = excl + tax;

  return (
    <tr className="border">
      <td className="p-2">
        <Select
          value={value.itemId}
          onChange={(e) => handleChange("itemId", +e.target.value)}
        >
          <option value="">Select</option>
          {items.map((i) => (
            <option key={i.id} value={i.id}>
              {i.itemCode}
            </option>
          ))}
        </Select>
      </td>

      <td className="p-2 text-sm">{selectedItem?.description}</td>

      <td className="p-2">
        <Input
          value={value.note}
          onChange={(e) => handleChange("note", e.target.value)}
        />
      </td>

      <td className="p-2">
        <Input
          type="number"
          value={value.quantity}
          onChange={(e) =>
            handleChange("quantity", Math.max(1, Number(e.target.value) || 1))
          }
        />
      </td>

      <td className="p-2">{price}</td>
      <td className="p-2">{excl.toFixed(2)}</td>
      <td className="p-2">{tax.toFixed(2)}</td>
      <td className="p-2">{incl.toFixed(2)}</td>
    </tr>
  );
}
