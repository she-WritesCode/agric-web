export function toCurrency(amount: number) {
    return amount.toLocaleString("en-NG", { currency: "NGN", style: "currency" });
}

export function getQueryString(arr: string[]) {
	return arr.join("&");
}

function generateString(characters: string , length: number) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function generateRandString(length: number) {
    const rand = Math.floor(Math.random() * 10)
    const randomString = Math.random().toString(36).substring(rand,rand+length);
    return randomString;
}

export function generatePaymentReference(unique: string){
    unique = unique.replace(/\s/g, "").replace("@", "").replace(".", "").trim().toUpperCase()
    const paymentRef =`TAPR-${generateString(unique, 8)}`.replace(/\s/g, "")
    return paymentRef;
}