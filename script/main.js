"use strict";
/*変数宣言*/
const display=document.querySelector('#display');
const svg_sin_s=document.querySelector('#svg_sin_s');
const svg_sin_m=document.querySelector('#svg_sin_m');
const svg_sin_h=document.querySelector('#svg_sin_h');
const sin_s=document.querySelector('#sin_s');
const sin_m=document.querySelector('#sin_m');
const sin_h=document.querySelector('#sin_h');
const ch1_unit=document.querySelectorAll('#ch1_unit span');
const ch2_unit=document.querySelectorAll('#ch2_unit span');
const ch3_unit=document.querySelectorAll('#ch3_unit span');
const digiralClock=document.querySelector('#digiralClock time');
const btn_tone=document.querySelector('#btn_tone');
const btn_stop=document.querySelector('#btn_stop');
const range_sw=document.querySelector('#range_sw');
const range_mw=document.querySelector('#range_mw');
const range_hw=document.querySelector('#range_hw');
const range_sh=document.querySelector('#range_sh');
const range_mh=document.querySelector('#range_mh');
const range_hh=document.querySelector('#range_hh');
let mode=[0,0,0,0,0,0,0];
let stop=false;
let power=true;

/*関数宣言*/
const moveWave=(m,s,ms)=>{
    svg_sin_s.setAttribute("viewBox",`${ms/(1000/100)} 0 3600 100`);
    svg_sin_m.setAttribute("viewBox",`${(s+ms/1000)*(100/60)} 0 600 100`);
    svg_sin_h.setAttribute("viewBox",`${(m+s/60+ms/(1000*60))*(100/60)} 0 100 100`);
}
const addZero = (num,digit) => {
    if(digit===3){
        return num = num < 10 ? `00${num}` : num < 100 ? `0${num}` : num;
    }else{
        return num = num < 10 ? `0${num}` : num;
    }
}
const clock = () => {
    const now = new Date();
    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    let milisec = now.getMilliseconds(); //ミリ秒(0~999ms)を取得
    if(!stop) moveWave(min,sec,milisec); //位相変化
    digiralClock.innerHTML = `${addZero(hour,2)}:${addZero(min,2)}:${addZero(sec,2)}.${addZero(milisec,3)}`; //デジタル時計
    requestAnimationFrame(clock);
}

/*メイン処理*/
//波形を複数生成する
for(let i=1;i<=6;i++){
    svg_sin_m.innerHTML+=`<path d="M ${i*100} 50 Q ${i*100+25} -40,${i*100+50} 50 T ${i*100+100} 50" stroke="green" fill="none"/>`;
}
for(let i=1;i<=36;i++){
    svg_sin_s.innerHTML+=`<path d="M ${i*100} 50 Q ${i*100+25} -40,${i*100+50} 50 T ${i*100+100} 50" stroke="red" fill="none"/>`;
}

//時計始動
clock();

//クリックイベント
btn_tone.addEventListener('click',()=>{
    if(++mode[0] % 2){
        display.classList.add('dark');
    }else{
        display.classList.remove('dark');
    }
});
btn_stop.addEventListener('click',()=>{
    stop=!stop;
});
//幅変更
range_sw.addEventListener('click',()=>{
    if(++mode[1] % 2){
        sin_s.style.width=1800;
        ch1_unit[1].innerHTML='1.000';
        range_sw.classList.add('on');
    }else{
        sin_s.style.width=900;
        ch1_unit[1].innerHTML='2.000';
        range_sw.classList.remove('on');
    }
});
range_mw.addEventListener('click',()=>{
    if(++mode[2] % 2){
        sin_m.style.width=1800;
        ch2_unit[1].innerHTML='10.00';
        range_mw.classList.add('on');
    }else{
        sin_m.style.width=900;
        ch2_unit[1].innerHTML='20.00';
        range_mw.classList.remove('on');
    }
});
range_hw.addEventListener('click',()=>{
    if(++mode[3] % 2){
        sin_h.style.width=1800;
        ch3_unit[1].innerHTML='100.0';
        range_hw.classList.add('on');
    }else{
        sin_h.style.width=900;
        ch3_unit[1].innerHTML='200.0';
        range_hw.classList.remove('on');
    }
});
//高さ変更
range_sh.addEventListener('click',()=>{
    if(++mode[4] % 2){
        sin_s.style.height=50;
        sin_s.style.transform="translateY(25px)";
        ch1_unit[0].innerHTML='0.240';
        range_sh.classList.add('on');
    }else{
        sin_s.style.height=100;
        sin_s.style.transform="translateY(0px)";
        ch1_unit[0].innerHTML='0.120';
        range_sh.classList.remove('on');
    }
});
range_mh.addEventListener('click',()=>{
    if(++mode[5] % 2){
        sin_m.style.height=75;
        sin_m.style.transform="translateY(37.5px)";
        ch2_unit[0].innerHTML='2.400';
        range_mh.classList.add('on');
    }else{
        sin_m.style.height=150;
        sin_m.style.transform="translateY(0px)";
        ch2_unit[0].innerHTML='1.200';
        range_mh.classList.remove('on');
    }
});
range_hh.addEventListener('click',()=>{
    if(++mode[6] % 2){
        sin_h.style.height=100;
        sin_h.style.transform="translateY(50px)";
        ch3_unit[0].innerHTML='24.00';
        range_hh.classList.add('on');
    }else{
        sin_h.style.height=200;
        sin_h.style.transform="translateY(0px)";
        ch3_unit[0].innerHTML='12.00';
        range_hh.classList.remove('on');
    }
});