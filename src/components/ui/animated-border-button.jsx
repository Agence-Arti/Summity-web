import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const AnimatedBorderButton = ({
  children,
  className,
  variant,
  size,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const buttonRef = React.useRef(null);
  const [dims, setDims] = React.useState({ width: 0, height: 0 });

  const generatePath = (width, height) => {
    if (width === 0 || height === 0) {
      return { leftPath: '', rightPath: '' };
    }
    const r = height / 2;
    const sw = 1.5;
  
    const leftPath = `M ${width / 2},${sw} L ${r},${sw} A ${r - sw},${r - sw} 0 0 0 ${sw},${r} A ${r - sw},${r - sw} 0 0 0 ${r},${height - sw} L ${width / 2},${height - sw}`;
    const rightPath = `M ${width / 2},${sw} L ${width - r},${sw} A ${r - sw},${r - sw} 0 0 1 ${width - sw},${r} A ${r - sw},${r - sw} 0 0 1 ${width - r},${height - sw} L ${width / 2},${height - sw}`;
  
    return { leftPath, rightPath };
  };

  const { leftPath, rightPath } = generatePath(dims.width, dims.height);

  React.useLayoutEffect(() => {
    if (buttonRef.current) {
      const { width, height } = buttonRef.current.getBoundingClientRect();
      setDims({ width, height });
    }
  }, [children, className, size]);

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: 'spring', duration: 0.8, bounce: 0 },
        opacity: { duration: 0.01 },
      },
    },
    exit: {
      pathLength: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.button
      ref={buttonRef}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        buttonVariants({ variant, size, className }),
        'relative overflow-hidden group'
      )}
      {...props}
    >
      <AnimatePresence>
        {isHovered && (
            <motion.div
            className="absolute inset-0 rounded-full bg-primary"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ originX: 0.5 }}
            />
        )}
      </AnimatePresence>

      <span className="relative z-10 flex items-center justify-center transition-colors duration-300 group-hover:text-primary-foreground text-sm">{children}</span>
      
      <AnimatePresence>
        {isHovered && dims.width > 0 && (
          <motion.svg
            key="border-left"
            className="absolute top-0 left-0 w-full h-full"
            width={dims.width}
            height={dims.height}
            preserveAspectRatio="none"
            viewBox={`0 0 ${dims.width} ${dims.height}`}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.path
              d={leftPath}
              fill="transparent"
              stroke="hsl(var(--royal-blue))"
              strokeWidth="3"
              variants={draw}
            />
          </motion.svg>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isHovered && dims.width > 0 && (
          <motion.svg
            key="border-right"
            className="absolute top-0 left-0 w-full h-full"
            width={dims.width}
            height={dims.height}
            preserveAspectRatio="none"
            viewBox={`0 0 ${dims.width} ${dims.height}`}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.path
              d={rightPath}
              fill="transparent"
              stroke="hsl(var(--royal-blue))"
              strokeWidth="3"
              variants={draw}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default AnimatedBorderButton;