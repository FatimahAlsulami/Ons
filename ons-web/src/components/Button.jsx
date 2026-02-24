"use client";
import { motion } from "framer-motion";

export default function Button({ variant="primary", className="", ...props }){
  const cls = variant === "primary" ? "btn btnPrimary" :
              variant === "secondary" ? "btn btnSecondary" :
              variant === "danger" ? "btn btnDanger" : "btn btnGhost";
  return (
    <motion.button
      whileTap={{ scale: 0.99 }}
      className={`${cls} ${className}`}
      {...props}
    />
  );
}
