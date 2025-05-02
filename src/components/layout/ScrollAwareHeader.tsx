
import { useEffect, useState } from 'react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { Header } from './Header';
import { motion } from 'framer-motion';

export function ScrollAwareHeader() {
  const { scrollDirection, isAtTop } = useScrollDirection(10);
  const [hidden, setHidden] = useState(false);
  
  useEffect(() => {
    if (scrollDirection === 'down' && !isAtTop) {
      setHidden(true);
    } else if (scrollDirection === 'up' || isAtTop) {
      setHidden(false);
    }
  }, [scrollDirection, isAtTop]);
  
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header />
    </motion.div>
  );
}
