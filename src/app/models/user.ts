
import { Place } from './place';
export class User {
    id=''
    first_name: String
    last_name: String
    email:  String
    isActive: Boolean
    hashed_password: String
    created_at: String
    temp_password: String
    temp_password_time: String
    isConnected:Boolean=false
    place: Place
}
