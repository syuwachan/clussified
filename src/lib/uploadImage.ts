import { supabase } from "./supabaseClient";

export const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from('images').upload(fileName, file);
    if (error) {
        console.error(error);
    }
    return data;
}