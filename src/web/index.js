import http from "http";

export function startServer(){
    const server=http.createServer((req,res)=>{
        res.end();
    });

    const PORT=process.env.PORT||8080;
    server.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`));
}