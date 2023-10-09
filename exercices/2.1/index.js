const dateTimeNow = new Date();
console.log(dateTimeNow.toLocaleDateString()); // 17/08/2020
const message = "Vous êtes arrivé à : ";
function addDateTime(){
    return message + dateTimeNow.toLocaleDateString();
};
alert(addDateTime());
console.log(addDateTime());