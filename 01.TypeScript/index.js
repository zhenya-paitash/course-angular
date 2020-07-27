//
// 1 Базовые типы
//
// console: tsc index.ts
// const string = "Hello World!";
// let string: string = "Hello World!";
var string = "Hello World!";
var num = 10;
var isActive = false;
var strArray = ["h", "e", "l"];
var numArray = [1, 1, 2, 3, 5, 8, 13];
//
// 2 Работа с функциями
//
var loginfo = function (name, age) {
    // void - данная функция нам ничего не возвращает
    console.log("Info: " + name + ", " + age);
};
loginfo("Zhenya", 27);
function calc(a, b) {
    // number - функция return'ет число
    if (typeof b === "string")
        b = +b;
    return a + b;
}
console.log(calc(1, 2));
console.log(calc(10, "hello"));
//
// 3. Работа с классами
//
var Server = /** @class */ (function () {
    function Server(name, ip) {
        this.name = name;
        this.ip = ip;
        // public name: string;
        // protected ip: number;
        this.status = "working";
        // this.name = name;
        // this.ip = ip
    }
    Server.prototype.turnOn = function () {
        this.status = "working";
    };
    Server.prototype.turnOff = function () {
        this.status = "offline";
    };
    Server.prototype.getStatus = function () {
        return this.status;
    };
    Server.VERSION = "1.0.0";
    return Server;
}());
var server = new Server("AWS", 1234);
var user = {
    name: "Zhenya",
    age: 27,
    logInfoUser: function () {
        console.log("Username: " + this.name + ", age: " + this.age);
    }
};
// implements - применить Интерфейс к Классу, Имплементироваться от него
var User = /** @class */ (function () {
    function User(name, age) {
        this.name = name;
        this.age = age;
    }
    ;
    User.prototype.sayHello = function () {
        console.log(this.name + " Hello!");
    };
    ;
    return User;
}());
//
// 6. Генерик (Дженерик) типы
//
// const arr: Array<any> = [1,2,3,4];
// const arr: Array<string> = [1,2,3,4];
var arr = [1, 2, 3, 4];
var users = [
    { id: 1, name: "Z", age: 2 },
    { id: 2, name: "Y", age: 23 }
];
var users2 = [
    { id: 1, name: "Z", age: 2 },
    { id: 2, name: "Y", age: 23 }
];
