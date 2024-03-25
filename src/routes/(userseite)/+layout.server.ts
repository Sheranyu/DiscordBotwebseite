// src/routes/+layout.server.ts
export const load = async ({url, locals}) => {

  
  console.log(url.pathname);
  
  if(!locals.user){
    return {
      login: false,
      url: url.pathname
    }
  }
  
  
  return {
    login: true,
    url: url.pathname
  }

}