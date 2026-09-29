import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {launch,openFilm} from './lib/browser.mjs';
const file=fileURLToPath(new URL('../studies/scene-space.html',import.meta.url));
const browser=await launch(),hashes={},report={rates:[],performance:{}};
try{
  for(const rate of [1,.5,2]){
    const {page,duration,errors}=await openFilm(browser,file,{query:`rate=${rate}`});
    assert.equal(duration,12/rate);
    for(const t of [0,1.3,3.59,3.6,6,8.6,11.9]){
      const data=await page.evaluate(t=>{window.__riso.seek(t);return document.querySelector('canvas').toDataURL();},t/rate);
      const h=crypto.createHash('sha256').update(data).digest('hex');
      if(rate===1)hashes[t]=h;else assert.equal(h,hashes[t],`retime differs at ${t}, rate ${rate}`);
    }
    if(rate===1){
      const ms=await page.evaluate(()=>{const a=[];for(let i=0;i<120;i++){const t=performance.now();window.__riso.seek(i*.1);a.push(performance.now()-t);}return a.sort((a,b)=>a-b);});
      report.performance={samples:ms.length,median:ms[60],p95:ms[114],max:ms.at(-1)};
    }
    assert.equal(errors.length,0,errors.join('\n'));report.rates.push({rate,duration,matchingFrames:7});await page.close();
  }
}finally{await browser.close();}
report.hashes=hashes;
fs.mkdirSync(new URL('../out/scene-space-test/',import.meta.url),{recursive:true});
fs.writeFileSync(new URL('../out/scene-space-test/study-check.json',import.meta.url),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
