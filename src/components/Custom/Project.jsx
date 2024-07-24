'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';

const scaleAnimation = {
  initial: {scale: 0, x:"-50%", y:"-50%"},
  enter: {scale: 1, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
  closed: {scale: 0, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}
};

const ProjectPreview = ({ projects }) => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  useEffect(() => {
    let xMoveContainer = gsap.quickTo(modalContainer.current, "left", {duration: 0.8, ease: "power3"});
    let yMoveContainer = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease: "power3"});
    let xMoveCursor = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease: "power3"});
    let yMoveCursor = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease: "power3"});
    let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"});
    let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"});

    window.addEventListener('mousemove', (e) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    });
  }, []);

  return (
    <>
      <div className="w-full">
        {projects.map((project, index) => (
          <div 
            key={index}
            onMouseEnter={() => {setModal({active: true, index})}} 
            onMouseLeave={() => {setModal({active: false, index})}} 
            className="flex w-full justify-between items-center px-[100px] py-[50px] border-t border-[#c9c9c9] cursor-pointer transition-all duration-200 hover:opacity-50 last:border-b group"
          >
            <h2 className="text-[60px] m-0 font-normal transition-all duration-400 group-hover:-translate-x-[10px]">
              {project.title}
            </h2>
            <p className="font-light transition-all duration-400 group-hover:translate-x-[10px]">
              View Project
            </p>
          </div>
        ))}
      </div>

      <motion.div 
        ref={modalContainer} 
        variants={scaleAnimation} 
        initial="initial" 
        animate={modal.active ? "enter" : "closed"} 
        className="h-[350px] w-[400px] absolute bg-white overflow-hidden pointer-events-none flex items-center justify-center"
      >
        <div 
          style={{top: modal.index * -100 + "%"}} 
          className="h-full w-full absolute transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
        >
          {projects.map((project, index) => (
            <div 
              className="h-full w-full flex items-center justify-center" 
              style={{backgroundColor: project.color}} 
              key={`modal_${index}`}
            >
              <Image 
                src={`https://api.microlink.io?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url`}
                width={300}
                height={200}
                alt={project.title}
                className="h-auto w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div 
        ref={cursor} 
        className="w-20 h-20 rounded-full bg-[#455CE9] text-white absolute z-[2] flex items-center justify-center text-sm font-light pointer-events-none"
        variants={scaleAnimation} 
        initial="initial" 
        animate={modal.active ? "enter" : "closed"}
      ></motion.div>
      <motion.div 
        ref={cursorLabel} 
        className="w-20 h-20 rounded-full bg-transparent text-white absolute z-[2] flex items-center justify-center text-sm font-light pointer-events-none"
        variants={scaleAnimation} 
        initial="initial" 
        animate={modal.active ? "enter" : "closed"}
      >
        View
      </motion.div>
    </>
  );
};

export default ProjectPreview;