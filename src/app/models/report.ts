import { Form } from './form';
import { User } from './user';
import { Answer } from './answer';
export class Report {
    id = ''
    ref:String
    date: Date
    user:User
    answers:Answer[]
    from :Form
}