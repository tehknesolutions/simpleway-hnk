import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { routeForPathname } from './core/http-routing.mjs';

const root=fileURLToPath(new URL('./',import.meta.url));
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8'};

const server=http.createServer(async(req,res)=>{
  try{
    const pathname=req.url.split('?')[0];
    const route=routeForPathname(pathname);
    if(route.type==='redirect'){
      res.writeHead(302,{location:route.location,'cache-control':'no-store'});
      res.end();
      return;
    }
    const requested=route.path;
    const safe=normalize(requested).replace(/^([.][.][/\\])+/, '');
    const path=join(root,safe);
    const info=await stat(path);
    if(!info.isFile())throw new Error('not-file');
    const data=await readFile(path);
    res.writeHead(200,{'content-type':types[extname(path)]||'application/octet-stream','cache-control':'no-store'});
    res.end(data);
  }catch{
    res.writeHead(404,{'content-type':'text/plain; charset=utf-8'});
    res.end('Not found');
  }
});

server.listen(port,()=>console.log(`HNK A1 Sprint 1: http://localhost:${port}`));
