export function toCurrency(amount: number) {
    return amount.toLocaleString("en-NG", { currency: "NGN", style: "currency" });
}