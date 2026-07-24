import type { Response } from 'express';

class ApiResponses {

    static ok(res: Response, message: string, data = null) {
        return res.status(200).json({
           status: 'success',
           message: message,
           data: data
        })
    } 

    static created(res: Response, message: string, data = null) {
        return res.status(201).json({
            status: 'success',
            message: message,
            data: data
        })
    }

    static noContent(res: Response) {
        return res.status(204).send()
    }
}   


export default ApiResponses
   

    
