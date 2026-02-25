"use client";
import { motion } from "framer-motion";

export default function Button({ variant="primary", className="", href, target, rel, ...props }){
  const cls = variant === "primary" ? "btn btnPrimary" :
              variant === "secondary" ? "btn btnSecondary" :
              variant === "danger" ? "btn btnDanger" : "btn btnGhost";

  if (href) {
    return (
      <motion.a
        whileTap={{ scale: 0.99 }}
        className={`${cls} ${className}`}
        href={href}
        target={target}
        rel={rel}
        role="button"
        {...props}
      />
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.99 }}
      className={`${cls} ${className}`}
      {...props}
    />
  );
}
