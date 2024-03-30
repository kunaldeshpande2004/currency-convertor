const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let fromcurr=document.querySelector(".from select");
let tocurr=document.querySelector(".to select");
let msg=document.querySelector(".msg")
for(let select of dropdown)
{
    for(let currcode in countryList)
    {
        let opt=document.createElement("option");
        opt.innerText=currcode;
        opt.value=currcode;
        if(select.name==="from" && currcode === "USD")
        {
            opt.selected="selected";
        } else if(select.name==="to" && currcode === "INR")
        {
            opt.selected="selected"
        }
        select.append(opt);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode = countryList[currCode];
    let src= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=src;
};
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector("input");
    let amountval=amount.value;
    if(amountval===""||amountval<1){
        amountval=1;
        amount.value="1";
    }
    const URL =`${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
     let response = await fetch(URL);
     
     let data = await response.json();
     
     let rate=data[tocurr.value.toLowerCase()];
     
     let finalamount=amountval*rate;
     console.log(finalamount);
     msg.innerText=`${amountval} ${fromcurr.value}=${finalamount} ${tocurr.value}`;
});
