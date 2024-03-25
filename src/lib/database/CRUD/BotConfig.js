export async function UpdateBotConfig(params) {

    
    const userid = params.User_id
    const data = await fetch(`api/botconfig/${userid}/updatemsl`, {
        method: "PUT",
        body: JSON.stringify(params)
    })
}   