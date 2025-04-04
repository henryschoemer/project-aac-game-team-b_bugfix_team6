import React from "react"
import { motion } from "framer-motion";
import useTextToSpeech from "./useTextToSpeech";

 interface AACKeyboardProps {
   onSelect: (word: string) => void; 
   symbols: { word: string; image: string }[];
   backgroundColor?: string; // Background color of the AAC tablet
   buttonColor?: string; // Background color of the button
 }

 const AACKeyboard: React.FC<AACKeyboardProps> = ({ 
  onSelect, 
  symbols, 
  backgroundColor = "#b4fcdc", 
  buttonColor = "#63d2cb"
}) => {
     const {speak } = useTextToSpeech();
   return (
     <div 
      className="p-4 border border-gray-300 rounded-lg shadow-md"
      style={{ backgroundColor }}
      >
       <h3 className="text-lg font-bold mb-2 text-center text-white">AAC Keyboard</h3>
       <div className="grid grid-cols-2 gap-2">
         {symbols.map((symbol) => (
           <motion.button
             key={symbol.word}
             className="p-2 text-white rounded flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
             style={{ backgroundColor: buttonColor }} 

             onClick={() => {
                 onSelect(symbol.word);
                 speak(symbol.word);
           }}
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             aria-label={`Select ${symbol.word}`}
             tabIndex={0}
           >
             <img src={symbol.image} alt={symbol.word} className="w-24 h-24 mb-1" />
             <span>{symbol.word}</span>
           </motion.button>
         ))}
       </div>
     </div>
   );
 };

 export default AACKeyboard;

 