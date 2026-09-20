const GID_RE=/^G(?:0[1-9]|[12][0-9]|3[0-9]|40)$/;
export const MX1_VERSION='MX1';
export const MX1_MAX_ROOTS=4;
export const MX1_PROFILES=Object.freeze({
 ROOT:{licensed:true,min:1,max:1},
 NUCLEUS_SEQUENCE:{licensed:false,min:2,max:4},
 CV:{licensed:false,min:2,max:2},
 VC:{licensed:false,min:2,max:2},
 CVC:{licensed:false,min:3,max:3},
 CLUSTERED:{licensed:false,min:2,max:4}
});
function fail(code,message){const e=new Error(message);e.code=code;throw e;}
export function assertGid(gid){if(!GID_RE.test(gid))fail('INVALID_GID',`Invalid HNK40 G-ID: ${gid}`);return gid;}
export function encodeMx1({profile='ROOT',gids=[]}={}){
 const cfg=MX1_PROFILES[profile]; if(!cfg)fail('UNKNOWN_PROFILE',`Unknown MX1 profile: ${profile}`);
 if(!cfg.licensed)fail('PROFILE_GATED',`MX1 profile ${profile} is gated pending explicit grouping/syllabification authority`);
 if(!Array.isArray(gids))fail('INVALID_GIDS','gids must be an array');
 if(gids.length<cfg.min||gids.length>cfg.max||gids.length>MX1_MAX_ROOTS)fail('INVALID_ARITY',`Invalid root count for ${profile}`);
 gids.forEach(assertGid);
 return `${MX1_VERSION}:${profile}:${gids.join('+')}`;
}
export function decodeMx1(key){
 if(typeof key!=='string')fail('INVALID_KEY','MX1 key must be a string');
 const m=/^MX1:([A-Z_]+):(G(?:0[1-9]|[12][0-9]|3[0-9]|40)(?:\+G(?:0[1-9]|[12][0-9]|3[0-9]|40))*)$/.exec(key);
 if(!m)fail('INVALID_KEY','Malformed MX1 key');
 const profile=m[1],gids=m[2].split('+'),cfg=MX1_PROFILES[profile];
 if(!cfg)fail('UNKNOWN_PROFILE',`Unknown MX1 profile: ${profile}`);
 if(gids.length>MX1_MAX_ROOTS)fail('INVALID_ARITY','MX1 V1 supports at most four roots');
 gids.forEach(assertGid);
 return {version:MX1_VERSION,profile,gids,licensed:cfg.licensed};
}
export function validateMx1(key,{requireLicensed=true}={}){
 try{const decoded=decodeMx1(key);if(requireLicensed&&!decoded.licensed)return {valid:false,code:'PROFILE_GATED',decoded};return {valid:true,code:'OK',decoded};}
 catch(error){return {valid:false,code:error.code||'INVALID',message:error.message};}
}
export function geometryPlan(key){
 const decoded=decodeMx1(key);
 if(!decoded.licensed)fail('PROFILE_GATED',`Geometry for ${decoded.profile} is gated`);
 if(decoded.profile==='ROOT') return {profile:'ROOT',roots:[{gid:decoded.gids[0],role:'NUCLEUS',anchor:'CENTER',rotation:0,mirrored:false}],lossless:true};
 fail('PROFILE_GATED',`Geometry for ${decoded.profile} is gated`);
}
