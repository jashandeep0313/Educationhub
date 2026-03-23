import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const PageLoader = () => {
  return (
    <div className="min-h-screen bg-background/50 backdrop-blur-sm flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="glass rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 shadow-xl border border-primary/20"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
        </div>
        <h3 className="text-xl font-heading font-bold text-foreground animate-pulse">
          Loading IQ Hub...
        </h3>
        <p className="text-sm text-muted-foreground">Preparing your experience</p>
      </motion.div>
    </div>
  );
};

export default PageLoader;
