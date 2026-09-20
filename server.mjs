import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { QUESTIONS } from './src/questions.js';
import { analyze } from './src/analyze.js';

const root = fileURLToPath(new URL('.', import.meta.url));
const publicDir = join(root, 'public');
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml'};

async function body(req){ let s=''; for await(const c of req) { s+=c; if(s.length>200000) throw new Error('Request too large'); } return JSON.parse(s||'{}'); }
function send(res,status,data,type='application/json; charset=utf-8'){ res.writeHead(status, {'Content-Type':type,'Cache-Control':'no-store'}); res.end(type.startsWith('application/json')?JSON.stringify(data):data); }

const server=http.createServer(async (req,res)=>{
  try {
    if(req.method==='GET' && req.url==='/api/questions') return send(res,200,{questions:QUESTIONS.map(q=>({id:q.id,text:q.text,options:q.options.map(o=>({id:o.id,text:o.text}))}))});
    if(req.method==='POST' && req.url==='/api/analyze'){
      const b=await body(req); const result=analyze(b.answers); return send(res,200,result);
    }
    if(req.method==='GET'){
      const path=(req.url?.split('?')[0]||'/'); const file=path==='/'?join(publicDir,'index.html'):join(publicDir,path.replace(/^\//,''));
      if(!file.startsWith(publicDir)) return send(res,403,{error:'Forbidden'});
      const data=await readFile(file); return send(res,200,data,mime[extname(file)]||'text/plain; charset=utf-8');
    }
    send(res,405,{error:'Method not allowed'});
  } catch(e){ send(res, e.message==='Request too large'?413:400,{error:e.message||'Request failed'}); }
});
const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
  console.log(`SkillDNA running on port ${port}`);
});
