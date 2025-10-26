import { formatCurrency } from "@/lib/utils";
import { RupeeSymbol } from "./RupeeSymbol";

export function FormattedCurrency({ amount, className }: { amount: number, className?: string }) {
    return (
        <span className={className}>
            <RupeeSymbol className="inline-block -mt-1 mr-0.5" />
            {formatCurrency(amount)}
        </span>
    );
}
