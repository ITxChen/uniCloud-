import{r as e,b as a,o as l,c as t,w as u,D as s,d as o,e as d,k as i,q as n,h as m,I as r,u as c,j as p,v as f,x as v}from"./index-c0cc7daa.js";import{_}from"./uni-file-picker.92e111f2.js";import{_ as V,b,r as h}from"./uni-app.es.6c29e105.js";const y=V({__name:"edit",setup(V){let y=e("");const x=e({title:"",author:"",content:""}),g=e([]),j=e([]),F=e=>{j.value=e.tempFilePaths},k=e=>{const a=g.value.map((e=>e.url));console.log(a);let l=e.detail.value;s.callFunction({name:"updateData",data:{detail:l,id:y,picArrs:a}}).then((e=>{n({title:"修改成功"}),setTimeout((()=>{m({url:"/pages/index/index"})}),500)}))};return a((()=>{s.callFunction({name:"artGetRow",data:{id:y}}).then((e=>{if(x.value=e.result.data[0],console.log(x.value),!x.value.picArrs)return;const a=x.value.picArrs.map((e=>({url:e})));g.value=a}))})),b((e=>{y=e.id})),(e,a)=>{const s=r,n=o,m=c,V=h(p("uni-file-picker"),_),b=f,y=v;return l(),t(n,{class:"edit"},{default:u((()=>[d(y,{onSubmit:k},{default:u((()=>[d(n,{class:"item"},{default:u((()=>[d(s,{type:"text",name:"title",modelValue:x.value.title,"onUpdate:modelValue":a[0]||(a[0]=e=>x.value.title=e)},null,8,["modelValue"])])),_:1}),d(n,{class:"item"},{default:u((()=>[d(s,{type:"text",name:"author",modelValue:x.value.author,"onUpdate:modelValue":a[1]||(a[1]=e=>x.value.author=e)},null,8,["modelValue"])])),_:1}),d(n,{class:"item"},{default:u((()=>[d(m,{name:"content",modelValue:x.value.content,"onUpdate:modelValue":a[2]||(a[2]=e=>x.value.content=e)},null,8,["modelValue"])])),_:1}),d(n,{class:"item"},{default:u((()=>[d(V,{modelValue:g.value,"onUpdate:modelValue":a[3]||(a[3]=e=>g.value=e),fileMediatype:"image",mode:"grid",onSuccess:F,onFail:e.fail},null,8,["modelValue","onFail"])])),_:1}),d(n,{class:"item"},{default:u((()=>{return[d(b,{"form-type":"reset"},{default:u((()=>[i("重置")])),_:1}),d(b,{"form-type":"submit",type:"primary",disabled:(e=x.value,Object.keys(e).some(((a,l)=>""==e[a])))},{default:u((()=>[i(" 提交 ")])),_:1},8,["disabled"])];var e})),_:1})])),_:1})])),_:1})}}},[["__scopeId","data-v-79ebe6bb"]]);export{y as default};
