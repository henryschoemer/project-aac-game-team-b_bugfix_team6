import React from "react"
import { motion } from "framer-motion";
 interface AACKeyboardProps {
   onSelect: (word: string) => void; // Function to send selected word back
   symbols: { word: string; image: string }[];//required symbols now
 }



 const AACKeyboard: React.FC<AACKeyboardProps> = ({ onSelect, symbols }) => {
   return (
     <div className=" bg-[#b4fcdc] p-4 border border-gray-300 rounded-lg shadow-md">
       <h3 className="text-lg font-bold mb-2 text-center text-white">AAC Keyboard</h3>
       <div className="grid grid-cols-2 gap-2">
         {symbols.map((symbol) => (
           <motion.button
             key={symbol.word}
             className="p-2 bg-[#63d2cb] text-white rounded flex flex-col items-center"
             onClick={() => onSelect(symbol.word)}
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
           >
             <img src={symbol.image} alt={symbol.word} className="w-12 h-12 mb-1" />
             {symbol.word}
           </motion.button>
         ))}
       </div>
     </div>
   );
 };

 export default AACKeyboard;