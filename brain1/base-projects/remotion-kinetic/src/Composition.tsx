/**
 * COVER STYL' — FLUID MOTION REEL
 * Una sola composición continua. Sin escenas discretas.
 * Todo en movimiento todo el tiempo — como un reel real.
 */

import {
  AbsoluteFill, interpolate, spring,
  useCurrentFrame, useVideoConfig,
  Audio, staticFile,
} from "remotion";
import React from "react";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: inter } = loadInter();

const C = { dark:"#070a10", navy:"#151a28", green:"#d2e823", white:"#fff", gray:"#6b7280", dim:"rgba(255,255,255,0.12)" };

const clamp = (v:number) => Math.max(0,Math.min(1,v));
const t = (frame:number, start:number, dur:number) => clamp((frame-start)/dur);
const eOut = (x:number) => 1-Math.pow(1-x,3);
const eOut5 = (x:number) => 1-Math.pow(1-x,5);
const eInOut = (x:number) => x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const lerp = (a:number,b:number,x:number) => a+(b-a)*clamp(x);
const spr = (frame:number, from:number, fps:number, s=260,d=24) =>
  spring({frame:frame-from, fps, config:{stiffness:s,damping:d}});

// ─── Noise (siempre activo) ───────────────────────────────────────────
const Noise:React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents:"none",zIndex:200,mixBlendMode:"overlay",opacity:0.04}}>
      <svg width="100%" height="100%">
        <filter id={`g${f%4}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" seed={f*13} stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter={`url(#g${f%4})`}/>
      </svg>
    </AbsoluteFill>
  );
};

// ─── Vignette ────────────────────────────────────────────────────────
const Vig:React.FC = () => (
  <AbsoluteFill style={{background:"radial-gradient(ellipse 75% 75% at 50% 50%,transparent 40%,rgba(0,0,0,0.6) 100%)",zIndex:150,pointerEvents:"none"}}/>
);

// ─── Flying text — entra desde un lado y sale por el otro ────────────
const FlyText:React.FC<{
  text:string; frame:number; inFrame:number; outFrame:number;
  y:number; size:number; color?:string; fromRight?:boolean; weight?:number;
}> = ({text,frame,inFrame,outFrame,y,size,color=C.white,fromRight=false,weight=900}) => {
  const enter = eOut5(t(frame,inFrame,18));
  const exit = eInOut(t(frame,outFrame,14));
  const dir = fromRight ? 1 : -1;
  const xIn = lerp(dir*120, 0, enter);
  const xOut = lerp(0, -dir*80, exit);
  const op = Math.min(enter, 1-exit);
  if (op <= 0) return null;
  return (
    <div style={{
      position:"absolute", top:y, left:0, right:0,
      paddingLeft:60, paddingRight:60,
      fontFamily:inter, fontWeight:weight, fontSize:size,
      color, lineHeight:1,
      opacity:op,
      transform:`translateX(${xIn+xOut}px)`,
      willChange:"transform,opacity",
    }}>{text}</div>
  );
};

// ─── Slam text — entra de golpe desde arriba, rebota ─────────────────
const SlamText:React.FC<{
  text:string; frame:number; inFrame:number; outFrame:number;
  y:number; size:number; color?:string; align?:string;
}> = ({text,frame,inFrame,outFrame,y,size,color=C.white,align="left"}) => {
  const {fps} = useVideoConfig();
  const prog = spr(frame,inFrame,fps,500,30);
  const exit = eInOut(t(frame,outFrame,12));
  const op = Math.min(prog, 1-exit);
  if (op <= 0) return null;
  return (
    <div style={{
      position:"absolute", top:y, left:0, right:0,
      paddingLeft:60, paddingRight:60, textAlign:align as any,
      fontFamily:inter, fontWeight:900, fontSize:size,
      color, lineHeight:1,
      opacity:op,
      transform:`scale(${lerp(1.4,1,prog)})`,
      transformOrigin:`${align} center`,
      willChange:"transform,opacity",
    }}>{text}</div>
  );
};

// ─── Count-up número ─────────────────────────────────────────────────
const Count:React.FC<{
  to:number; suffix?:string; frame:number; inFrame:number; outFrame:number;
  y:number; label:string;
}> = ({to,suffix="",frame,inFrame,outFrame,y,label}) => {
  const {fps} = useVideoConfig();
  const enter = eOut5(t(frame,inFrame,30));
  const exit = eInOut(t(frame,outFrame,14));
  const op = Math.min(enter,1-exit);
  const val = Math.round(to*eOut5(t(frame,inFrame,40)));
  if (op <= 0) return null;
  return (
    <div style={{position:"absolute",top:y,left:60,opacity:op,transform:`translateY(${lerp(40,0,enter)}px)`}}>
      <div style={{fontFamily:inter,fontWeight:900,fontSize:180,color:C.white,lineHeight:1,letterSpacing:"-0.04em"}}>
        {val}{suffix}
      </div>
      <div style={{fontFamily:inter,fontWeight:600,fontSize:36,color:C.gray,textTransform:"uppercase",letterSpacing:"0.08em",marginTop:-16}}>
        {label}
      </div>
    </div>
  );
};

// ─── Línea horizontal que crece ───────────────────────────────────────
const Line:React.FC<{frame:number;inFrame:number;y:number;outFrame?:number}> = ({frame,inFrame,y,outFrame=9999}) => {
  const w = eOut5(t(frame,inFrame,25))*100;
  const op = 1-eInOut(t(frame,outFrame,12));
  if (op<=0) return null;
  return (
    <div style={{
      position:"absolute",top:y,left:60,
      width:`${w}%`,height:2,
      background:`linear-gradient(to right,${C.green},transparent)`,
      opacity:op,
    }}/>
  );
};

// ─── Ticker / marquee horizontal ─────────────────────────────────────
const Ticker:React.FC<{frame:number;inFrame:number;outFrame:number}> = ({frame,inFrame,outFrame}) => {
  const op = Math.min(eOut(t(frame,inFrame,15)),1-eInOut(t(frame,outFrame,12)));
  if (op<=0) return null;
  const items = "Sin obra · Sin polvo · 1 día · 500+ referencias · Sin obra · Sin polvo · 1 día · 500+ referencias · ";
  const x = -((frame-inFrame)*2.8) % 600;
  return (
    <div style={{
      position:"absolute",bottom:340,left:0,right:0,overflow:"hidden",
      opacity:op,
    }}>
      <div style={{
        fontFamily:inter,fontWeight:700,fontSize:28,
        color:C.green,letterSpacing:"0.08em",textTransform:"uppercase",
        whiteSpace:"nowrap",
        transform:`translateX(${x}px)`,
      }}>
        {items}{items}
      </div>
    </div>
  );
};

// ─── Pill badge ──────────────────────────────────────────────────────
const Pill:React.FC<{text:string;frame:number;inFrame:number;outFrame:number;top:number}> = ({text,frame,inFrame,outFrame,top}) => {
  const enter = eOut(t(frame,inFrame,15));
  const exit = eInOut(t(frame,outFrame,12));
  const op = Math.min(enter,1-exit);
  if(op<=0) return null;
  return (
    <div style={{
      position:"absolute",top,left:60,
      opacity:op,transform:`translateY(${lerp(16,0,enter)}px)`,
      background:"rgba(210,232,35,0.10)",
      border:`1px solid ${C.green}`,borderRadius:48,
      padding:"7px 22px",color:C.green,fontSize:25,
      fontWeight:700,fontFamily:inter,letterSpacing:"0.1em",
      textTransform:"uppercase",
    }}>{text}</div>
  );
};

// ─── Fondo vivo — gradiente que se mueve ─────────────────────────────
const LiveBg:React.FC<{frame:number}> = ({frame}) => {
  const hue1 = (frame*0.4)%360;
  const hue2 = (frame*0.4+180)%360;
  const x = 50+Math.sin(frame*0.02)*20;
  const y = 40+Math.cos(frame*0.015)*15;
  return (
    <AbsoluteFill style={{
      background:C.dark,
      zIndex:0,
    }}>
      {/* Glow que se mueve */}
      <div style={{
        position:"absolute",
        top:0,left:0,right:0,bottom:0,
        background:`radial-gradient(ellipse 60% 50% at ${x}% ${y}%, rgba(21,26,40,0.9) 0%, ${C.dark} 70%)`,
      }}/>
      {/* Acento verde fijo esquina */}
      <div style={{
        position:"absolute",top:0,right:0,
        width:3,
        height:`${Math.min(100,eOut5(t(frame,0,60))*100)}%`,
        background:`linear-gradient(to bottom,${C.green},transparent)`,
        opacity:0.7,
      }}/>
    </AbsoluteFill>
  );
};

// ─── COMPOSICIÓN PRINCIPAL ───────────────────────────────────────────
export const KineticReel:React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{background:C.dark,overflow:"hidden"}}>
      <LiveBg frame={frame}/>

      {/* ── BLOQUE 1: 0–90 | HOOK ─────────────────────────────────── */}

      {/* "¿Cuánto tiempo" — vuela desde izquierda */}
      <FlyText text="¿Cuánto tiempo" frame={frame} inFrame={0} outFrame={72}
        y={340} size={108} fromRight={false}/>

      {/* "lleva renovar" — vuela desde derecha con delay */}
      <FlyText text="lleva renovar" frame={frame} inFrame={10} outFrame={75}
        y={460} size={108} fromRight={true}/>

      {/* "tu espacio?" — slam desde arriba */}
      <SlamText text="tu espacio?" frame={frame} inFrame={22} outFrame={78}
        y={590} size={108}/>

      {/* Respuesta — aparece sola */}
      <FlyText text="Meses." frame={frame} inFrame={42} outFrame={75}
        y={760} size={72} color={C.gray} weight={500} fromRight={false}/>

      <FlyText text="→  24 horas." frame={frame} inFrame={55} outFrame={78}
        y={848} size={80} color={C.green} fromRight={true}/>

      <Line frame={frame} inFrame={30} y={730} outFrame={76}/>

      {/* ── BLOQUE 2: 80–200 | NÚMEROS ───────────────────────────── */}

      <Pill text="Los números" frame={frame} inFrame={82} outFrame={195} top={130}/>

      {/* 500+ vuela enorme */}
      <Count to={500} suffix="+" frame={frame} inFrame={88} outFrame={195}
        y={220} label="referencias europeas exclusivas"/>

      <Line frame={frame} inFrame={128} y={470} outFrame={195}/>

      <Count to={1} suffix=" día" frame={frame} inFrame={135} outFrame={195}
        y={500} label="de instalación garantizada"/>

      <Line frame={frame} inFrame={170} y={740} outFrame={195}/>

      <Count to={10} suffix=" años" frame={frame} inFrame={178} outFrame={195}
        y={768} label="de garantía"/>

      {/* ── BLOQUE 3: 195–295 | CONTRASTE ─────────────────────────── */}

      <FlyText text="ANTES:" frame={frame} inFrame={198} outFrame={292}
        y={260} size={56} color={C.gray} weight={700}/>
      <FlyText text="Obra." frame={frame} inFrame={205} outFrame={292}
        y={320} size={148} color="rgba(255,60,60,0.85)" fromRight/>
      <FlyText text="Ruido." frame={frame} inFrame={215} outFrame={292}
        y={468} size={148}/>
      <FlyText text="Meses." frame={frame} inFrame={225} outFrame={292}
        y={618} size={148} color="rgba(255,60,60,0.85)" fromRight/>
      <FlyText text="Dinero." frame={frame} inFrame={235} outFrame={292}
        y={766} size={148}/>

      {/* ── BLOQUE 4: 290–420 | SOLUCIÓN ─────────────────────────── */}

      <Pill text="La solución" frame={frame} inFrame={293} outFrame={415} top={130}/>

      <SlamText text="Lámina" frame={frame} inFrame={298} outFrame={415}
        y={240} size={148} color={C.green}/>
      <SlamText text="arquitectónica." frame={frame} inFrame={310} outFrame={415}
        y={392} size={108}/>

      <Line frame={frame} inFrame={330} y={570} outFrame={415}/>

      {/* Bullets que entran rápido */}
      {[
        {text:"⚡  Sin demolición ni polvo",  sf:335},
        {text:"🇪🇺  500+ refs europeas",      sf:352},
        {text:"✓  Instalado en 1 día",       sf:369},
        {text:"🔒  Garantía 10 años",         sf:386},
      ].map(({text,sf},i) => (
        <FlyText key={i} text={text} frame={frame} inFrame={sf} outFrame={415}
          y={590+i*76} size={40} color={C.white} weight={600} fromRight={i%2===1}/>
      ))}

      {/* ── BLOQUE 5: 415–540 | TICKER + MOMENTUM ─────────────────── */}

      <Ticker frame={frame} inFrame={418} outFrame={535}/>

      <SlamText text="Distribuidor" frame={frame} inFrame={420} outFrame={535}
        y={360} size={124}/>
      <SlamText text="Oficial" frame={frame} inFrame={432} outFrame={535}
        y={492} size={124} color={C.green}/>
      <SlamText text="en México." frame={frame} inFrame={444} outFrame={535}
        y={624} size={100}/>

      {/* ── BLOQUE 6: 535–630 | CTA FINAL ────────────────────────── */}

      <Pill text="Cover Styl'® · @directeddeco" frame={frame} inFrame={538} outFrame={628} top={180}/>

      <SlamText text="Tu espacio," frame={frame} inFrame={542} outFrame={628}
        y={320} size={112}/>
      <SlamText text="transformado." frame={frame} inFrame={554} outFrame={628}
        y={440} size={112} color={C.green}/>

      <Line frame={frame} inFrame={568} y={622} outFrame={628}/>

      <FlyText text="Sin obra · 1 día · Calidad europea" frame={frame} inFrame={572} outFrame={628}
        y={644} size={38} color={C.gray} weight={500}/>

      {/* CTA button */}
      {frame >= 580 && frame < 630 && (() => {
        const {fps:f2} = {fps};
        const prog = spr(frame, 580, fps, 450, 34);
        const exit = eInOut(t(frame,618,12));
        return (
          <div style={{
            position:"absolute",bottom:200,left:60,right:60,
            opacity:Math.min(prog,1-exit),
            transform:`scale(${lerp(0.85,1,prog)})`,
          }}>
            <div style={{
              background:C.green,borderRadius:56,
              padding:"34px 60px",textAlign:"center",
              fontFamily:inter,fontWeight:900,fontSize:52,
              color:C.dark,
            }}>coverstyl.mx</div>
          </div>
        );
      })()}

      {/* ── Siempre encima ──────────────────────────────────────── */}
      <Vig/>
      <Noise/>
      {/* <Audio src={staticFile("voiceover.mp3")}/> */}
    </AbsoluteFill>
  );
};
