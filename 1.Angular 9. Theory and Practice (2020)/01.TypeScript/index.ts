//
// 1 Базовые типы
//
// console: tsc index.ts
// const string = "Hello World!";
// let string: string = "Hello World!";
let string: any = "Hello World!";
let num: number = 10;
let isActive: boolean = false;
let strArray: string[] = ["h", "e", "l"];
let numArray: Array<number> = [1, 1, 2, 3, 5, 8, 13];
//
// 2 Работа с функциями
//
let loginfo = function (name: string, age: number): void {
    // void - данная функция нам ничего не возвращает
    console.log(`Info: ${name}, ${age}`)
};
loginfo("Zhenya", 27);

function calc(a: number, b: number | string): number {
    // number - функция return'ет число
    if (typeof b === "string") b = +b;
    return a + b
}

console.log(calc(1, 2));
console.log(calc(10, "hello"));
//
// 3. Работа с классами
//
class Server {
    static VERSION = "1.0.0";
    // public name: string;
    // protected ip: number;

    private status: string = "working";

    constructor(public name: string, protected ip: number) {
        // this.name = name;
        // this.ip = ip
    }

    public turnOn() {
        this.status = "working"
    }

    protected turnOff() {
        this.status = "offline"
    }

    public getStatus(): string {
        return this.status
    }
}

const server: Server = new Server("AWS", 1234);

//
// 4. Интерфейсы и объекты
//
interface UserInterface{
    name: string
    age: number
    logInfoUser: () => void
    id?: any
    // если ? - то не поумолчанию
}

const user: UserInterface = {
    name: "Zhenya",
    age: 27,
    logInfoUser() {
        console.log(`Username: ${this.name}, age: ${this.age}`)
    }
};

//
// 5. Интерфейсы и классы
//
interface SayHello {
    sayHello: () => void
}
// implements - применить Интерфейс к Классу, Имплементироваться от него
class User implements SayHello {
    constructor(private name: string, private age: number) {};

    sayHello() {
        console.log(this.name + " Hello!")
    };
}

//
// 6. Генерик (Дженерик) типы
//
// const arr: Array<any> = [1,2,3,4];
// const arr: Array<string> = [1,2,3,4];
const arr: Array<number> = [1,2,3,4];

interface Users {
    id: number
    name: string
    age: number
}

const users: Array<Users> = [
    {id: 1, name: "Z", age: 2},
    {id: 2, name: "Y", age: 23}
];

const users2: Users[] = [
    {id: 1, name: "Z", age: 2},
    {id: 2, name: "Y", age: 23}
];