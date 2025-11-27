import React from "react";
import { CartItem as CartItemType, useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
    item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className="flex items-center gap-4 py-4 border-b border-neutral-100 last:border-0">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex flex-1 flex-col">
                <h4 className="text-sm font-medium text-neutral-900 line-clamp-1">
                    {item.name}
                </h4>
                <p className="text-xs text-neutral-500 mb-2">{item.brand}</p>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-neutral-900">
                        ₹{item.price * item.quantity}
                    </span>
                    <div className="flex items-center gap-2">
                        <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-4 text-center">
                            {item.quantity}
                        </span>
                        <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </div>
            <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-neutral-400 hover:text-red-500"
                onClick={() => removeFromCart(item.id)}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}
