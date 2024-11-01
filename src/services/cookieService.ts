import Cookies, { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();


class cookieService{
    // get
    get(key: string){
        return cookies.get(key)
    }
    // set
    set(key: string,value: unknown,options: CookieSetOptions | undefined){
        return cookies.set(key,value,options)
    }
    // remove
    remove(key: string){
        return cookies.remove(key)
    }
}

export default new cookieService()