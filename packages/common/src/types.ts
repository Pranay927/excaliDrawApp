import {z} from "zod";
// common zod tyoe schema for http & ws Servers and also Frontend
export const userInputSchema = z.object({
    username : z.string().min(3),
    password : z.string().min(8)
}
) 

export const roomSchema = z.object({
    name: z.string().min(3).max(20)
})