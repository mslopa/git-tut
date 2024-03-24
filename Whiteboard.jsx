
import {useRef,useState,useEffect} from 'react';
import Mainboard from '../Mainboard/Mainboard';
import './index.css';
function Whiteboard() {
       
  const [tool,setTool] = useState("pencil");
  const [color,setcolor] = useState("black");
  const [elements, setElements] = useState( []);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  return (
    <div className='row'>
        <h1 className="text-center py-5"> React Drawing App </h1>
        <div className='col-md-12 gap-3 px-5 mt-4 mb-5 d-flex align-items-center justify-content-center'>
             <div className="d-flex col-md-2 justify-content-between gap-1">
                 <div className="d-flex gap-1">
                  <label htmlFor ="pencil">Pencil</label>
                   <input type="radio"
                    name="tool"
                    value="pencil" 
                    checked={tool === "pencil"}
                    className='mt-1'
                     onChange={(e)=>setTool(e.target.value)}/>
                  </div>
                   <div className='d-flex gap-1 '>
                    <label htmlFor="line">Line</label>
                   <input type="radio" 
                     id="line"
                     name="tool" 
                      value="line" 
                      checked={tool === "line"}
                       className='mt-1'
                      onChange={(e)=>setTool(e.target.value)}/>
                   </div>
                   <div className='d-flex gap-1'>
                    <label htmlFor="rectangle">Rectangle</label>
                   <input type="radio"
                   id="rect"
                    name="tool" 
                    checked={tool === "rectangle"}
                    value="rect"
                    className='mt-1'

                    onchange={(e)=>setTool(e.target.value)}/>
                </div>
                </div>
          <div className= "col-md-30mx-auto">
          <div className='d-flex flex-column align-items-center'>
            <label htmlFor='color'>Color</label>
            <input type="color"
               name="color"
               id= "color"
                className='mt-1'
                onchange ={(e)=> setcolor(e.target.value)}>
             </input>
         </div>
         </div>
         <div className='col-md-3 d-flex gap-2'>
              <button className='btn btn-primary mt-1'>Undo</button>
              <button className='btn btn-outline-primary mt-1'>Redo</button>
          </div> 
          <div className='col-md-2'>
              <button className="btn btn-danger">Clear canvas</button>
          </div>
          <div className='col-md-10 mx-auto mt-4 canvas-box'>
            <Mainboard
            canvasRef={canvasRef}
            ctxRef={ctxRef}
            elements={elements}
            setElements={setElements}
            tool= {tool}/>  
         </div>
     </div>
      </div>
  );
};

export default Whiteboard