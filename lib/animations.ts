import { Variants } from 'framer-motion';

export const windowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: (reduced = false) =>
    reduced
      ? { opacity: 1, scale: 1 }
      : { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: (reduced = false) => (reduced ? { opacity: 0 } : { opacity: 0, transition: { duration: 0.15 } }),
};

export const iconVariants: Variants = {
  idle: { scale: 1 },
  selected: { scale: 0.98 },
};
