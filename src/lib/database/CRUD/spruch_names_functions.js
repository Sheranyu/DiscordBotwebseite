/**
 * @param {any} params
 */
export async function DeleteSpruchnames(params) {

    
    
    const data = await fetch(`api/deletespruch/${params.id}`, {
        method: "DELETE",
    })
}

/**
 * @param {{ id: any; }} params
 */
export async function UpdateSpruchNames(params){
    const data = await fetch(`api/deletespruch/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(params)
    })
    
}

/**
 * @param {{ id_text: any; }} params
 */
export async function UpdateSpruchText(params) {
    const data = await fetch(`api/Spruchtext/${params.id_text}`, {
        method: "PUT",
        body: JSON.stringify(params)
    })
    
}
/**
 * @param {{ id_text: any; }} params
 */
export async function DelteSpruchText(params) {
    const data = await fetch(`api/Spruchtext/${params.id_text}`, {
        method: "DELETE",
        body: JSON.stringify(params)
    })
    
}
/**
 * @param {{ id_text: any; } | undefined} [params]
 */
export async function AddSpruchNameOrNull(params){

    const data = await fetch(`api/SpruchNames/`, {
        method: "POST",
        body: JSON.stringify(params)
    })
    if(data.ok){

        return {
            message: await data.json(),
            error: false
        }
    }
    else
    {
        return {
            message: "Inhalt darf nicht leer sein",
            error: true
        }
    }
}