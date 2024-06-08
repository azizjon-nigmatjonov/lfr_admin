
import { ref, computed } from "vue";

export default function () {
    let formatPrice = (value) => {
        if(value){
            let currency = value.toString().replace(/,/g, '');
            currency = parseFloat(currency);
            currency = new Intl.NumberFormat('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2}).format(currency);

            return currency
        }
        return 0;
    }
  return {
    formatPrice,
  }
}