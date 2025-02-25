import React from "react";

 interface AACKeyboardProps {
   onSelect: (word: string) => void; // Function to send selected word back
   symbols: { word: string; image: string }[];//required symbols now
 }



 const AACKeyboard: React.FC<AACKeyboardProps> = ({ onSelect, symbols }) => {
   return (
     <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
       <h3 className="text-lg font-bold mb-2 text-center">AAC Keyboard</h3>
       <div className="grid grid-cols-2 gap-2">
         {symbols.map((symbol) => (
           <button
             key={symbol.word}
             className="p-2 bg-blue-500 text-white rounded flex flex-col items-center"
             onClick={() => onSelect(symbol.word)}
           >
             <img src={symbol.image} alt={symbol.word} className="w-12 h-12 mb-1" />
             {symbol.word}
           </button>
         ))}
       </div>
     </div>
   );
 };

 export default AACKeyboard;