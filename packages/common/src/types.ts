import {z} from "zod";

export const userInputSchema = z.object({
    username : z.string().min(3),
    password : z.string().min(8)
}
) 

export const roomSchema = z.object({
    name: z.string().min(3).max(20)
})