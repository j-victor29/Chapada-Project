import * as React from "react";
import { Input } from "@/components/ui/input";

export interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: number;
  onChange?: (value: number | undefined) => void;
}

export const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onChange, ...props }, ref) => {
    // 1. UX Limpa: se 0 ou indefinido, renderiza vazio para permitir digitação livre
    const displayValue = value === 0 || value === undefined ? "" : value;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // 3. Bloqueio de Teclado: impede 'e', 'E', '+' e '-'
      if (["e", "E", "+", "-"].includes(e.key)) {
        e.preventDefault();
      }
      props.onKeyDown?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const valStr = e.target.value;
      if (valStr === "") {
        onChange?.(undefined);
        return;
      }
      
      let num = Number(valStr);
      if (isNaN(num)) return;

      // 2. Sanitização Absoluta: sem negativos
      if (num < 0) num = 0;
      
      // 5. Limite de Teto (Safe Guard): 99999999
      if (num > 99999999) num = 99999999;

      // 4. Casas Decimais: máximo de 2 (padrão financeiro)
      const parts = valStr.split(".");
      if (parts[1] && parts[1].length > 2) {
        num = Number(num.toFixed(2));
      }

      onChange?.(num);
    };

    return (
      <Input
        {...props}
        type="number"
        min={0}
        max={99999999}
        step={props.step || "any"}
        ref={ref}
        value={displayValue}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
    );
  }
);
CurrencyInput.displayName = "CurrencyInput";
