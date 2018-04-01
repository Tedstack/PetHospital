import {ExamQuestion} from '../../model/model';

export const Questions: ExamQuestion[] = [
    {id: 1, type: '单选', subject: '宠物狗能不能巧克力？', options: [{id: 'A', content: '能'}, {id: 'B', content: '不能'}], answer: 'A', solution: '巧克力中含有的咖啡因等物质对狗是致命的！'},
    {id: 2, type: '单选', subject: '世界上最聪明的狗是哪个品种？', options: [{id: 'A', content: '哈士奇'}, {id: 'B', content: '阿拉斯加犬'}, {id: 'C', content: '边境牧羊犬'}, {id: 'D', content: '德国牧羊犬'}], answer: 'C', solution: '人家基因就是好怎么办嘛'}
];
