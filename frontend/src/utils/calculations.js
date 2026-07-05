// Utility functions for calculations related to sales orders
// Calculates the exclusive price based on quantity and unit price
export const calculateExcl = (qty, price) => qty * price;

// Calculates the tax amount based on exclusive price and tax rate
export const calculateTax = (excl, rate) => (excl * rate) / 100;

// Calculates the inclusive price based on exclusive price and tax amount
export const calculateIncl = (excl, tax) => excl + tax;
