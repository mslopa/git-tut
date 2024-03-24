import React from 'react'
import { useEffect,useState, useLayoutEffect, useRef } from 'react'
import rough from 'roughjs'

const roughGenerator = rough.generator()
function Mainboard({canvasRef, ctxRef,elements, setElements,tool}) {

  const [isDrawing, setDrawing]=useState(false)
  const roughCanvas = rough.canvas(canvasRef.current);

   useEffect((canvasRef,ctxRef) => {
              
              const canvas = canvasRef.current;
              if (canvas) {
              canvas.height = window.innerHeight * 2;
              canvas.width = window.innerWidth * 2
              const ctx = ctx.getContext("2d")
       
             ctxRef.current = ctx ;
              }
   
            },[canvasRef,ctxRef])
    
useLayoutEffect (() => {

              const roughCanvas = rough. canvas(canvasRef.current);
             
             if (elements.length > 0)
             {
                ctxRef.current.clearRect(0,
                  0,
                  canvasRef.current.width,
                  canvasRef.current.height);
             elements.forEach ((elements) =>{

                  if (elements.type === "rect") {
     
               roughCanvas.draw(  
               roughGenerator.rectangle( elements.offsetx,
                elements.offsety,
                 elements.width,
                 elements.height)
                 )
              }
              else if (elements.type === "line") {
                  roughCanvas.draw(
                     roughGenerator.line(
                      elements.offsetx,
                      elements.offsety,
                      elements.width,
                      elements.height
                     )
                     );
                     }
                    }
             )
                  }
               }, [elements]);
              
                 elements.forEach ((elements) =>{

               if (elements.type === "line") {

                roughCanvas.draw(  
                   roughGenerator.line( elements.offsetx,elements.offsety,elements.width, elements.height))
                    }

                else if (elements.type === "pencil") {
                       roughCanvas.linearPath(elements.path);
           
                      }
                 
        });

      } [elements,canvasRef,ctxRef];
   const handleMouseDown = (e) => {
     
       const [offsetx, offsety] = e.nativeEvent;
       
       if(tool === "pencil")
       {
        setElements((prevElements) => [
          ...prevElements,
          {
             type:"pencil",
             offsetx,
             offsety,
             path:[[offsetx,offsety]],
             stroke: "black",
          },
         ]);
       }
      else if(tool === "line")
       {
        setElements((prevElements) => [
          ...prevElements,
          {
             type:"line",
             offsetx,
             offsety,
             path:[[offsetx,offsety]],
             stroke: "black",
          },
         ]);
       }
       else if(tool === "rect")
       {
        setElements((prevElements) => [
          ...prevElements,
          {
             type:"rect",
             offsetx,
             offsety,
             height: 0,
             width:0,
             stroke: "black",
          },
         ]);
       }
      
           setDrawing(true)
   };
   const handleMouseMove = (e) => {

    const [offsetx, offsety] = e.nativeEvent;

        if(isDrawing) {
        const {path} = elements[elements.length-1];
        const newPath = [...path,[offsetx, offsety]] ;          
        if(tool === "pencil") {
         setElements ((prevElements) => {
            
            prevElements.map((ele,index) => {

              if(index === elements.length-1){

                return {
                    ...ele,
                    path:newPath

                };
                }
                else {

                  return ele;
                }
              })
            });
        
          }
          else if (tool === "line") {

            setElements ((prevElements) => {
            
              prevElements.map((ele,index) => {
  
                if(index === elements.length-1){
  
                  return {
                     
                      width: offsetx,
                      height: offsety,
                      ...ele,
                     
  
                  };
                  }
                  else {
  
                    return ele;
                  }
                })
            }  )
              }
              else if (tool === "rect") {

                setElements ((prevElements) => {
                
                  prevElements.map((ele,index) => {
      
                    if(index === elements.length-1){
      
                      return {
                         
                          width: offsetx-ele.offsetx,
                          height: offsety-ele.offsety,
                          ...ele,
                         
      
                      };
                      }
                      else {
      
                        return ele;
                      }
                    })
                  })       
          }
   };
   const handleMouseUp = (e) => {

        setDrawing(false)
   }

       return (
    
    <div
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseMove={(e)=> handleMouseMove(e)}
      onMouseUp={(e)=>handleMouseUp(e)}
    className=' border border-dark border-5  h-100 w-100 overflow-hidden' >
     
    <canvas ref={canvasRef} />
    </div>
      
       );
};

export default Mainboard